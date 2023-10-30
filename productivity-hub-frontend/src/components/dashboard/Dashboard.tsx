import Header from '../header/Header';
import NotesView from '../notesView/NotesView';
import { Container } from '@mui/material';
import styles from './Dashboard.module.scss';
import TasksView from '../tasksView/TasksView';

interface DashboardProps {
  tab: 'Notes' | 'Tasks';
}

function Dashboard({ tab }: DashboardProps) {
  return (
    <>
      <Header tab={tab} />
      <Container sx={{ mt: 8 }}>
        <div className={styles.contentWrapper}>
          {tab === 'Notes' ? <NotesView /> : <TasksView />}
        </div>
      </Container>
    </>
  );
}

export default Dashboard;
