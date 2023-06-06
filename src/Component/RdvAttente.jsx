import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Grid } from '@mui/material';
import Navbar from '../Component/NavBar';
import SideBar from '../Component/Sidebar/Sidebar';

const RdvAttente = () => {
  const [rdvs, setRdvs] = useState([]);
    
  useEffect(() => {
    const getRdvs= async () => {
      try
      {
        const res = await axios.get('/api/proprietaire/mes_rendezvous/en_attente');
        setRdvs(res.data);
      }
      catch (err) {
        console.error(err);
      }
    };
    getRdvs();
  }, []);

  const handleAccepter = async (id) => {
    try {
      const result = await axios.post(`/api/proprietaire/mes_rendezvous/en_attente/accepter/${id}`);
      console.log(result.data);
      const updatedRdvs = rdvs.filter((rdv) => rdv._id !== id);
      setRdvs(updatedRdvs);
     } catch (err) {
      console.error(err);
     }
  };

  const handleRefuser = async (id)=>
  {
    try {
        const result = await axios.delete(`/api/proprietaire/mes_rendezvous/en_attente/refuser/${id}`);
        console.log(result.data);
        const updatedRdvs = rdvs.filter((rdv) => rdv._id !== id);
        setRdvs(updatedRdvs);
       } catch (err) {
        console.error(err);
       }
  };

  return (
        
    <div className=' flex flex-col gap-4'>
      <Navbar />
      <div className=' flex flex-row gap-4'>

        <div className=" md:flex">
            <SideBar />
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
                 <button
                  className="bg-white text-[#094076] w-[100px] h-[30px] rounded-[16px] text-[16px] top-[50px] left-[25px] font-[Montserrat] relative border border-purple-400"
                  onClick={() => handleAccepter(rdv._id)}
                >
                  Accepter
                </button>
              <button className="bg-[#F45F3E] text-[#094076] w-[100px] h-[30px] rounded-[16px] font-[Montserrat] top-[50px] right-[-85px] text-[16px] p-[1px] relative" 
                onClick={() => handleRefuser(rdv._id)}
                   >
              Refuser
            </button>
              
            </Grid>
          </Grid>
        </div>
         ))}
   
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
                 <button
                  className="bg-white text-[#094076] w-[100px] h-[30px] rounded-[16px] text-[16px] top-[50px] left-[25px] font-[Montserrat] relative border border-purple-400"
                  onClick={() => handleAccepter(rdv._id)}
                >
                  Accepter
                </button>
              <button className="bg-[#F45F3E] text-[#094076] w-[100px] h-[30px] rounded-[16px] font-[Montserrat] top-[50px] right-[-85px] text-[16px] p-[1px] relative" 
                onClick={() => handleRefuser(rdv._id)}
                   >
              Refuser
            </button>
              
            </Grid>
          </Grid>
        </div>
         ))}
   
        </div>
        </div>
    </div>
  );
};

export default RdvAttente;