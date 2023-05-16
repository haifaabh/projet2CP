import React, { useState, useEffect } from 'react';
// import BlueShape from '../assets/BlueShape.png'
import Sidebar from '../components/Sidebar/Sidebar';
import axios from 'axios'


const MonCompteResponsable = () => {
  const [modeEdition,SetmodeEdition] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(async () => {
    await axios.get('api/parentRoute/parents')
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
    axios.put('api/parentRoute/modifier_profil', {
      username,
      email,
      password
    })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }
  return (
    <div className=' relative'>
      { <Sidebar /> }
      <button className='absolute top-0 right-4 m-2 text-[#094076] font-semibold underline' variant='outlined' onClick={ModifierEdition} >Modifier</button>
    {/* { { <img className='absolute left-[500px] top-[30px] w-[80px]' src={PurpleShape} alt="Forme violette" /> } */} */}
      <div className="absolute w-[453px] h-[400px] bg-white rounded-2xl p-2  hover:bg-gray-50 shadow-lg left-[333px] top-[70px]">
        
        <form className='ml-[10%] w-[300px]'> 
        <label htmlFor="full-name" className="mt-10 block text-gray-500 text-8 mb-0">
        Nom complet
      </label>
      <input
        readOnly={!modeEdition}
        type="text"
        id="full-name"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="border-b border-purple-400 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
      />
              <label htmlFor="E-mail" className="mt-6 block text-gray-500 text-8 mb-0">
        E-mail
      </label>
      <input
        readOnly={!modeEdition}
        type="email"
        id="E-mail"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="border-b border-purple-400 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
      />
              <label htmlFor="mdp" className="mt-6 block text-gray-500 text-8 mb-0">
        Mot de passe
      </label>
      <input
        readOnly={!modeEdition}
        type="password"
        id="mdp"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="border-b border-purple-400 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
      />
          </form> 
          {
            modeEdition && (
              <button className='bg-[#AD98E9] w-24 h-10 text-white rounded-2xl absolute bottom-2 right-4 m-2' variant='outlined' onClick={handleEnregistrer} >Enregistrer</button>
            )}


    </div>
      </div>
  )
}

export default MonCompteResponsable