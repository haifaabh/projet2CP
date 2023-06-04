import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react';
import Navbar from '../Navbar';

import { Box, Grid } from '@mui/material';

const Crecheadmin = () => {
  const [creches, setCreches] = useState([]);
  useEffect(() => {
    axios.get('/api/AdminRoute/afficher_toutes_creches')
      .then(res => setCreches(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleRemoveCreche = (crecheId) => {
    axios.delete(`/api/AdminRoute/sup_creches/${crecheId}`)
      .then(res => {
        if (res.status === 200) {
          setCreches(creches.filter(creche => creche._id !== crecheId));
        }
      })
      .catch(err => console.log(err));
  }; 
  
    
    return (
      <div className="flex flex-wrap justify-center">
        <Navbar/> 
        
          {creches.map((creche, index) => (
            <div key={index} className="relative top-[150px] w-[360px] h-[310px] bg-white rounded-2xl p-2 m-4 hover:bg-gray-50 shadow-lg ">
              <Grid container spacing={1}>
                <Grid item xs={12} key={creches.id}>
                  <div>
                    <p className="flex justify-start border-b-2 border-purple-400 py-2 px-4 w-full font-bold focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                      <span className="font-bold px-0"> </span>{creche.nom}
                    </p>
                    <p className="border-b border-purple-400 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                      <span className="font-semibold">tél :</span> {creche.tél}
                    </p> 
                    <p className="border-b border-purple-400 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                      <span className="font-semibold"> Places disponibles:</span> {creche.disponibilité_places}
                    </p> 
                    <p className="border-b border-purple-400 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                      <span className="font-semibold"> Note d'evaluation :</span> {creche.note_évaluation}
                    </p> 
                    <button className="bg-[#F45F3E] text-[#094076] w-[100px] h-[30px] rounded-[16px] font-[Montserrat] top-[80px] right-[-120px] text-[14px] p-[5px] relative" onClick={() => handleRemoveCreche(creche._id)}>
                      Retirer
                    </button>
                    <p className="text-[#094076] text-[17px] top-[-20px] px-3 font-[Montserrat] relative underline">
                      Fiche descriptive
                   </p>
                  </div>
                </Grid>
              </Grid>
            </div>
          ))}
        </div>
      
    );
  }

export default Crecheadmin;
