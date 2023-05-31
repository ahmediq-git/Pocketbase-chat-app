import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
import pb from './config/pocketbase';

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');

  const getUser = () => {
    try{
      console.log(pb.authStore)
      setName(pb.authStore.model.username);
      console.log(name)
    }
    catch(error){
      console.log(error);
    }
    
  }

  
  const getMessages = async () => {
    try {
      const resp=await pb.collection("messages").getFullList({sort: '+created'})
      setMessages(resp);
      console.log(resp)
      console.log('messages', messages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    getMessages();
  });

  const chatContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  };
  
  const messageContainerStyle = {
    marginTop: '20px',
    width: '100%',
    maxHeight: '500px',
    overflowY: 'auto',
    scrollbarWidth: 'thin',
    scrollbarColor: '#bdbdbd #f5f5f5',
  };
  
  const messageStyle = {
    marginBottom: '10px',
    padding: '10px',
    background: '#f5f5f5',
    borderRadius: '4px',
  };
  
  const formStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  };
  
  const inputStyle = {
    marginRight: '10px',
    width: '100%',
  };

  // const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const messageContainerRef = useRef(null);
  const navigate = useNavigate();
  const [err, setErr]=useState('');


  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };



  const handleSubmit = async (event) => {
    event.preventDefault();

    if (message!='' || name!=''){
      const newMessage = {
        Username: name,
        Message: message,
      };
      try{
        await pb.collection('messages').create(newMessage);
        getMessages();
        setMessage('');
      }
      catch(error){
        console.log(error);
        setErr("Error when sending message"+error.message);
      } 
    }
  
  };

  useEffect(() => {
    // Scroll to the bottom of the message container
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const signout=()=>{
    try{
      pb.authStore.clear()
      console.log('User signed out successfully!');
      navigate("/");
    }catch (error){
      console.error('Error signing out user:', error.message);
    }
  }

  return (
    <Container style={chatContainerStyle}>
      <Button variant="text" color="primary" fullWidth onClick={signout}>
        Logout
      </Button>
      <Typography variant="h4" component="h1" gutterBottom>
        Chat App
      </Typography>
      <div ref={messageContainerRef} style={messageContainerStyle}>
        {messages.map((msg, index) => (
          <Box key={index} style={messageStyle}>
            <Typography variant="body1" gutterBottom>
              {msg.Username}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {msg.Message}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {msg.created}
            </Typography>

            {/* <Button variant="text" color="secondary"onClick={()=>deleteMessage(msg.id)}>delete</Button> */}
          </Box>
        ))}
      </div>
      <form onSubmit={handleSubmit} style={formStyle}>
        <TextField
          style={inputStyle}
          label="Your Message"
          variant="outlined"
          fullWidth
          value={message}
          onChange={handleMessageChange}
        />
        <Button type="submit" variant="contained" color="primary"> 
          Send
        </Button>

        {err}
      </form>
    </Container>
  );
}

export default ChatApp;
