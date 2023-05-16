import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import {  useLocation  } from 'react-router-dom';
import { useMediaQuery, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import PlaceIcon from '@mui/icons-material/Place';

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
    // const [coordinates, setCoordinates] = useState([]);
    const [showContent, setShowContent] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
          setShowContent(true);
          
        }, 500); // Delay for 0.5 seconds
    
        return () => {
          clearTimeout(timer); 
        };
      }, []);
    const location = useLocation();
    const creches = location.state && location.state.creches ? location.state.creches : [];
    console.log(creches);

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
    };

    const gpsArray = creches
        .filter((creche) => creche && creche.gps) // Filter out undefined or null elements and those without a gps property
        .map((creche) => creche.gps);

// console.log(gpsArray);

  const coordinates = gpsArray.map((url)=>getCoordinatesFromUrl(url));
 
//   console.log(coordinates);

  return (
    <>
    {showContent && (
      <MapContainer>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyClN2Dl0lRh5_LJavrb8EB8uJH4WKzFGRI',
          }}
          defaultCenter={coordinates.length > 0 ? coordinates[0] : null}
        center={coordinates.length > 0 ? coordinates[0] : null}
          defaultZoom={14}
          margin={[50, 50, 50, 50]}
          options={''}
        >
          { coordinates.map((coordinate, index)=> (
          coordinate && <PlaceIcon key={index} color="red" lat={coordinate.lat} lng={coordinate.lng} />))}
        </GoogleMapReact>
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
          className={`${
            isMobile ? 'w-64' : 'w-40'
          } py-2 text-white font-bold text-xl`}
        >
          Modifier mes critères
        </CustomButton>
      </MapContainer>
   )} 
   </>
  );
};

export default Map;