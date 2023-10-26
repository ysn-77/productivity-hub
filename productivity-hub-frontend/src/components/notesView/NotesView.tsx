import { useQuery } from '@apollo/client';
import { GET_NOTES } from '../../API/queries';
import { Button } from '@mui/material';
import Note from './Note';
import NoteFormDialog from './NoteFormDialog';
import { useState } from 'react';

function NotesView() {
  const { data } = useQuery<{notes: Note[]}>(GET_NOTES);
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleCreateNote = () => { setDialogOpen(true);};
  const notesList = data?.notes.map(note => <Note note={note} key={note.id} />).reverse();

  return (
    <>
      <NoteFormDialog open={dialogOpen} setOpen={setDialogOpen} />
      <Button
        variant="outlined"
        fullWidth
        sx={{ mt: 2, mb: 3 }}
        onClick={handleCreateNote}
      >
        Create a new Note
      </Button>
      {notesList}
    </>
  );
}

export default NotesView;