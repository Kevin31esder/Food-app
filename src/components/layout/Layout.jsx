import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';

import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddIcon from '@mui/icons-material/Add';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GridViewIcon from '@mui/icons-material/GridView';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TextField from '@mui/material/TextField';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import DateComponent from './DateComponent';
import LocationModal from '../LocationModal';
import CardsRender from '../main-view/Cards';
import ShoppingCart from './ShoppingCart';
import Profile from './Profile';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function Layout({ children }) {
  const [currentWindow, setCurrentWindow] = React.useState('home');

  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: '#FCAB3F',
        // contrastText: colors.primary,
      },
      secondary: {
        main: 'rgba(138, 141, 147, 0.12)',
        // contrastText: colors.secondary,
      },
      error: {
        main: 'rgba(255, 76, 81, 0.12)',
        //contrastText: colors.error,
      },
      mode: 'light',
      text: {
        //primary: colors.text,
      },
      background: {
        // default: colors.background.default,
        // paper: colors.background.paper,
      },
    },
  });

  const muiTheme = useTheme();
  const [theme, setTheme] = useState(defaultTheme);
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [openLocationModal, setOpenLocationModal] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          sx={{
            backgroundColor: '#ffffff',
            boxShadow: 0,
            borderBlockEnd: '1px solid grey',
          }}
        >
          <Toolbar>
            <IconButton
              onClick={() => setOpenLocationModal(true)}
              sx={{ borderRadius: 2, p: 0 }}
            >
              <LocationOnIcon sx={{ color: '#E19793' }} />
              <TextField
                sx={{ ml: 1, pb: 2 }}
                id="standard-basic"
                label="Select location..."
                variant="standard"
                InputLabelProps={{
                  shrink: false,
                }}
              />
            </IconButton>
            <LocationModal
              open={openLocationModal}
              setOpen={setOpenLocationModal}
            />

            <Box sx={{ flex: 1 }} />

            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              sx={{ ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Main>
          {currentWindow == 'home' ? (
            <Box>
              <DrawerHeader />
              <DateComponent />
              <CardsRender />
            </Box>
          ) : currentWindow == 'shoppingCart' ? (
            <ShoppingCart />
          ) : currentWindow == 'profile' ? (
            <Profile />
          ) : null}

          {children}
        </Main>
        <Box
          sx={{
            width: '100vw',
            position: 'fixed',
            bottom: 0,
          }}
        >
          <BottomNavigation
            sx={{ backgroundColor: '#e3e3e3' }}
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              onClick={() => {
                setCurrentWindow('shoppingCart');
              }}
              icon={<ShoppingCartIcon />}
            />
            <BottomNavigationAction
              onClick={() => {
                setCurrentWindow('home');
              }}
              icon={<GridViewIcon />}
            />
            <BottomNavigationAction
              onClick={() => {
                setCurrentWindow('profile');
              }}
              icon={<AccountCircleOutlinedIcon />}
            />
          </BottomNavigation>
        </Box>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
            },
          }}
          variant="persistent"
          anchor="right"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {['Perfil', 'Cupones', 'Configuracion', 'Salir'].map(
              (text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? <AccountBoxIcon /> : <AddIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
          <Divider />
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}
