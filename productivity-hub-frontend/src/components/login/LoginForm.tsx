import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../API/mutations';
import { Box, Button, Container, Link, TextField } from '@mui/material';
import showNotification from '../../utils/showNotification';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMutation] = useMutation(LOGIN);
  const navigate = useNavigate();

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    loginMutation({ variables: { username, password } })
      .then((response) => {
        const { id } = response.data.login;
        localStorage.setItem('currentUserId', id);
        localStorage.setItem('currentUsername', username);
        navigate('/notes');
      })
      .catch((error) => {
        showNotification(error.message);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <h2>Login</h2>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          label="Username"
          onChange={handleUsernameChange}
          value={username}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          onChange={handlePasswordChange}
          value={password}
          fullWidth
          margin="normal"
          type="password"
          required
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </Button>
        <Link to="/signup" component={RouterLink} variant="body2">
          {'Don\'t have an account? Sign Up'}
        </Link>
      </Box>
    </Container>
  );
}

export default LoginForm;
