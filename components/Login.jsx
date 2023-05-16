import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Switch, Route, BrowserRouter, Link } from 'react-router-dom';
import JouetEnfant from '../assets/JouetEnfant.png'
import BlueShape from '../assets/BlueShape.png'

const Login = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('/api/auth/connecter', { email, password });
          console.log(response.data);
        } catch (error) {
          console.log(error);

        }
      };

    useEffect(() => {
      setIsSmallScreen(window.innerWidth < 670);
      window.addEventListener("resize", () => setIsSmallScreen(window.innerWidth < 670));
    }, []);
    return (
      <div className='flex flex-wrap '>
      
          <div className={` w-full md:w-1/3 p-0  ${isSmallScreen ? "h-[150px]" : "h-screen"}  order-2 md:order-2 flex justify-center items-center md:items-start relative`}>
          <img className={`${isSmallScreen ? "hidden" : ""}`} src={JouetEnfant} alt="JouetEnfant" />
          </div>
          <div className='w-full p-6 md:w-2/3 h-screen order-1 md:order-1 flex justify-center items-center lg:mt-[20px] mb-4'>
            <div className='flex flex-col items-center justify-center md:w-2/3 lg:w-2/3 mx-auto'>
            <img className='pb-14 w-[350px]' src={BlueShape} alt="MignonBleu" />
            <form className='w-full' onSubmit={handleSubmit}>
  <input className='block w-full border p-4 mb-5 rounded-lg bg-[#D9D9D9] active:text-[#000000] black-text' type='email' placeholder='E-mail ou numero de téléphone' value={email} onChange={(e) => setEmail(e.target.value)}></input>
  <input className='block w-full border p-4 mb-3 rounded-lg bg-[#D9D9D9] active:text-[#000000] black-text ' type='password' placeholder='Mot de passe' value={password} onChange={(e) => setPassword(e.target.value)}></input>             
  <p>Mot de passe oublié ?</p>
  <button className='bg-[#FFB1A6] text-[#094076] font-bold py-2 w-full rounded-3xl mt-6 mb-4' type='submit'>Se Connecter</button>
</form> 
            </div>
  
  
              
          </div>
  
      
      </div> 
    );
}
export default Login