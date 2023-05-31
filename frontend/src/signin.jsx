

import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Link } from '@mui/material';
import { useNavigate } from "react-router-dom";
import pb from './config/pocketbase';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errormsg,setErrormsg] = useState('');
  const navigate = useNavigate();



  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      //login using email and password
      // essentially it just accepts username and password
      const authData = await pb.collection('users').authWithPassword(email, password);
      // User registration successful
      console.log('User signed in successfully!');
      navigate("/chatapp");
    } catch (error) {
      // Error occurred during user registration
      console.error('Error registering user:', error.message);
      setErrormsg('Error '+error.message);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ marginTop: '100px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
        <Typography variant="body2" align="center" sx={{ marginTop: '10px' }}>
        Don't have an account?{' '}
        <Link href="/signup" color="primary">
          Sign up
        </Link>
      </Typography>
      <Typography>{errormsg}</Typography>
      </form>
    </Container>
  );
}

export default SignIn;