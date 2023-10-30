import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useMutation } from '@apollo/client';
import { USER_CREATE } from '../../API/mutations';
import { Box, Button, Container, Link, TextField } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import showNotification from '../../utils/showNotification';

function SignUpForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signUpMutation] = useMutation(USER_CREATE);
  const navigate = useNavigate();

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    signUpMutation({ variables: { username, password } })
      .then((response) => {
        const { id } = response.data.userCreate;
        localStorage.setItem('currentUserId', id);
        localStorage.setItem('currentUsername', username);
        navigate('/notes');
      })
      .catch((error) => {
        showNotification(Object.keys(error.graphQLErrors[0].extensions)[0]);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <h2>Sign Up</h2>
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
          Sign up
        </Button>
        <Link to="/" component={RouterLink} variant="body2">
          {'Already have an account? Login'}
        </Link>
      </Box>
    </Container>
  );
}

export default SignUpForm;
