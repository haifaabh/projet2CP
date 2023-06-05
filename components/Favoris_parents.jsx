
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import Sidebar from './Sidebar';

const Favoris_parents = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios.get('/api/parentRoute/favoris')
      .then(res => setFavorites(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleRemoveFavorite = (crecheId) => {
    axios.delete(`/api/parentRoute/favoris/${crecheId}`)
      .then(res => {
        if (res.status === 200) {
          setFavorites(favorites.filter(favorite => favorite._id !== crecheId));
        }
      })
      .catch(err => console.log(err));
  };  
  return (
    <div>
       <Sidebar />

    <div className="flex flex-nowrap h-[100vh] justify-center ">

      
  {favorites.map((favorite, index) => (
    <div className="absolute top-[130px] w-[360px] h-[310px] bg-white rounded-2xl p-2 m-4 hover:bg-gray-50 shadow-lg ">
      <Grid container spacing={1}>
        <Grid item xs={12} key={favorite._id}>
          <div>
            <p className="flex justify-start border-b-2 border-purple-400 py-2 px-4 w-full font-bold focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
              <span className="font-bold px-0"> </span>{favorite.nom}
            </p>
            <p className="border-b border-purple-400 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
              <span className="font-semibold">tél :</span> {favorite.tél}
            </p>
            <p className="border-b border-purple-400 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
            <span className="font-semibold">Places disponibles :</span> {favorite.disponibilité_places}
          </p>
          <p className="border-b border-purple-400 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
            <span className="font-semibold">Jours d'accueil :</span> {favorite.jours_accueil.join(', ')}
          </p>
          <button className="bg-white text-[#094076] w-[95px] h-[25px] rounded-[12px] text-[14px] top-[40px] left-[25px] font-[Montserrat] relative border border-purple-400 "  >
              Plus d'infos
            </button>
            <button className="bg-[#F45F3E] text-[#094076] w-[95px] h-[25px] rounded-[12px] font-[Montserrat] top-[40px] right-[-115px] text-[14px] p-[1px] relative" 
                    onClick={() => handleRemoveFavorite(favorite._id)}>
              Retirer
            </button>
          </div>
        </Grid>
      </Grid>
    </div>
  ))}
</div>
</div>
  );
  
      };  
  
export default Favoris_parents; 
