import React, { useState, useEffect } from 'react'; // Importation de React, useState et useEffect depuis la bibliothèque 'react'
import PurpleShape from '../assets/PurpleShape.png'; // Importation de l'image PurpleShape à partir d'un fichier local
import Sidebar from '../Component/Sidebar'; // Importation du composant Sidebar depuis '../Component/Sidebar'
import axios from 'axios'; // Importation d'axios pour effectuer des requêtes HTTP
import { Box, Grid } from '@mui/material'; // Importation de Box et Grid depuis '@mui/material'
import Navbar from '../Component/NavBar'; // Importation du composant Navbar depuis '../Component/NavBar'

const MesReservations = () => {
  const [Annuler, SetAnnuler] = useState(false); // Variable d'état pour gérer l'état d'annulation
  const [reservation, setreservation] = useState([]); // Variable d'état pour stocker les réservations

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('api/parent/afficher_reservations'); // Envoi d'une requête GET à l'API backend pour récupérer les réservations
        setreservation(response.data); // Mise à jour de la variable d'état avec les réservations récupérées
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleEnregistrer = () => {
    SetAnnuler(false); // Réinitialisation de la variable d'état Annuler à false
    const fullNameInput = document.getElementById("full-name"); // Récupération de la valeur de l'élément avec l'ID "full-name"
    const nameCreche = document.getElementById("name-creche"); // Récupération de la valeur de l'élément avec l'ID "name-creche"
    const DateRdv = document.getElementById(""); // Récupération de la valeur de l'élément avec l'ID ""
    const HeureDebut = document.getElementById("heuredebut"); // Récupération de la valeur de l'élément avec l'ID "heuredebut"
    const HeureFin = document.getElementById("heurefin"); // Récupération de la valeur de l'élément avec l'ID "heurefin"
    console.log(fullNameInput.value, nameCreche.value, DateRdv.value, HeureDebut.value, HeureFin.value);
  }

  return (
    <div className=' flex flex-col gap-4'>
      <Navbar />
      <div className=' flex flex-row gap-4'>
        <div className="hidden md:flex">
          <Sidebar />
        </div>
        <div className="w-full overflow-y-scroll md:grid md:grid-cols-3  gap-12 justify-center md:pr-6">
          <img className='absolute left-[435px] top-[100px] w-[80px]' src={PurpleShape} alt="Forme violette" />

          {reservation.map((res) => (
            <div className="relative w-[340px] h-[300px] bg-white rounded-2xl p-4 hover:bg-gray-50 shadow-lg mr-4 mt-10 mb-2">
              <Grid container spacing={1}>
                <Grid item xs={12} key={res.id}>
                  <div key={res.id} className="px-4">
                    <p className="flex justify-start border-b-2 border-purple-400 py-2 px-4 w-full font-bold focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                      <span className="font-bold px-0"> </span>{res.nom_creche}
                      <span className='ml-[24vh]' ></span> {res.etat}
                    </p>
                    <p className="border-b border-purple-400 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                      <span className="font-semibold">Prenom enfant :</span> {res.enfants.prenom}
                    </p>
                    <p className="mb-10 border-b border-purple-400 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                      <span className="font-semibold">Age :</span> {res.enfants.age} {res.enfants.unite}
                    </p>
                  </div>
                </Grid>
              </Grid>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MesReservations; // Exportation du composant MesReservations