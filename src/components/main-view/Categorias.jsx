import * as React from 'react';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { Fab, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import axios from 'axios';
import Box from '@mui/material/Box';

function SimpleDialog(props) {
  const { category, setCategory, onClose, selectedValue, open } = props;

  const [listCategorias, setListCategorias] = React.useState([]);
  React.useEffect(() => {
    try {
      axios
        .get('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then((res) => {
          setListCategorias(res.data.categories);
        });
    } catch (error) {}
  }, []);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog fullWidth onClose={handleClose} open={open}>
      <DialogTitle>Elige tu platillo </DialogTitle>
      <List sx={{ pt: 0 }}>
        {listCategorias.map((categoria) => (
          <ListItem
            button
            onClick={() => handleListItemClick(categoria.strCategory)}
            key={categoria.idCategory}
          >
            <ListItemText primary={categoria.strCategory} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default function PickCategorias(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
    props.setCategory(value);
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
        <RestaurantIcon sx={{ mr: 1, color: '#FDC963' }} />
        {props.category}
      </Fab>
      <SimpleDialog
        category={props.category}
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </Box>
  );
}
