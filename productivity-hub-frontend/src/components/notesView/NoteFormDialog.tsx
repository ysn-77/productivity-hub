import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import { NOTE_CREATE, NOTE_UPDATE } from '../../API/mutations';
import { useMutation } from '@apollo/client';
import showNotification from '../../utils/showNotification';
import { apolloClient } from '../../API/apolloClient';
import { GET_NOTES } from '../../API/queries';
import { ChangeEvent, useState } from 'react';

interface NoteFormDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  note?: Note;
}

function NoteFormDialog({ open, setOpen, note }: NoteFormDialogProps) {
  const isEdit = note !== undefined;
  const [name, setName] = useState(isEdit ? note.name : '');
  const [content, setContent] = useState(isEdit ? note.content : '');
  const [createNoteMutation] = useMutation(NOTE_CREATE);
  const [updateNoteMutation] = useMutation(NOTE_UPDATE);

  const closeForm = () => {
    setOpen(false);
    setName('');
    setContent('');
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleContentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleSubmit = () => {
    const mutation = isEdit ? updateNoteMutation : createNoteMutation;
    const variables = isEdit
      ? { id: note.id, name, content }
      : { name, content };

    mutation({ variables })
      .then(() => {
        showNotification(isEdit ? 'Note Edited' : 'Note Created', 'success');
        apolloClient
          .refetchQueries({
            include: [GET_NOTES],
          })
          .finally();
        closeForm();
      })
      .catch((error) => {
        showNotification(error.message);
      });
  };

  return (
    <Dialog open={open} onClose={closeForm}>
      <DialogTitle>{isEdit ? 'Edit Note' : 'Create Note'}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Name"
            required
            autoFocus
            autoComplete="off"
            margin="dense"
            fullWidth
            variant="outlined"
            value={name}
            onChange={handleNameChange}
          />
          <TextField
            label="Content"
            multiline
            autoComplete="off"
            margin="dense"
            fullWidth
            variant="outlined"
            value={content}
            onChange={handleContentChange}
          />
          <Stack direction="row" justifyContent="end" mt={2}>
            <Button onClick={closeForm}>Cancel</Button>
            <Button type="submit">Save</Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default NoteFormDialog;
