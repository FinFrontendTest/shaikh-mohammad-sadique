// DataDialog.js
import React, { useState, useEffect } from 'react';
import { Box, Checkbox, FormControlLabel, TextField, DialogTitle, DialogContent, Button, DialogActions, Dialog } from '@mui/material';

export default function DataDialog({ open, handleClose, handleSubmit, data }) {
  const [srNo, setSrNo] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [gender, setGender] = useState('');
  const [date, setDate] = useState('');
  const [checked, setChecked] = useState([false, false, false, false, false]);

  useEffect(() => {
    // Update state when data prop changes (for editing)
    if (data.length > 0) {
      const currentData = data[0]; // Assuming data is an array of objects
      setSrNo(currentData.Sr_No);
      setName(currentData.Name);
      setEmail(currentData.Email);
      setContact(currentData.Contact);
      setGender(currentData.Gender);
      setDate(currentData.Date);
      setChecked(currentData.Weekdays);
    } else {
      // Clear state when adding new data
      setSrNo('');
      setName('');
      setEmail('');
      setContact('');
      setGender('');
      setDate('');
      setChecked([false, false, false, false, false]);
    }
  }, [data]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {data.length > 0 ? "Edit Data" : "Add Data"}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <TextField id="outlined-basic" sx={{ my: 3 }} label="Name" variant="outlined" value={name} onChange={(event) => setName(event.target.value)} />
          <TextField id="outlined-basic" sx={{ mb: 3 }} label="Email" variant="outlined" value={email} onChange={(event) => setEmail(event.target.value)} />
          <TextField id="outlined-basic" sx={{ mb: 3 }} label="Contact" variant="outlined" type='text' inputProps={{ maxLength: 10, pattern: '[0-9]*', inputMode: 'numeric' }} value={contact} onChange={(event) => setContact(event.target.value)} />
          {/* ... (other input fields) */}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={() => handleSubmit({ Sr_No: srNo, Name: name, Email: email, checked: checked, Contact: contact, Gender: gender, Date: date })} autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
