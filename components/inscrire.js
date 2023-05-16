import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import jouetImg from '../assets/jouet.png';
// import logoImg from '../assets/logo.png';

const SignUp = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');


  useEffect(() => {
    setIsSmallScreen(window.innerWidth < 670);
    window.addEventListener('resize', () =>
      setIsSmallScreen(window.innerWidth < 670)
    );
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/auth/inscrire', { ///api/auth
        email: email,
        password: password,
        username: username,
        isOwner:false,
      });
    
      console.log(response.data.msg);
      // Do something with the response, such as displaying a success message
    } catch (error) {
      console.log(error);
      // Do something with the error, such as displaying an error message
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
    else if (name === 'username') setUsername(value);
  };

  const [isChecked, setIsChecked] = useState(false);

 function handleCheckboxChange() {
    setIsChecked(!isChecked);
  }

  return (
    <div className='flex flex-wrap '>
    
        <div className={` w-full md:w-1/3 p-4 bg-[#FBEBAC] rounded ${isSmallScreen ? "h-[150px]" : "h-screen"}  order-1 md:order-1 flex justify-center items-center md:items-start relative`}>
          {/*Image ici*/}
          {/* <img className={`absolute ${isSmallScreen ? "top-0 left-0 h-[150px] w-[80px]" : "left-0 right-0 bottom-0 mx-auto"} mb-2 md:mb-2 h-${isSmallScreen ? "90" : "240"}px w-30 sm:h-[110px] sm:w-[10] md:w-30 md:h-[160px] lg:h-[240px] lg:w-30  md:3/4`} src={jouetImg} alt="Jouet" />
          {/*<img className='absolute left-0 right-0 bottom-0 mx-auto mb-2 md:mb-2 h-[110px] w-30 sm:h-[110px] sm:w-[10] md:w-30 md:h-[160px] lg:h-[240px] lg:w-30  md:3/4' src={jouetImg} alt="Jouet" /> */}
          {/* <img className='absolute left-0 top-0 h-15 w-9 ml-2 mt-2 hidden md:block' src={logoImg} alt="Logo" /> */} 
          <div className="absolute top-0 right-0 mt-2 mr-2 hidden md:block">
          </div>
          <div className={`${isSmallScreen ? "align-text-top mt-2 text-left ml-[70px]" : "text-center mt-[110px]"} `}>
          <h1 className={`${isSmallScreen ? "text-[15px] mt-0" : "text-[30px]"} text-[#094076] font-bold mb-2 md:mb-2 px-4 md:px-6`}>INSCRIVEZ-VOUS</h1>
          <p className={`${isSmallScreen ? "text-[10px] mb-0" : "text-[12px] mb-4"} px-4 md:px-6 whitespace-pre-wrap`}>Pour bénéficier de fonctionnalités avancées<br></br>
           pour la recherche de services<br></br> de garde pour enfants.</p>
          </div>

        </div>
        <div className='w-full p-6 md:w-2/3 h-screen order-2 md:order-2 flex justify-center items-center lg:mt-[20px] mb-4'>
          <div className='flex flex-col items-center justify-center md:w-2/3 lg:w-2/3 mx-auto'>
           <form className='w-full'>
          
        
            <input className=' block w-full border p-4 mb-3 rounded-lg bg-[#D9D9D9] opacity-40  text-[#8E8E8E]' type='email' placeholder='E-mail ou numero de téléphone'></input>
            
            <input className=' block w-full border p-4 mb-3 rounded-lg bg-[#D9D9D9] opacity-40 ' type='text' placeholder='Nom Complet'></input>
            
            <input className=' block w-full border p-4 mb-3 rounded-lg bg-[#D9D9D9] opacity-40 ' type='password' placeholder='Mot de passe'></input>
            
            <input className=' block w-full border p-4 mb-2  rounded-lg bg-[#D9D9D9] opacity-40 ' type='password' placeholder='Confirmez votre mot de passe'></input>
            <p><input className='mr-2 mb-3' type="checkbox" value='boolean' checked={isChecked} onChange={handleCheckboxChange} />Se souvenir de mes coordonnées</p>
              <p className='mt-5 text-center'>En vous inscrivant, vous acceptez nos Conditions générales et notre Politique de confidentialité .</p> 
              <button className='bg-[#FFB1A6] text-[#094076] font-bold py-2 w-full rounded-3xl mt-4 mb-4'>Suivant</button>
            </form> 
            </div>


            
        </div>

    
    </div> 
  );
}

export default SignUp