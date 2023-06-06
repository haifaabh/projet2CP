import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Grid } from '@mui/material';
import Navbar from '../Component/NavBar';

const Attente = () => {
  const [creches, setCreches] = useState([]);

  useEffect(() => {
    const getCreches = async () => {
      const res = await axios.get('/api/admin/afficher_toutes_creches_attentes');
      setCreches(res.data);
    };
    getCreches();
  }, []);

  const handleAccepter = async (id) => {
    try {
      const result = await axios.post(`/api/admin/creche_attente/${id}`, { accepte: true });
      console.log(result.data);
      const updatedCreches = creches.filter((creche) => creche._id !== id);
      setCreches(updatedCreches);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRefuser = async (id) => {
    try {
      const result = await axios.post(`/api/AdminRoute/creche_attente/${id}`, { accepte:false  });
      console.log(result.data);
      const updatedCreches = creches.filter((creche) => creche._id !== id);
      setCreches(updatedCreches);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-wrap justify-center">
        {creches.map((creche) => (
          <div
            key={creche._id}
            className="relative top-[10px] w-[330px] h-[270px] bg-white rounded-2xl p-2 m-4 hover:bg-gray-50 shadow-lg"
          >
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <p className="flex justify-start border-b-2 border-purple-400 py-2 px-4 w-full font-bold focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                  <span className="font-bold px-0">Nom :</span> {creche.nom}
                </p>
                <p className="border-b border-purple-400 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                  <span className="font-semibold">Code :</span> {creche.code}
                </p>
                <p className="border-b border-purple-400 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                  <span className="font-semibold">Tél :</span> {creche.tél}
                </p>
                <button
                  className="bg-white text-[#094076] w-[100px] h-[30px] rounded-[16px] text-[16px] top-[80px] left-[25px] font-[Montserrat] relative border border-purple-400"
                  onClick={() => handleAccepter(creche._id)}
                >
                  Accepter
                </button>
              <button className="bg-[#F45F3E] text-[#094076] w-[100px] h-[30px] rounded-[16px] font-[Montserrat] top-[80px] right-[-85px] text-[16px] p-[1px] relative" 
                 onClick={() => handleRefuser(creche._id)}  
                   >
              Refuser
            </button>
              
            </Grid>
          </Grid>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Attente;