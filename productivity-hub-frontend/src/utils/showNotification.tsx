import { Alert, Snackbar } from '@mui/material';
import { createRoot } from 'react-dom/client';

const showNotification = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'error') => {
  const container = document.createElement('div');
  const root = createRoot(container);
  document.body.appendChild(container);

  root.render(
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={true}
      sx={{ position: 'fixed', zIndex: 1500 }}
    >
      <Alert severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );

  setTimeout(() => {
    document.body.removeChild(container);
  }, 3000);
};

export default showNotification;
