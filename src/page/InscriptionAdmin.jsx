import React, { useState, useEffect } from 'react';
import logoImg from '../Component/logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const InscriptionsAdmin= () => {
const [isSmallScreen, setIsSmallScreen] = useState(false);
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();
const [error, setError] = useState('');



const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('/api/admin/connecter_admin', { email, password });
        console.log(response.data);
        navigate('/dashboard');
      } catch (error) {
        console.log(error);
        // Display error message received from the backend
        setError(error.response.data.msg);
      }
    };
  

  useEffect(() => {
    setIsSmallScreen(window.innerWidth < 670);
    window.addEventListener("resize", () => setIsSmallScreen(window.innerWidth < 670));
    return () => {
      window.removeEventListener("resize", () => setIsSmallScreen(window.innerWidth < 670));
    }
  }, []);

  return (
    
    <div className='flex flex-wrap '>
    

      <div className='items-center w-full md:w-1/3 p-4 bg-[#094076] rounded order-1 md:order-1'>
        <div className="flex items-center">
          <img className='flex left-9 h-70 w-40 ml-2 mt-8 h-[80px] w-[80px] hidden md:block' src={logoImg} alt="Logo" />
        </div>
        <div className={`${isSmallScreen ? "text-center " : "text-left mt-[20px]"} mt-2`}>
          <h1 className={`${isSmallScreen ? "text-[30px] mt-0" : "text-[30px]"} text-[#094076] font-bold mb-2 md:mb-2 px-4 md:px-6`}>INSCRIVEZ-VOUS</h1>
          <p className={`${isSmallScreen ? "text-[12px] mb-0" : "text-[12px] mb-4"} px-4 md:px-6 whitespace-pre-wrap font-regular text-white text-lg`}>Bienvenue sur la page de connexion de l'admin.
          <br /> <br />Connectez-vous avec vos identifiants pour accéder à votre compte.<br /></p>
        </div>
      </div>

      <div className='w-full p-6 md:w-2/3 h-screen order-2 md:order-2 flex justify-center items-center lg:mt-[20px] mb-4'>
        <div className='flex flex-col text-left items-center justify-center md:w-2/3 lg:w-2/3 mx-auto'>
          <p className='mt-0 mb-4 font-bold text-[30px]  text-[#094076] text-left w-full'>Administrateur</p> 
          <p className='mt-0 mb-4 font-semibold text-[25px] text-left w-full'>Connexion</p> 
          <form className='w-full' onSubmit={handleSubmit}>
  <input className='block w-full border p-8 mb-3 rounded-lg  bg-[#e2e2e2]  text-[#181818] selection:text-[#000000] active:text-[#000000] black-text' type='email' placeholder='E-mail ou numero de téléphone' value={email} onChange={(e) => setEmail(e.target.value)}></input>
  <input className='block w-full border p-8 mb-3 rounded-lg  bg-[#e2e2e2]  text-[#181818] selection:text-[#000000] active:text-[#000000] black-text ' type='password' placeholder='Mot de passe' value={password} onChange={(e) => setPassword(e.target.value)}></input>    
            <button className={`flex justify-center bg-[#094076] text-[#ffffff] font-bold py-2 w-1/2 rounded-3xl mt-4 mb-4 ${isSmallScreen ? 'sm:text-sm' : 'text-base'}`}>Se connecter</button>
            </form> 
            {error && (
            <div className="error-box">
              <p className="error-message">{error}</p>
            </div>
          )}
            </div>

        </div>

        <style>
        {`
        .error-box {
          background-color: #00000;
          color: #094076;
          font-weight: bold;
          padding: 10px;
          border-radius: 4px;
          margin-top: 10px;
          text-align: center;
        }

        .error-message {
          margin: 0;
        }
        `}
      </style>
    </div> 
  );
}

export default InscriptionsAdmin