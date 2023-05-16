import React, { useState } from 'react';
import { CssBaseline, Grid } from '@mui/material';
import Map from '../Map';
import List from '../Navigation/List';
import Fiche from '../Fiche';
// import ModifierCritere from '../components/Map/ModifierCritere';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCrecheId, setSelectedCrecheId] = useState(null); 

  const handleFicheOpen = (id) => {
    setSelectedCrecheId(id);
    setIsOpen(true);
    console.log('Selected Creche Id:', id);
    console.log(selectedCrecheId);
  };


  return (
    <>

      <Grid container sx={{ width: '100%', height:'50%' }}>
        <Grid item xs={12} md={4} sx={{  height:'100%' }}>
          <List onFicheOpen={handleFicheOpen} />
        </Grid>
        <Grid className='p-2' item xs={12} md={8} sx={{ height: '50%' }}>
          <Map  />
        </Grid>
        <Fiche open={isOpen} onClose={() => setIsOpen(false)} id = {selectedCrecheId} />
        {/* <ModifierCritere open={openModifier} onClose={() => setModifierCritere(false)} /> */}
      </Grid>     
    </>
  );
};

export default Navigation;
