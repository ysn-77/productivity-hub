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
import { TASK_DELETE } from '../../API/mutations';
import { GET_TASKS } from '../../API/queries';
import showNotification from '../../utils/showNotification';
import { useState } from 'react';
import TaskFormDialog from './TaskFormDialog';

function Task({ task }: { task: Task }) {
  const { id, name, description, dueDate } = task;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteTaskMutation] = useMutation(TASK_DELETE);

  const handleDelete = () => {
    deleteTaskMutation({ variables: { id } })
      .then(() => {
        showNotification('Task Deleted', 'success');
        apolloClient.refetchQueries({
          include: [GET_TASKS],
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
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ minWidth: '100%' }}
        >
          <Typography variant="h6">{name}</Typography>
          <Typography variant="h6" sx={{ opacity: 0.5, mr: 2 }}>
            {dueDate}
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Typography sx={{ textAlign: 'left' }}>{description}</Typography>
        <Stack direction="row" justifyContent="end">
          <TaskFormDialog
            open={dialogOpen}
            setOpen={setDialogOpen}
            task={task}
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

export default Task;
