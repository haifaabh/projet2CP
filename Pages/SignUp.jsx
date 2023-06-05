import React from 'react'
import jouetImg from '../assets/jouet.png'
import logoImg from '../assets/logo.png' 
import axios from 'axios';
import SignIn from './SignIn';
import { Link } from 'react-router-dom';

import { useState, useEffect } from 'react'
 const SignUp = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
//   const [isParent, setIsParent] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  useEffect(() => {
    setIsSmallScreen(window.innerWidth < 670);
    window.addEventListener("resize", () => setIsSmallScreen(window.innerWidth < 670));
  }, []);

  function handleCheckboxChange() {
    setIsChecked(!isChecked);
    console.log(getCheckboxValue());
    // setIsParent(!isParent);
  }
  const handleButtonClick = () => {
    if (!isChecked) {
      // Navigate to Accueil page when isChecked is true
      // Replace '/accueil' with the desired URL for the Accueil page
      window.location.href = '/Login';
    } else {
      // Navigate to SignInCreche2 page when isChecked is false
      // Replace '/SignInCreche2' with the desired URL for the SignInCreche2 page
      window.location.href = '/SignInCreche2';
    }
  };

  function getCheckboxValue() {
    return isChecked;
  }

  function handleSubmit(event) {
    event.preventDefault();
  axios.post('/api/auth/inscrire_parent', {
    username,
    email,
    password,
    passwordCheck,
  })
    .then(response => {
      console.log(response.data);
      // do something with the response
    })
    .catch(error => {
        console.log(error);
        if (error.response.status === 400) {
          console.log(error.response.data.msg);
        } else if (error.response.status === 401) {
          console.log(error.response.data.msg);
        }
      });
}


  return (
    <div className='flex flex-wrap '>
    
        <div className={` w-full md:w-1/3 p-4 bg-[#FBEBAC] rounded ${isSmallScreen ? "h-[28vh]" : "h-screen"}  order-1 md:order-1 flex justify-center items-center md:items-start relative`}>
          {/* Image ici */}
          <img className={`absolute ${isSmallScreen ? "top-0 left-0 h-[150px] w-[80px]" : "left-0 right-0 bottom-0 mx-auto"} mb-2 md:mb-2 h-${isSmallScreen ? "90" : "240"}px w-30 sm:h-[110px] sm:w-[10] md:w-30 md:h-[160px] lg:h-[240px] lg:w-30  md:3/4`} src={jouetImg} alt="Jouet" />
          <img className='absolute left-7 top-0 h-[110px] w-[58px] ml-2 mt-2 hidden md:block' src={logoImg} alt="Logo" />
          <div className="absolute top-0 right-0 mt-2 mr-2 hidden md:block">
          </div>
          <div className={`${isSmallScreen ? "text-center" : "text-left"} mt-2 md:mt-[100px]`}>
          <h1 className={`${isSmallScreen ? "text-[5vh] mt-0" : "text-[30px]"} text-[#094076]  mt-2 font-bold mb-2 md:mb-2 px-4 md:px-6`}>INSCRIVEZ-VOUS</h1>    
           <p className={`${isSmallScreen ? "text-[12px] mb-0 ml-[10vh]" : "text-[12px] mb-4"} text-[#000000]  px-4 md:px-4 whitespace-pre-wrap  text-lg font-regular`}>Pour bénéficier de fonctionnalités avancées  pour la recherche de services de garde pour enfants. </p>  </div>

        </div>
        <div className='w-full p-8 mt- md:w-2/3 h-screen order-2 md:order-2 flex justify-center items-center lg:mt-[20px] mb-4'>
          <div className='flex flex-col items-center justify-center md:w-2/3 lg:w-2/3 mx-auto'>
           
           <form className='w-full' onSubmit={handleSubmit}>
        
            <input className=' block w-full border p-4 mb-3 rounded-lg  bg-[#e2e2e2]  text-[#181818] selection:text-[#000000] active:text-[#000000] black-text' type='email' placeholder='E-mail'value={email} onChange={(e) => setEmail(e.target.value)}></input>
            
            <input className=' block w-full border p-4 mb-3 rounded-lg  bg-[#e2e2e2]  text-[#181818] selection:text-[#000000] active:text-[#000000] black-text' type='text' placeholder='Nom Complet'  value={username} onChange={(e) => setUsername(e.target.value)}></input>
            
            <input className=' block w-full border p-4 mb-3 rounded-lg  bg-[#e2e2e2]  text-[#181818] selection:text-[#000000] active:text-[#000000] black-text ' type='password' placeholder='Mot de passe' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            
            <input className=' block w-full border p-4 mb-3 rounded-lg  bg-[#e2e2e2]  text-[#181818] selection:text-[#000000] active:text-[#000000] black-text' type='password' placeholder='Confirmez votre mot de passe' value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)}></input>
            {/* <Link to="/SignInCreche2"> */}
            <p><input className='mr-2 mb-3 z-10' type="checkbox" value='boolean' checked={isChecked} onChange={handleCheckboxChange} />S'inscrire en tant que responsable</p> 
              {/* </Link> */}
             
             <p className='mt-5 text-center'>En vous inscrivant, vous acceptez nos Conditions générales et notre Politique de confidentialité </p> 
             <div className='flex justify-center'>
{/* <Link to="/Accueil"> */}
            
              <button
        className="flex justify-center bg-[#FFB1A6] text-[#094076] font-bold py-2 px-16 rounded-3xl mt-4 mb-4"
        onClick={handleButtonClick}
      >
        S'inscrire
      </button>
{/* </Link> */}
</div> 
              </form>        
             
              <Link to="/SignIn">
      <button className='flex justify-center bg-[#99BFE4] text-[#094076] font-bold py-2 px-6 rounded-3xl mt-0 mb-0'>
        Ajouter Mes enfants
      </button>
    </Link>
         
            </div>


            
        </div>

    
    </div> 
  );
}


  
  export default SignUp;
  
