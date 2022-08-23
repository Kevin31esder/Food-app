import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Fab, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Chip from '@mui/material/Chip';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import PickHours from './Hours';
import PickCategorias from './Categorias';

export default function CardsRender() {
  const [dish, setDish] = React.useState([
    {
      strMeal: 'Beef and Mustard Pie',
      strMealThumb:
        'https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg',
      idMeal: '52874',
    },
  ]);
  const [category, setCategory] = React.useState('beef');

  useEffect(() => {
    setTimeout(async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );
        setDish(response.data.meals);
      } catch (err) {}
    });
  }, [category]);

  const [platilloEntero, setPlatilloEntero] = React.useState([]);

  useEffect(() => {
    if (dish.length >= 1) {
      setPlatilloEntero([]);
      const tarjetas = dish.map((cardInfo) => {
        async function request() {
          try {
            const hi = await axios
              .get(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${cardInfo.idMeal}`
              )
              .then((response) => {
                const newDish = {
                  titulo: cardInfo.strMeal,
                  imagen: cardInfo.strMealThumb,
                  idComida: response.data.meals[0].idMeal,
                  localizacion: response.data.meals[0].strArea,
                  Tags: response.data.meals[0].strTags,
                };
                setPlatilloEntero((oldArray) => [newDish, ...oldArray]);
              });
          } catch (err) {
            console.log(err);
          }
        }
        request();
      });
    }
  }, [dish]);

  const tarjetas = platilloEntero.map((cardInfo) => {
    let iamgenFondo = cardInfo.imagen;
    return (
      <Card sx={{ flex: 1, minWidth: '220px' }}>
        {/* <Button onClick={() => console.log(platilloEntero)}>oa</Button> */}
        <Box
          sx={{
            width: '100%',
            height: '220px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column-reverse',
              backgroundImage: `url(${iamgenFondo})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              height: '100%',
              borderRadious: '10px',
            }}
          >
            <Box>
              <Typography
                sx={{
                  ml: 1,
                  borderRadius: 5,
                  color: '#FFFFFF',
                  fontFamily: 'Gotham',
                }}
              >
                {cardInfo.localizacion}
              </Typography>
              <Typography
                sx={{
                  ml: 1,
                  borderRadius: 5,
                  color: '#FDC963',
                  fontFamily: 'Gotham',
                }}
              >
                {cardInfo.titulo}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'right',
              }}
            >
              <Box sx={{ width: '90px' }}>
                {cardInfo.Tags ? (
                  <Chip
                    size="small"
                    label={cardInfo.Tags}
                    sx={{ color: '#FCAB3F', backgroundColor: 'white' }}
                  ></Chip>
                ) : null}
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ p: 0.8, display: 'flex', justifyContent: 'space-between' }}>
          <AccessTimeIcon sx={{ color: '#FDC963' }} />
          <Typography>
            $
            {cardInfo.idComida.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
            MXN
          </Typography>
        </Box>
      </Card>
    );
  });

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          columnGap: 2,
          p: 2,
          maxWidth: '95vw',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            gap: 2.8,
            flexWrap: 'wrap',
          }}
        >
          <PickHours />
          <PickCategorias category={category} setCategory={setCategory} />
          <Fab
            variant="extended"
            size="small"
            sx={{ mb: 2, backgroundColor: 'white', display: 'flex' }}
          >
            {' '}
            <PlusOneIcon sx={{ mr: 1, color: '#FDC963' }} />
            platillos
          </Fab>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            p: 2,
            gap: 2,
            maxWidth: '95vw',
            backgroundColor: '#fafafa',
          }}
        >
          {tarjetas}
        </Box>
      </Box>
    </>
  );
}
