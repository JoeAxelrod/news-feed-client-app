import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

export default function AddItem() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    image: '',
    link: { text: '', path: '' },
  });

  const handleChange = (e, field) => {
    if (field === 'linkText' || field === 'linkPath') {
      setFormData({
        ...formData,
        link: { ...formData.link, [field === 'linkText' ? 'text' : 'path']: e.target.value },
      });
    } else {
      setFormData({ ...formData, [field]: e.target.value });
    }
  };

  const addItem = () => {
    fetch("http://localhost:8081/add-item", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
      console.log("Item added:", data);
    });
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add Item
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Item</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Title" fullWidth value={formData.title} onChange={(e) => handleChange(e, 'title')} />
          <TextField margin="dense" label="Text" fullWidth value={formData.text} onChange={(e) => handleChange(e, 'text')} />
          <TextField margin="dense" label="Image URL" fullWidth value={formData.image} onChange={(e) => handleChange(e, 'image')} />
          <TextField margin="dense" label="Link Text" fullWidth value={formData.link.text} onChange={(e) => handleChange(e, 'linkText')} />
          <TextField margin="dense" label="Link Path" fullWidth value={formData.link.path} onChange={(e) => handleChange(e, 'linkPath')} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={addItem} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
