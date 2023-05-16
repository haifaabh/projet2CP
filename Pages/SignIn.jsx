import React, { useState, useEffect } from 'react';
// import logoImg from '../images/rrr.png';
// import jouetImg from '../images/rania.png';

const SignIn = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [selectedAge, setSelectedAge] = useState('');
  const [selecteUnit, setSelectedUnit] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setIsTyping(true);
  };

  const handleInputBlur = () => {
    setIsTyping(false);
  };

  const inputStyle = isTyping ? { color: 'black' } : {};

  useEffect(() => {
    setIsSmallScreen(window.innerWidth < 670);
    window.addEventListener("resize", () => setIsSmallScreen(window.innerWidth < 670));
    return () => {
      window.removeEventListener("resize", () => setIsSmallScreen(window.innerWidth < 670));
    }
  }, []);

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    const [number, unit] = selectedOption.split(" ");
    setSelectedAge(number);
    setSelectedUnit(unit);
  };
  


  

  return (
    
    <div className='flex flex-wrap '>
    

    <div className='items-center w-full md:w-1/3 p-4 bg-[#FBEBAC] rounded order-1 md:order-1'>
    <div className="flex items-center justify-top">
      {/* <img className='flexh-70 w-40 ml-5 mt-12 h-[80px] w-[80px] hidden md:block' src={logoImg} alt="Logo" /> */}
    </div>
    <div className={`${isSmallScreen ? "text-center " : "text-left "} mt-4`}>
      <h1 className={`${isSmallScreen ? "text-[36px] mt-0" : "text-[30px]"} text-[#094076]  mt-8 font-bold mb-2 md:mb-2 px-4 md:px-6`}>ESPACE ENFANT</h1>
      <p className={`${isSmallScreen ? "text-[12px] mb-0" : "text-[12px] mb-4"} text-[#000000] px-4 md:px-6 whitespace-pre-wrap  text-lg font-regular`}>Pour faciliter votre recherche, veuillez indiquer le nom et l'âge de votre enfant.</p>
      {/* <img className='ml-12 mt-[42px] h-[300px] w-[300px]' src={jouetImg} alt='Your Image' /> */}
    </div>
  </div>
  

      <div className='w-full p-6 md:w-2/3 h-screen order-2 md:order-2 flex justify-center items-center lg:mt-[20px] mb-4'>
        <div className='flex flex-col text-left items-center justify-center md:w-2/3 lg:w-2/3 mx-auto'>
          <p className='mt-0 mb-4 font-bold text-[30px]  text-[#094076] text-left w-full'>ENFANT 1</p>  
          <form className='w-full'>
          <input className='block w-full border p-8 mb-3 rounded-lg  bg-[#e2e2e2]  text-[#181818] selection:text-[#000000] active:text-[#000000] black-text ' type='text' placeholder='Nom' />
          <div className='relative'>
  <input className='block w-full border p-8 mb-3 rounded-lg bg-[#e2e2e2] text-[#181818] selection:text-[#000000] active:text-[#000000] black-text' placeholder='Age' />
  <select className='absolute inset-0 block w-full border p-8 rounded-lg bg-[#D9D9D9] appearance-none text-center focus:bg-[#FFB1A6]'>
    <option value="0">- Age -</option>
    <option value="3 mois">3 mois</option>
    <option value="4 mois">4 mois</option>
    <option value="5 mois">5 mois</option>
    <option value="6 mois">6 mois</option>
    <option value="7 mois">7 mois</option>
    <option value="8 mois">8 mois</option>
    <option value="9 mois">9 mois</option>
    <option value="10 mois">10 mois</option>
    <option value="11 mois">11 mois</option>
    <option value="1 an">1 an</option>
    <option value="2 ans">2 ans</option>
    <option value="3 ans">3 ans</option>
    <option value="4 ans">4 ans</option>
    <option value="5 ans">5 ans</option>
    <option value="6 ans">6 ans</option>
  </select>
</div>

            <p className='mt-5 text-center'>En vous inscrivant, vous acceptez nos Conditions générales et notre Politique de confidentialité .</p> 
            <a href="page-A">
            <button className='bg-[#FFB1A6] text-[#094076] font-bold py-2 w-full rounded-3xl mt-4 mb-4'>Ajouter un enfant</button>
          </a>
                      <p className="text-1xl font-bold text-center text-[#131313]">
            <a href="page-A">Annuler</a>
          </p>
            


            </form> 
            </div>


            
        </div>

    
    </div> 
  );
}

export default SignIn