import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import Sidebar from '../component/Sidebar/Sidebar';


const AfficherReservation = () => {

const [reservations, setReservations] = useState([]);

useEffect(() => {
    axios.get('/api/proprietaire/afficher_reservations_acceptees')
      .then(res => setReservations(res.data))
      .catch(err => console.log(err));
  }, []);
 

  return (
    <div>
     <Sidebar />  
    <div className="flex flex-nowrap h-[100vh] justify-center">
    {reservations.map((reservation,index) => (
      <div key={index} className="relative top-[-600px] w-[360px] h-[310px] bg-white rounded-2xl p-2 m-4 hover:bg-gray-50 shadow-lg">
        {/* key={reservations.id} */}

        <Grid container spacing={1}>
          <Grid item xs={12} key={reservations.id}>
        
              <div >
                <p className="flex justify-start border-b-2 border-purple-400 py-2 px-4 w-full font-bold focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                  <span className="font-bold px-0">Date: </span> {reservation.date}
                </p>
                <p className="border-b border-purple-400 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                  <span className="font-semibold">Nom Crèche: </span> {reservation.nom_creche}
                </p>
                 <p className="border-b border-purple-400 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                  <span className="font-semibold">Prénom Enfant:</span> {reservation.enfants.prenom}
                </p>
                <p className="border-b border-purple-400 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                  <span className="font-semibold">AgeEnfant: </span> {reservation.enfants.age } <span> {reservation.enfants.unite} </span>
                </p>
              </div>
          
          </Grid>
        </Grid>
      </div>
        ))}
    </div>
  </div>
  );
            };

export default AfficherReservation;
