import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Button, Typography } from '@mui/material';

const boxStyle = {
  display: 'flex',
  flexDirection: 'column',
};

export default function DateComponent() {
  const [value, setValue] = React.useState(0);
  const [selectedDay, setSelectedDay] = React.useState(0);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}
    >
      <Box onClick={() => setSelectedDay(28)} sx={boxStyle}>
        <Typography sx={{ textAlign: 'center' }}>Dom</Typography>{' '}
        <Button
          onClick={() => setSelectedDay(28)}
          variant={selectedDay === 28 ? 'contained' : null}
          color="primary"
          sx={{ p: 0 }}
        >
          28
        </Button>{' '}
      </Box>
      <Box onClick={() => setSelectedDay(29)} sx={boxStyle}>
        <Typography sx={{ textAlign: 'center' }}>Lun</Typography>{' '}
        <Button
          onClick={() => setSelectedDay(29)}
          variant={selectedDay === 29 ? 'contained' : null}
          color="primary"
          sx={{ p: 0 }}
        >
          29
        </Button>{' '}
      </Box>
      <Box onClick={() => setSelectedDay(30)} sx={boxStyle}>
        <Typography sx={{ textAlign: 'center' }}>Mar</Typography>{' '}
        <Button
          onClick={() => setSelectedDay(30)}
          variant={selectedDay === 30 ? 'contained' : null}
          color="primary"
          sx={{ p: 0 }}
        >
          30
        </Button>{' '}
      </Box>
      <Box onClick={() => setSelectedDay(1)} sx={boxStyle}>
        <Typography sx={{ textAlign: 'center' }}>Mié</Typography>{' '}
        <Button
          onClick={() => setSelectedDay(1)}
          variant={selectedDay === 1 ? 'contained' : null}
          color="primary"
          sx={{ p: 0 }}
        >
          01
        </Button>{' '}
      </Box>
      <Box onClick={() => setSelectedDay(2)} sx={boxStyle}>
        <Typography sx={{ textAlign: 'center' }}>Jue</Typography>{' '}
        <Button
          onClick={() => setSelectedDay(2)}
          variant={selectedDay === 2 ? 'contained' : null}
          color="primary"
          sx={{ p: 0 }}
        >
          02
        </Button>{' '}
      </Box>
      <Box onClick={() => setSelectedDay(3)} sx={boxStyle}>
        <Typography sx={{ textAlign: 'center' }}>Vie</Typography>{' '}
        <Button
          onClick={() => setSelectedDay(3)}
          variant={selectedDay === 3 ? 'contained' : null}
          color="primary"
          sx={{ p: 0 }}
        >
          03
        </Button>{' '}
      </Box>
      <Box onClick={() => setSelectedDay(4)} sx={boxStyle}>
        <Typography sx={{ textAlign: 'center' }}>Sáb</Typography>{' '}
        <Button
          onClick={() => setSelectedDay(4)}
          variant={selectedDay === 4 ? 'contained' : null}
          color="primary"
          sx={{ p: 0 }}
        >
          04
        </Button>{' '}
      </Box>
    </Box>
  );
}
