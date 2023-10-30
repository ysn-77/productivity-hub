import { useMutation } from '@apollo/client';
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Stack,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { apolloClient } from '../../API/apolloClient';
import { NOTE_DELETE } from '../../API/mutations';
import { GET_NOTES } from '../../API/queries';
import showNotification from '../../utils/showNotification';
import { useState } from 'react';
import NoteFormDialog from './NoteFormDialog';

function Note({ note }: { note: Note }) {
  const { id, name, content } = note;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteNoteMutation] = useMutation(NOTE_DELETE);

  const handleDelete = () => {
    deleteNoteMutation({ variables: { id } })
      .then(() => {
        showNotification('Note Deleted', 'success');
        apolloClient.refetchQueries({
          include: [GET_NOTES],
        });
      })
      .catch((error) => {
        showNotification(error.message);
      });
  };

  const handleEdit = () => {
    setDialogOpen(true);
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">{name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography sx={{ textAlign: 'left' }}>{content}</Typography>
        <Stack direction="row" justifyContent="end">
          <NoteFormDialog
            open={dialogOpen}
            setOpen={setDialogOpen}
            note={note}
          />
          <Button variant="text" onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="text" onClick={handleDelete}>
            Delete
          </Button>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}

export default Note;
