import React , { useState, useEffect }from 'react';
import { Box, Grid } from '@mui/material';
import InfoBox from './InfoCreche';
import './scrollbar.css';
import {  useLocation  } from 'react-router-dom';
import axios from 'axios';

const List = ({ onFicheOpen }) => {
  const [showContent, setShowContent] = useState(false);
  const location = useLocation();
  const creches = location.state && location.state.creches ? location.state.creches : [];

  const handleOpenFiche = (id) => {
    onFicheOpen(id);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
      
    }, 500); // Delay for 0.5 seconds

    return () => {
      clearTimeout(timer); 
    };
  }, []);

  

  const handleToggleFavorite = async (id) => {
    try {
      const response = await axios.post(`api/parent/favoris/${id}`, null, {
        withCredentials: true,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  // if (!showContent) {
  //   return <h1>Loading...</h1>;
  // }

  return (
    <>
    {showContent && (
    <Box>
      <Box sx={{ fontSize: 24, backgroundColor: '#ffb1a6', color: '#094076', fontWeight: 'bold', padding: '26px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        LES CRECHES TROUVÉES
      </Box>
      <Box sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 90px)' }}>
        <Grid container spacing={1} className="list">
          {creches?.map((creche, i) => (
            <Grid item key={i} xs={12}>
              <InfoBox
                 nomCreche={creche.nom}
                 location={creche.localisation}
                 place={creche.disponibilité_places}
                 note={creche.note_évaluation}
                 onFicheOpen={() => handleOpenFiche(creche._id)}
                 id={creche._id}
                 handleToggleFavorite={handleToggleFavorite}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
    )}
    </>
  );
};

export default List;
