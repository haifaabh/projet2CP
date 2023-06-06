import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid } from '@mui/material';
import Sidebar from '../Component/Sidebar/Sidebar';
import Navbar from './NavBar';

const AfficherRdv = () => {
  const [rdvs, setRdvs] = useState([]);


  useEffect( () => 
    {  
        axios.get('/api/proprietaire/mes_rendezvous/acceptes')
                .then(res => setRdvs(res.data))
                .catch(err => console.log(err));
    }
, []);

  return (
    <div className=' flex flex-col gap-4'>
    <Navbar />
    <div className=' flex flex-row gap-4'>

      <div className="hidden md:flex">
          <Sidebar />
      </div>
      <div className="w-full overflow-y-scroll hidden md:grid md:grid-cols-3 gap-4 justify-center md:pr-6">
    {rdvs.map((rdv) => (
        <div
        key={rdv._id}
          
          className="relative w-full h-[270px] bg-white rounded-2xl p-2  mb-4 mr-8 hover:bg-gray-50 shadow-lg"
        >
          <Grid container spacing={1}>
            <Grid item xs={12}>
            <p className="flex justify-start border-b-2 border-purple-400 py-2 px-4 w-full font-bold focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                  <span className="font-bold px-0"> parent </span>
                </p>
                <p className="border-b border-purple-400 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                  <span className="font-semibold"> date: </span> {rdv.date}
                </p>
                <p className="border-b border-purple-400 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                  <span className="font-semibold">heure début :</span> {rdv.heure_debut}
                </p>
                <p className="border-b border-purple-400 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                  <span className="font-semibold">heure fin :</span> {rdv.heure_fin}
                </p>
              </Grid>
            </Grid>
          </div>
        ))}
      </div>
      <div className="w-full grid grid-cols-1 md:hidden gap-4 justify-center md:pr-6">
      {rdvs.map((rdv) => (
        <div
        key={rdv._id}
          
          className="relative w-full h-[270px] bg-white rounded-2xl p-2  mb-4 mr-8 hover:bg-gray-50 shadow-lg"
        >
          <Grid container spacing={1}>
            <Grid item xs={12}>
            <p className="flex justify-start border-b-2 border-purple-400 py-2 px-4 w-full font-bold focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                  <span className="font-bold px-0"> parent </span>
                </p>
                <p className="border-b border-purple-400 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                  <span className="font-semibold"> date: </span> {rdv.date}
                </p>
                <p className="border-b border-purple-400 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                  <span className="font-semibold">heure début :</span> {rdv.heure_debut}
                </p>
                <p className="border-b border-purple-400 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                  <span className="font-semibold">heure fin :</span> {rdv.heure_fin}
                </p>
              </Grid>
            </Grid>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default AfficherRdv;
