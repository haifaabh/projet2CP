import React, { useState, useEffect } from 'react';
import BlueShape from '../assets/BlueShape.png';
import Sidebar from '../Component/Sidebar/Sidebar';
import Navbar from '../Component/NavBar';
import axios from 'axios';


const MonCompteResponsable = () => {
  const [modeEdition,SetmodeEdition] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(async () => {
    await axios.get('api/parent/parents')
      .then(res => {
        setUsername(res.data.username);
        setEmail(res.data.email);
      })
      .catch(err =>
        console.log(err));
  
}, []);


  const ModifierEdition = () => {
    SetmodeEdition(!modeEdition);
  }

  const handleEnregistrer = () => {
    SetmodeEdition(false);
    axios.put('api/parent/modifier_profil', {
      username,
      email,
      password
    })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }
  
  return (
    <div className=''>
        <Navbar />
    <div className=' relative'>
    <button className='absolute top-[50px] left-[1200px] m-2 text-[#094076] font-semibold underline' variant='outlined' onClick={ModifierEdition} >Modifier</button>

    <div className="absolute  top-[-2px]">
          <Sidebar />



      <div/>
    {/* { <img className='absolute left-[645px] top-[30px] w-[150px]' src={BlueShape} alt="Forme bleue" /> } */}
      <div className="absolute w-[453px] h-[400px] bg-pink rounded-2xl p-2  hover:bg-gray-50 shadow-lg left-[500px] top-[65px]">
        
        <form className='ml-[10%] w-[300px]'> 
        <label htmlFor="full-name" className="mt-10 ml-4 block text-gray-700 text-8 mb-2">
        Nom complet
      </label>
      <input
        readOnly={!modeEdition}
        type="text"
        id="full-name"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className=" bg-purple-200 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent rounded-full"
        />
        <label htmlFor="E-mail" className="mt-10 ml-4 block text-gray-700 text-8 mb-2">
        E-mail
      </label>
      <input
        readOnly={!modeEdition}
        type="email"
        id="E-mail"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className=" bg-purple-200 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent rounded-full"
      />
      <label htmlFor="mdp" className="mt-10 ml-4 block text-gray-700 text-8 mb-2">
      Mot de passe
    </label>
      <input
        readOnly={!modeEdition}
        type="password"
        id="mdp"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className=" bg-purple-200 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent rounded-full"
      />
          </form> 
          {
            modeEdition && (
                <button className='bg-[#AD98E9] w-24 h-10 text-white rounded-2xl absolute bottom-2 right-4 m-2' variant='outlined' onClick={handleEnregistrer} >Enregistrer</button>
            )}


    </div>
      </div>
      </div>
      </div>
  )
}

export default MonCompteResponsable;