import React, { useState } from 'react';
import { CssBaseline, Grid } from '@mui/material';
// import Map from '../components/Map/Map';
import List from '../../Pages/Navigation/List';
import Fiche from '../../Pages/Navigation/Fiche';
import  Map from '../../components/Map';
import ModifierCritere from '../../components/ModifierCritere';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import ModifierCritere from '../components/Map/ModifierCritere';

const Navigation = () => {
  const [openModifier, setModifierCritere] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const creches = location.state.creches || [];  
console.log(creches);

  const handleFicheOpen = () => {
    setIsOpen(true);
  };

  const handleModifierCriteres = () => {
    setModifierCritere(true);
  }


return (
  <>
    <Grid container sx={{ width: '100%', height:'50%' }}>
      <Grid item xs={12} md={4} sx={{  height:'100%' }}>
        <List onFicheOpen={handleFicheOpen} creches={creches} />
      </Grid>
      <Grid className='p-2' item xs={12} md={8} sx={{ height: '50%' }}>
        <Map onModifierCritere={handleModifierCriteres} />
      </Grid>
      <Fiche
            open={isOpen}
            onClose={() => setIsOpen(false)}
            creches={creches}
          />
          <ModifierCritere
            open={openModifier}
            onClose={() => setModifierCritere(false)}
          />
      </Grid>
      <CssBaseline />
    </>
  );
};

export default Navigation;


// import React, { useState } from 'react';
// import { CssBaseline, Grid } from '@mui/material';
//  import Map from '../../components/Map';
// import List from '../Navigation/List';
// import Fiche from './Fiche';
// // import ModifierCritere from '../components/Map/ModifierCritere';

// const Navigation = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedCrecheId, setSelectedCrecheId] = useState(null); 

//   const handleFicheOpen = (id) => {
//     setSelectedCrecheId(id);
//     setIsOpen(true);
//   };


//   return (
//     <>

//       <Grid container sx={{ width: '100%', height:'50%' }}>
//         <Grid item xs={12} md={4} sx={{  height:'100%' }}>
//           <List onFicheOpen={handleFicheOpen} />
//         </Grid>
//         <Grid className='p-2' item xs={12} md={8} sx={{ height: '50%' }}>
//           {/* <Map onModifierCritere={handleModifierCriteres} /> */}
//         </Grid>
//         <Fiche open={isOpen} onClose={() => setIsOpen(false)} id = {selectedCrecheId} />
//         {/* <ModifierCritere open={openModifier} onClose={() => setModifierCritere(false)} /> */}
//       </Grid>     
//     </>
//   );
// };

// export default Navigation;