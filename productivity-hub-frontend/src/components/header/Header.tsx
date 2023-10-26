import { AppBar, Box, Button, CssBaseline, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { apolloClient } from '../../API/apolloClient';

interface HeaderProps {
  tab: 'Notes' | 'Tasks'
}

function Header({ tab } : HeaderProps) {
  const navigate = useNavigate();

  const onLogoutClick = () => {
    localStorage.clear();
    apolloClient.clearStore();
    return navigate('/');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Productivity App
          </Typography>
          <Tabs
            centered
            value={tab}
            textColor="inherit"
            sx={{ ml: 2 }}
          >
            <Tab label="Notes" value="Notes" component={Link} to="/notes" />
            <Tab label="Tasks" value="Tasks" component={Link} to="/tasks" />
          </Tabs>
          <Button
            onClick={onLogoutClick}
            color='inherit'
            variant="text"
            sx={{ ml: 'auto' }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
