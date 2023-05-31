import React from 'react';
import { TextField } from '@mui/material';

function Design() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection:'column'}}>
      <TextField id="outlined-basic" label="Username" variant="outlined" sx={{width: 300, m:1.5}}/>
      <TextField id="outlined-basic" label="Password" variant="outlined" sx={{width: 300}}/>
    </div>
  );
}

export default Design;
