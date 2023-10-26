import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TASK_CREATE, TASK_UPDATE } from '../../API/mutations';
import { useMutation } from '@apollo/client';
import showNotification from '../../utils/showNotification';
import { apolloClient } from '../../API/apolloClient';
import { GET_TASKS } from '../../API/queries';
import { ChangeEvent, useState } from 'react';
import moment, { Moment } from 'moment';

interface TaskFormDialogProps {
  open: boolean,
  setOpen: (value: boolean) => void,
  task?: Task
}

function TaskFormDialog({ open, setOpen, task }: TaskFormDialogProps) {
  const isEdit = task !== undefined;
  const [name, setName] = useState(isEdit ? task.name : '');
  const [description, setDescription] = useState(isEdit ? task.description : '');
  const [dueDate, setDueDate] = useState<Moment | null>(
    isEdit && task.dueDate !== null ? moment(task.dueDate) : null
  );
  const [createTaskMutation] = useMutation(TASK_CREATE);
  const [updateTaskMutation] = useMutation(TASK_UPDATE);

  const handleClose = () => {
    setOpen(false);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleContentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleDueDateChange = (value: Moment | null) => {
    setDueDate(value);
  };

  const handleSubmit = () => {
    const mutation = isEdit ? updateTaskMutation : createTaskMutation;
    const variables = isEdit ? { id: task.id, name, description, dueDate } : { name, description, dueDate };

    mutation({ variables }).then(() => {
      showNotification(isEdit ? 'Task Edited' : 'Task Created', 'success');
      apolloClient.refetchQueries({
        include: [GET_TASKS],
      }).finally();
    }).catch(error => {
      console.log(error.message);
      showNotification(error.message);
    }).finally(() => {
      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{isEdit ? 'Edit Task' : 'Create Task'}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Name"
            required
            autoFocus
            autoComplete='off'
            margin="dense"
            fullWidth
            variant="outlined"
            value={name}
            onChange={handleNameChange}
          />
          <TextField
            label="Description"
            multiline
            autoComplete="off"
            margin="dense"
            fullWidth
            variant="outlined"
            value={description}
            onChange={handleContentChange}
          />
          <DatePicker
            label="Due Date"
            sx={{ mt: 1 }}
            value={dueDate}
            onChange={handleDueDateChange}
            format='YYYY-MM-DD'
            slotProps={{
              field: { clearable: true },
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default TaskFormDialog;