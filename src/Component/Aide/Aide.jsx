import React from 'react'
import Bouton from './Bouton'
import Bouton2 from './Bouton2'
import Bouton3 from './Bouton3'
import Bouton4 from './Bouton4'
import logo from '../logo.png'


const Aide = () => {
  return (
    <div>
       <h className='absolute text-[22px] text-black font-Montserrat font-extrabold top-[140px] left-[180px]'>Notre équipe est à votre disposition pour vous aider</h>
       <br/>
       <h className='relative text-[22px] text-black font-Montserrat font-extrabold top-[160px] left-[180px]'>et répondre à toutes vos questions.</h> 
       <Bouton/>
       <Bouton2/>
       <Bouton3/>
       <Bouton4/>
       <img src={logo} alt="" className='w-[68px] h-[120px] absolute top-[15px] left-[14px]' />

    </div>
  );
}

export default Aide