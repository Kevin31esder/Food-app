import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Fab, Typography } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import Box from '@mui/material/Box';

const Hours = ['11:00 am - 12:00 am', '1:00 pm - 2:00 pm', '2:00 pm - 3:00 pm'];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Elige tu Hora </DialogTitle>
      <List sx={{ pt: 0 }}>
        {Hours.map((hour) => (
          <ListItem button onClick={() => handleListItemClick(hour)} key={hour}>
            <ListItemText primary={hour} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default function PickHours() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(Hours[0]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <Box>
      <Fab
        size="small"
        variant="extended"
        onClick={handleClickOpen}
        sx={{
          backgroundColor: 'white',
        }}
      >
        <AccessTimeIcon sx={{ mr: 1, color: '#FDC963' }} />

        {selectedValue}
      </Fab>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </Box>
  );
}
