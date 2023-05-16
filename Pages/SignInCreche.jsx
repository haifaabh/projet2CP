import React, { useState, useEffect } from 'react';
// import logoImg from '../images/logo5.png';

const SignInCreche= () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);


  useEffect(() => {
    setIsSmallScreen(window.innerWidth < 670);
    window.addEventListener("resize", () => setIsSmallScreen(window.innerWidth < 670));
    return () => {
      window.removeEventListener("resize", () => setIsSmallScreen(window.innerWidth < 670));
    }
  }, []);


  

  return (
    
    <div className='flex flex-wrap '>
    

      <div className='items-center w-full md:w-1/3 p-4 bg-[#99BFE4] rounded order-1 md:order-1'>
        <div className="flex items-center">
        {/* <img className='flexh-70 w-40 ml-5 mt-16 h-[90px] w-[90px] hidden md:block' src={logoImg} alt="Logo" /> */}

        </div>
        <div className={`${isSmallScreen ? "text-center " : "text-left mt-[110px]"} mt-2`}>
        <h1 className={`${isSmallScreen ? "text-[36px] mt-0" : "text-[30px]"} text-[#094076]  mt-2 font-bold mb-2 md:mb-2 px-4 md:px-6`}>ESPACE CRECHE</h1>          <p className={`${isSmallScreen ? "text-[12px] mb-0" : "text-[12px] mb-4"} text-[#ffffff] px-4 md:px-6 whitespace-pre-wrap  text-lg font-regular`}>Remplissez dès maintenant la fiche descriptive de votre crèche pour la rendre visible aux parents cherchant des services de garde pour leurs enfants.</p>
        </div>
      </div>

      <div className='w-full p-6 md:w-2/3 h-screen order-2 md:order-2 flex justify-center items-center lg:mt-[20px] mb-4'>
        <div className='flex flex-col text-left items-center justify-center md:w-2/3 lg:w-2/3 mx-auto'>
          <p className='mt-0 mb-4 font-bold text-[30px]  text-[#094076] text-left w-full'>MA CRECHE</p>  
          <form className='w-full'>
            <input className='block w-full border p-8 mb-3 rounded-lg  bg-[#e2e2e2]  text-[#272727] selection:text-[#000000] active:text-[#000000] black-text mt-8 ' type='text' placeholder='Nom de la crèche' />
            <input className='block w-full border p-8 mb-3 rounded-lg  bg-[#e2e2e2]  text-[#272727] selection:text-[#000000] active:text-[#000000] black-text ' type='number' placeholder='Code de la crèche' />

              <p className='mt-5 text-center py-4'>En vous inscrivant, vous acceptez nos Conditions générales et notre Politique de confidentialité .</p> 
              <button className={`bg-[#FBEBAC] text-[#094076] font-bold py-4 w-full rounded-3xl mt-4 mb-4 ${isSmallScreen ? 'sm:text-sm' : 'text-base'}`}>Ajouter la fiche discriptive</button>
              </form> 
            </div>


            
        </div>

    
    </div> 
  );
}

export default SignInCreche