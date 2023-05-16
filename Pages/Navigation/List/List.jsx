import react from 'react';
import { Box, Grid } from '@mui/material';
import InfoBox from '../InfoCreche';
import './scrollbar.css';
import { useLocation } from 'react-router-dom';

const List = ({ onFicheOpen }) => {
  const location = useLocation();
const creches = location.state.creches || []; 
  const handleOpenFiche = () => {
    onFicheOpen();
  };
console.log(creches);
  return (
    <Box>
      <Box sx={{ fontSize: 24, backgroundColor: '#ffb1a6', color: '#094076', fontWeight: 'bold', padding: '26px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
         CRECHES TROUVÉES :
      </Box>
      <Box sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 90px)' }}>
        <Grid container spacing={1} className="list">
          {creches?.map((place, i) => (
            <Grid item key={i} xs={12}>
              <InfoBox
                nom={place.nom}
                localisation={place.localisation}
                note={place.note_évaluation}
                nbplace={place.disponibilité_places}
                num={place.tél}
                onFicheOpen={handleOpenFiche}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default List;