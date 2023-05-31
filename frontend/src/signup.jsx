import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Link } from '@mui/material';
import { useNavigate } from "react-router-dom";
import pb from './config/pocketbase';

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errormsg,setErrormsg] = useState('');
  const navigate = useNavigate();


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  const handleUser = async () => {
    const newUser = {

      user: username,
      email: email,
    };
    try{
      await pb.collection('users_email').create(newUser);
    }
    catch(error){
      console.log(error);
    } 
  
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      // Create a new user with email and password using Firebase
      await pb.collection("users").create({
        email,
        password,
        username: username,
        passwordConfirm: password,
      });
      handleUser();
      // User registration successful
      console.log('User registered successfully!');
      navigate("/");
      // Reset the form inputs
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (error) {
      // Error occurred during user registration
      console.error('Error registering user:', error.message);
      setErrormsg('Error '+ error.message);
    }
  };


  return (
    <Container maxWidth="xs" sx={{ marginTop: '100px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={handleUsernameChange}
        />
        <TextField
          label="Email"
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
          Sign Up
        </Button>

        <Typography variant="body2" align="center" sx={{ marginTop: '10px' }}>
        have an account?{' '}
        <Link href="/" color="primary">
          Sign In
        </Link>
      </Typography>

        <Typography>{errormsg}</Typography>
        
      </form>
    </Container>
  );
}

export default SignUp;
