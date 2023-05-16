import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { useMediaQuery, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import PlaceIcon from '@mui/icons-material/Place';
import { Link } from 'react-router-dom';

const MapContainer = styled('div')(({ theme }) => ({
  height: '97vh',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    height: '50vh',
  },
  position: 'relative',
}));

const CustomButton = styled(Button)({
  position: 'absolute',
  bottom: 10,
  left: '50%',
  transform: 'translateX(-50%)',
});

const Map = ({ onModifierCritere }) => {
  const handleModifierCriteres = () => {
    onModifierCritere();
  };
  const isMobile = useMediaQuery('(min-width:600px)');
  
  const getCoordinatesFromUrl = (url) => {
    const regex = /@(-?\d+\.\d+),(-?\d+\.\d+),(\d+)z/;
    const match = url.match(regex);
    if (match && match.length >= 4) {
      const lat = parseFloat(match[1]);
      const lng = parseFloat(match[2]);
      return { lat, lng };
    }
    return null;
  }
 
  const coordinates = getCoordinatesFromUrl('https://www.google.fr/maps/place/Alger/@36.73918,2.9745163,11z');
 
  console.log(coordinates);

  return (
    <>
      <MapContainer>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyClN2Dl0lRh5_LJavrb8EB8uJH4WKzFGRI',
          }}
          defaultCenter={coordinates }
          center={coordinates}
          defaultZoom={14}
          margin={[50, 50, 50, 50]}
          options={''}
        >
          {coordinates && <PlaceIcon color="red" lat={coordinates.lat} lng={coordinates.lng} />}
        </GoogleMapReact>
        <Link to="/filtres4">
  <CustomButton
    variant="contained"
    onClick={handleModifierCriteres}
    sx={{
      backgroundColor: '#AD98E9',
      borderRadius: 40,
      '&:hover': {
        backgroundColor: 'purple',
      },
    }}
    className={`${isMobile ? 'w-64' : 'w-40'} py-2 text-white font-bold text-xl`}
  >
    Modifier mes critères
  </CustomButton>
</Link>
      </MapContainer>
    </>
  );
};

export default Map;