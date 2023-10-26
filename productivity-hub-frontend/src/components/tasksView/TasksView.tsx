import { useQuery } from '@apollo/client';
import { GET_TASKS } from '../../API/queries';
import { Button } from '@mui/material';
import Task from './Task';
import TaskFormDialog from './TaskFormDialog';
import { useState } from 'react';

function TasksView() {
  const { data } = useQuery<{tasks: Task[]}>(GET_TASKS);
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleCreateTask = () => { setDialogOpen(true);};
  const tasksList = data?.tasks.map(task => <Task task={task} key={task.id} />).reverse();

  return (
    <>
      <TaskFormDialog open={dialogOpen} setOpen={setDialogOpen} />
      <Button
        variant="outlined"
        fullWidth
        sx={{ mt: 2, mb: 3 }}
        onClick={handleCreateTask}
      >
        Create a new Task
      </Button>
      {tasksList}
    </>
  );
}

export default TasksView;