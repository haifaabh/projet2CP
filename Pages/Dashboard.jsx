import React, { useState, useEffect } from 'react';
import Navbar from '../Pages/NavBar';
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS,Tooltip,Legend,CategoryScale,LinearScale,BarElement} from 'chart.js';
import axios from 'axios';

const Dashboard = () => {
    const [creches, setCreches] = useState(null);
    const [crechesEnAttente, setCrechesEnAttente] = useState(null);
    const [users, setUsers] = useState(null);
  
    useEffect(() => {
      axios
        .get('/api/adminRoute/DashboardCreche')
        .then((response) => {
          setCreches(response.data.count);
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .get('/api/adminRoute/DashboardEnAttente')
        .then((response) => {
          setCrechesEnAttente(response.data.count);
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .get('/api/adminRoute/DashboardUser')
        .then((response) => {
          setUsers(response.data.count);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale, 
    Tooltip,
    Legend
    )

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
        data: [users, creches, crechesEnAttente],
      },
    ],
  };
  
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
            <div className=' mt-[5%] bg-[#AD98E9] text-white px-4 rounded-xl shadow-lg h-[30%]'>
            <h1 className='text-xl font-bold mb-4 py-4'>
               {creches} Crèches au total !
            </h1>
            </div>
            <div className='mt-[10%] p-4'>
                <div className='chart-container'>
                <Bar data={data} options={options} />
                </div>
            </div>
        </div>
        <div className=' w-[33%] p-8 flex flex-col rounded-l-2xl shadow-lg'>
            <div className='bg-[#99BFE4] h-1/2 mb-4 rounded-xl  shadow-lg'>
                Total
            </div>

        </div>

    </div>
    </div>
  );
};

export default Dashboard;