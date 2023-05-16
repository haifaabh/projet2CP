import React from 'react'
import logo from '../assets/logo.png'
import EsiLogo from '../assets/EsiLogo.png'
const Footer = () => {
  return (
<div className='flex-grow flex flex-col justify-end'>
  <div className='h-[350px] w-screen bg-[#094076] relative'>
    <img src={logo} alt="Logo" className='absolute left-8 top-2' />
    <img src={EsiLogo} alt="Logo ESI" className='absolute right-3 top-2' />
    <div className='w-full flex justify-center items-center px-4 text-center py-6 '>
      <ul className=' flex justify-center items-center space-x-[50px] text-gray-400 font-medium font-[Montserrat] text-lg mt-[15vh]'>
        <li>Accueil</li>
        <li>Consultation</li>
        <li>Filtrage</li>
        <li>Qui Sommmes-nous</li>
        <li>Aide</li>
      </ul>     
    </div>
    {/* <div className=' border-t-2 border-gray-400 w-[30vh] left-[50vh]'></div> */}
   
    <div className='w-1/4 flex flex-col justify-center items-center px-4 text-center'>
      {/* <img src={linkedin} alt="LinkedIn" className='rounded-full w-10 h-10 mb-2' />
      <img src={instagram} alt="Instagram" className='rounded-full w-10 h-10 mb-2' />
      <img src={facebook} alt="Facebook" className='rounded-full w-10 h-10 mb-2' />
      <img src={youtube} alt="YouTube" className='rounded-full w-10 h-10 mb-2' /> */}
    </div>
  </div>
</div>

  )
}

export default Footer