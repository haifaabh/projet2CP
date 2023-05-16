import React, { useState } from 'react';
import { Link as Link } from 'react-scroll';
import Button from '@mui/material/Button';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {Link as RouterLink} from 'react-router-dom'
import RoundBlue from '../assets/RoundBlue.png'
import Consultation from '../assets/Consultation.png'
import Filtrage from '../assets/Filtrage.png'
import Responsable from '../assets/Responsable.png'
import PinkBulle from '../assets/PinkBulle.png'
import WhoweAre from '../assets/WhoweAre.png'
import PinkShape from '../assets/PinkShape.png'
import BlueShape from '../assets/BlueShape.png'
import PurpleShape from '../assets/PurpleShape.png'
import Footer from '../components/Footer';
import Youtube from 'react-youtube';
import Navbar from './NavBar';
import acc1 from '../assets/acc1.png'
import acc2 from '../assets/acc2.png'
import Recherche from './Recherche';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

//import acc3 from '../assets/acc3.png'

const Accueil = () => {
  const [localisation, setLocalisation] = useState('');
  const [creches, setCreches] = useState([]);

  const smoothScroll = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const opts = {
    height: '215',
    width: '404',
    playerVars: {
     
      autoplay: 1,
    },
  };

  const navigate = useNavigate();

  const handleLocalisationChange = (event) => {
    setLocalisation(event.target.value);
  };

  const handleSearch = async () => {
    try {
    axios.post('/api/invite/rechercher-lieu', { localisation }).then((data)=>{
      setCreches(data.data);
      navigate("/Navigation",{state:{creches:data.data}});
      }
        
        );
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div>
      <Navbar />
      <section id="section1" className="h-[95vh] flex flex-col justify-start items-start ">
      <div className=" flex flex-col justify-start items-start">
      <Recherche
        localisation={localisation}
        handleLocalisationChange={handleLocalisationChange}
        creches={creches}
        handleSearch={handleSearch}
      /> 
      </div>
  <div className="relative flex flex-col items-start justify-start left-9 ml-8">

    <h1 className="text-black font-[Montserrat] font-bold text-[35px] text-center sm:text-left">
      Trouvez la crèche idéale
      <br />
      pour votre enfant selon
      <br />
      vos critères.
    </h1>
    <h2 className="text-[#094076] font-bold font-[Montserrat] text-[15px] mt-4 text-center sm:text-left">
      Simplifiez votre recherche de
      <br />
      crèche dès maintenant !
    </h2>
  </div>
  <img src={acc1} alt="" className ='absolute w-[240px] h-[240px] top-[90px] left-[888px]'/>
  {/* <img src={acc3} alt="" className ='absolute w-[150px] h-[150px] top-[390px] left-[999px]'/> */}
  <img src={acc2} alt="" className ='absolute w-[120px] h-[120px] top-[290px] left-[45%]'/>    

  
    <div className=" relative flex flex-row mt-[8%] ">
      <button className="bg-[#f7b1a8] rounded-[40px] hover:bg-[#f5988b] text-black border-none w-[210px] h-[50px] font-[Montserrat] font-bold text-[21px] mr-[12vh]" onClick={handleSearch}>
        Consulter
      </button>
 

    <button className="bg-[#99BFE4] rounded-[40px] hover:bg-[#57a3fb] border-none text-black ml-4 w-[210px] h-[50px] font-[Montserrat] font-bold text-[21px]">
      Filtrer
    </button>
  </div>
</section>



    <section id="section2" className="h-[95vh] flex flex-row my-20">
  <div className="w-1/2 flex justify-center items-center ">
    <img className="h-[700px] w-[650px]" src={RoundBlue} alt="SouriantBleu" />
  </div>
  <div className="flex flex-col justify-center items-center w-1/2 px-4">
    <div className="bg-[#FFB1A6] h-[150px] w-[280px] rounded-3xl mb-4 flex relative">
      <img src={Consultation} alt="Consultation image" class="absolute top-4 left-3 h-[75px] w-[72px]" />
      <div className="flex flex-col ml-[110px] mt-4">
        <h2 className="text-xl font-bold mt-0 mb-2 text-white">Consultation</h2>
        <p className="text-[13px] text-white">KiddyCreche vous permet de consulter toutes les crèches a proximité du lieu de votre choix</p>
      </div>
    </div>
    <div className="bg-[#AD98E9] h-[150px] w-[280px] rounded-3xl mb-4 flex relative">
      <img src={Filtrage} alt="Filtrage image" class="absolute top-4 left-3 h-[75px] w-[72px]" />
      <div className="flex flex-col ml-[110px] mt-4">
        <h2 className="text-xl font-bold mt-0 mb-2 text-white">Filtrage</h2>
        <p className="text-[13px] text-white">Trouvez gratuitement une 
agence ou un freelance 
disponible pour réaliser tous 
vos projets.</p>
      </div>
    </div>
    <div class="bg-[#99BFE4] h-[150px] w-[280px] rounded-3xl mb-4 flex relative">
      <img src={Responsable} alt="Responsable image" class="absolute top-4 left-3 h-[75px] w-[72px]" />
      <div class="flex flex-col ml-[110px] mt-4">
        <h2 class="text-xl font-bold mt-0 mb-2 text-white">Filtrage</h2>
        <p class="text-[13px] text-white">Trouvez gratuitement une agence ou un freelance disponible pour réaliser tous vos projets.</p>
      </div>
    </div>
  </div>
</section>




    <section id="section3" className=" h-[95vh] flex flex-col justify-center items-center my-20">
      <div className='relative'>
      <img className='w-[800px] h-[700px] mt-4 font-medium' src={PinkBulle} alt='Bulle rose' />
      <div class='absolute top-[270px] left-[150px] '>
        <p>Nous sommes une petite équipe de 6 membres,toutes étudiantes dans une 
          école nationale supérieure
          d'informatique. Motivées et engagées à faciliter la recherche de crèches aux parents algériens,
          nous avons toutes allié et uni nos compétences allant du design à la conception graphique ainsi 
          que la programmation, en passant par la gestion de projet. Nous sommes une équipe
          soudée et avons toujours suivi trois valeurs que nous avons choisi pour notre application
          web: Fun, minimalisme et professionalisme. Nous sommes toutefois ravis et impatients de vous 
          aider à trouver la crèche idéale selon vos critères 
        </p>
      </div>
      <div className='absolute top-[60px] right-0'>
        <img src={WhoweAre} alt='qui sommes nous' className='h-[190px] w-[190px]' />
      </div>
      </div>
      
    </section>

    <section id="section4" className="h-screen flex flex-row justify-center items-center ">
     <div className=' w-screen h-[300px] bg-[#AD98E9] rounded-2xl relative'>
      <ul className='flex justify-center items-center space-x-[52vh] mt-[10vh] text-white text font-semibold text-lg'>
        <li>Notre team</li>
        <li>Nos crèches</li>
        <li>Nos fonctionnalités</li>
      </ul>
      <ul className='flex justify-center items-center space-x-[50vh] text-white text font-semibold text-[5rem]'>
        <li>06</li>
        <li>+20</li>
        <li>+25</li>
      </ul>
     <img className=' absolute top-[-100px] left-5 h-[200px] w-[150px]' src={PinkShape} alt='/' /> 
     <img className='absolute top-[-50px] right-[-10px] h-[70px] w-[175px] rotate-12' src={BlueShape} alt='Forme bleue' />
     </div>
    </section>

    <section id="section5" className="h-screen relative">
    <div className='absolute w-[500px] h-[500px] rounded-full bg-[#FFB1A6] right-[80px] top-[50px]'></div>
    <div className='absolute w-1/2'>
      <div className='absolute w-[350px] flex flex-col justify-center items-center text-center left-[80px] top-[200px]'>
      <p>Vous êtes parent à la recherche d’une crèche ou un responsable souhaitant inscrire votre crèche parmi nous ?
         Connectez-vous dès maintenant et débloquez l’accès à de nombreuses fonctionnalités</p>
      <img className='mt-4' src={PurpleShape} alt='Forme violette'></img>
      <RouterLink to="/SignUp">
      <button className='bg-[#FFB1A6] rounded-3xl w-[150px] h-10 font-bold text-white mt-0'>Inscrivez-vous</button>
      </RouterLink>
      </div>
    </div>
    
    </section>

    <section id="section6" className="h-screen flex flex-row justify-center items-center">
    <div className='h-[300px] w-screen bg-[#FDD313] rounded-2xl flex justify-between items-center'>
      <div className=' w-1/4 flex flex-col justify-center items-center px-4 ml-4 text-center'>
        <h1 className=' text-[#094076] font-bold text-2xl '>Guide en Ligne</h1>
        <p className='mt-4'>Vous vous sentez perdu ou ne savez pas par ou commencer ? Suivez notre didacticiel en ligne et facilitez-vous la tâche</p>
      </div>
      <div className='rounded-2xl overflow-hidden mr-10'>
        <Youtube  videoId="Ki6XnW6JG14" opts={opts}  />
      </div>
    </div>
    </section>

    <Button variant="contained" color="primary" endIcon={<KeyboardArrowUpIcon />} onClick={() => smoothScroll('section1')} />

    <section id="section7" className="h-screen flex flex-row justify-end">
      <Footer />
    </section>
  </div>
  
  )
}

export default Accueil