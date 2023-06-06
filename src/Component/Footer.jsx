import React from 'react'
import logo from './logo.png'
import EsiLogo from '../assets/EsiLogo.png'
import facebook from '../assets/facebook.png'
import youtube from '../assets/youtube.png'
import linkedin from '../assets/linkedin.png'
import instagram from '../assets/instagram.png'
import { useEffect,useState } from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    setIsSmallScreen(window.innerWidth < 670);
    window.addEventListener("resize", () => setIsSmallScreen(window.innerWidth < 670));

    return () => {
      window.removeEventListener("resize", () => setIsSmallScreen(window.innerWidth < 670));
    };
  }, []);

  return (
<div className={`${isSmallScreen ? "flex flex-col" : ""} flex-grow flex flex-col justify-end`}>
  <div className='h-[350px] w-screen bg-[#094076] relative '>
    <img src={logo} alt="Logo" className='absolute left-8 top-2 w-[12vh] h-[17vh]' />
    <img src={EsiLogo} alt="Logo ESI" className='absolute right-3 top-2 w-[15vh] h-[15vh]' />
    <div className='w-full flex justify-center items-center px-4  py-[5%] '>
      <ul className={`${isSmallScreen ? "flex flex-col mt-4 space-y-[2vh]" : " space-x-[10vh]  mt-[15vh]"} flex justify-center items-center text-gray-400 font-medium font-[Montserrat] text-[1rem]`}>
      <li>
        <Link to="/accueil#section1">Accueil</Link>
          </li>
        <li>
              <Link to="/ResponsableDeCreche">Responsable de crèche</Link>
        </li>
        <li>
              <Link to="/filtres4">Filtrage</Link>
        </li>
        <li>
        <Link to="/Accueil#section3">Qui Sommes-nous</Link>
          </li>
        <li>
              <Link to="/aide">Aide</Link>
        </li>
      </ul>     
    </div>
   
    <div className='  space-x-[2vh] flex flex-row justify-center items-center px-4 text-center mt-[8vh]'>
    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
  <img src={linkedin} alt="LinkedIn" className="rounded-full w-10 h-10 mb-2" />
</a>
<a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
  <img src={instagram} alt="Instagram" className="rounded-full w-10 h-10 mb-2" />
</a>
<a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
  <img src={facebook} alt="Facebook" className="rounded-full w-10 h-10 mb-2" />
</a>
<a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
  <img src={youtube} alt="YouTube" className="rounded-full w-10 h-10 mb-2" />
</a>
    </div>
  </div>
</div>

  )
}

export default Footer