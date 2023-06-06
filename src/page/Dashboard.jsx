import React, { useState, useEffect } from 'react';
import Navbar from '../Component/NavBar';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import axios from 'axios';
import yellow from '../assets/yellow.png';

const Dashboard = () => {
  // Variables d'état pour stocker les données récupérées depuis l'API
  const [creches, setCreches] = useState(null); // Nombre de crèches
  const [crechesEnAttente, setCrechesEnAttente] = useState(null); // Nombre de crèches en attente
  const [users, setUsers] = useState(null); // Nombre d'utilisateurs

  useEffect(() => {
    // Récupération des données depuis l'API à l'aide d'Axios
    axios
      .get('/api/admin/DashboardCreche')
      .then((response) => {
        setCreches(response.data.count); // Mise à jour de la variable d'état avec les données reçues
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get('/api/admin/DashboardEnAttente')
      .then((response) => {
        setCrechesEnAttente(response.data.count); // Mise à jour de la variable d'état avec les données reçues
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get('/api/admin/DashboardUser')
      .then((response) => {
        setUsers(response.data.count); // Mise à jour de la variable d'état avec les données reçues
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Enregistrement des composants et des options de Chart.js
  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

  // Définition des données pour le graphique en barres
  const data = {
    labels: ['Utilisateurs', 'Crèches', 'Crèches en attente'],
    datasets: [
      {
        label: 'Statistiques générales',
        backgroundColor: '#f7b1a8',
        borderColor: '#f7b1a8',
        borderWidth: 1,
        hoverBackgroundColor: '#f5988b',
        hoverBorderColor: '#f5988b',
        data: [users, creches, crechesEnAttente], // Utilisation des données récupérées pour les valeurs du graphique
      },
    ],
  };

  // Définition des options pour le graphique en barres
  const options = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div className=''>
      <Navbar />
      <div className='h-[85vh] flex '>
        <div className='w-[67%] bg-gray-50 p-8 rounded shadow-xl'>
          <div className='mt-[5%] bg-[#AD98E9] text-white px-4 rounded-xl shadow-lg h-[30%]'>
            <h1 className='text-xl font-bold mb-4 py-4'>
              {creches} Crèches au total!
            </h1>
          </div>
          <div className='mt-[10%] p-4'>
            <div className='chart-container'>
              {/* Rendu du graphique en barres avec les données et les options fournies */}
              <Bar data={data} options={options} />
            </div>
          </div>
        </div>
        <div className='w-[33%] p-8 flex flex-col rounded-l-2xl shadow-lg'>
          <div className='h-1/2 mb-4 rounded-xl '>
            <img src={yellow} alt='Yellow' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
