import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Grid } from '@mui/material';
import Navbar from '../component/Navbar';

const RsvAttente = () => {
    const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const getReservations= async () => {
      const res = await axios.get('/api/proprietaire/afficher_reservations_attentes');
      setReservations(res.data);
    };
    getReservations();
  }, []);

  const handleAccepter = async (id) => {
    try {
      const result = await axios.post(`/api/proprietaire/mes_reservations/en_attente/accepter/${id}`);
      console.log(result.data);
      const updatedReservations = reservations.filter((reservation) => reservation._id !== id);
      setReservations(updatedReservations);
     } catch (err) {
      console.error(err);
     }
  };

  const handleRefuser = async (id)=>
  {
    try {
        const result = await axios.delete(`/api/proprietaire/mes_reservations/en_attente/refuser/${id}`);
        console.log(result.data);
        const updatedReservations = reservations.filter((reservation) => reservation._id !== id);
        setReservations(updatedReservations);
       } catch (err) {
        console.error(err);
       }
  };

  

  return (
     <div>
        <Navbar />  
      <div className="flex flex-wrap justify-center">
      {reservations.map((reservation) => (
          <div
          key={reservation._id}
            
            className="relative top-[90px] w-[330px] h-[270px] bg-white rounded-2xl p-2 m-4 hover:bg-gray-50 shadow-lg"
          >
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <p className="flex justify-start border-b-2 border-purple-400 py-2 px-4 w-full font-bold focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                  <span className="font-bold px-0">Date :</span> {reservation.date}
                </p>
                <p className="border-b border-purple-400 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                  <span className="font-semibold">Crèche :</span> {reservation.nom_creche}
                </p>
                <p className="border-b border-purple-400 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                  <span className="font-semibold"> Prénom: </span> {reservation.enfants.prenom}
                </p>
                <p className="border-b border-purple-400 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                  <span className="font-semibold"> Age : </span> {reservation.enfants.age } <span> {reservation.enfants.unite} </span>
                </p>
                 <button
                  className="bg-white text-[#094076] w-[100px] h-[30px] rounded-[16px] text-[16px] top-[50px] left-[25px] font-[Montserrat] relative border border-purple-400"
                  onClick={() => handleAccepter(reservation._id)}
                >
                  Accepter
                </button>
              <button className="bg-[#F45F3E] text-[#094076] w-[100px] h-[30px] rounded-[16px] font-[Montserrat] top-[50px] right-[-85px] text-[16px] p-[1px] relative" 
                
                onClick={() => handleRefuser(reservation._id)}
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

export default RsvAttente;
