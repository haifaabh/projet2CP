import React, { useState, useEffect } from 'react';    //import des différenttes icones, images et component utilisés
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
import SearchIcon from '@mui/icons-material/Search';
//import acc3 from '../assets/acc3.png'
import p3 from '../images/p3.png';
import rania from '../images/rania (1).png';
import mockup  from '../assets/mockup.png'
import arrowup from '../assets/arrowup.png'


const Accueil = () => {
  
  const [localisation, setLocalisation] = useState('');
  const [creches, setCreches] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
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

  useEffect(() => {
    setIsSmallScreen(window.innerWidth < 670);
    window.addEventListener('resize', () => setIsSmallScreen(window.innerWidth < 670));
  }, []);


  return (
    <div>
    <Navbar />
    <div className="absolute top-[130px] left-0 mr-0 "> 
    <section id="section1" className=" h-[80vh] flex flex-col justify-start top-[150px] items-start">
<div className="relative flex flex-col  items-start justify-start left-9 ml-8">

  <h1 className="text-black  font-bold text-[35px] top-[250px] text-center sm:text-left">
    Trouvez la crèche idéale
    <br />
    pour votre enfant selon
    <br />
    vos critères.
  </h1>
  <h2 className="text-[#094076] font-bold text-[23px] mt-4 text-center sm:text-left">
    Simplifiez votre recherche de
    <br />
    crèche dès maintenant !
  </h2>
</div>

<div className={`${isSmallScreen ? "w-[68vh] h-[120px] top-[48vh] left-[10vh]" : "left-[75px] w-[90vh] top-[290px]"} absolute search-input`}>
  <div className="rounded-full bg-[#D9D9D9] p-4 flex items-center justify-start relative">
    <span className="icon-rech">
      <SearchIcon className="text-black" style={{ marginTop: "-100px" }} />
    </span>
    <input
      type="text"
      placeholder="Recherchez un lieu Ex: Ouled Fayet"
      value={localisation}
      onChange={handleLocalisationChange}
      className="bg-transparent outline-none w-full pl-6"
    />
  </div>
</div>

<img src={rania} alt="" className={`${isSmallScreen ? "hidden" : "absolute w-[400px] h-[400px] top-[20px] left-[800px]"}`}/>
<img src={p3} alt=""  className={`${isSmallScreen ? "ml-[65vh] mt-[-9vh] z-10" : "absolute "}  w-[120px] h-[120px] top-[190px] left-[530px]`} onClick={handleSearch} />




  <div  className={`${isSmallScreen ? "mt-[5vh] " : "mt-[11%]"} relative flex flex-row `} onClick={handleSearch}>
  <div className={`${isSmallScreen ? "mt-[vh] ml-[10vh]" : "  left-[13vh] "} absolute`} onClick={handleSearch}>
 <button className={`${isSmallScreen ? "w-[30vh] h-[50px]" : " w-[210px] h-[50px]  "} bg-[#f7b1a8] rounded-[40px] hover:bg-[#f5988b] text-black border-none text-[4vh] font-[Montserrat] font-bold  mr-[24vh]`} onClick={handleSearch}>

Consulter
</button>
</div>


  <button className={`${isSmallScreen ? "w-[30vh] h-[50px]  ml-[50vh] " : " w-[210px] h-[50px] ml-[66vh] "} bg-[#99BFE4] hover:bg-[#57a3fb] rounded-[40px] text-black border-none text-[4vh] font-[Montserrat] font-bold`} onClick={handleSearch} >
    Filtrer
  </button>
</div>
</section>

<section id="section2" className={`${isSmallScreen ? "h-[80vh] justify-center items-center flex flex-col pb-[50vh]" : "h-[95vh] pb-10"} flex mt-[50vh]`}>

      <div className={`${isSmallScreen ? "hidden" : "w-1/2 flex justify-center items-center"} `}>
        {!isSmallScreen && (
          <img className="h-[700px] w-[650px]" src={RoundBlue} alt="SouriantBleu" />
        )}
      </div>
      <div className="flex flex-col justify-center items-center w-1/2 px-5">
        <div className="bg-[#FFB1A6] h-[150px] w-[280px] rounded-3xl mb-4 flex relative">
          <img
            src={Consultation}
            alt="Consultation image"
            className={`absolute top-4 left-3 h-[75px] w-[72px]`}
          />
          <div className="flex flex-col ml-[110px] mt-4">
            <h2 className="text-xl font-bold mt-0 mb-2 text-white">Consultation</h2>
            <p className="text-[13px] text-white">
              KiddyCreche vous permet de consulter toutes les crèches à proximité du lieu de votre choix
            </p>
          </div>
        </div>
        <div className="bg-[#AD98E9] h-[160px] w-[280px] rounded-3xl mb-4 flex relative">
          <img
            src={Filtrage}
            alt="Filtrage image"
          className={`absolute top-4 left-3 h-[75px] w-[72px]`}
          />
          <div className="flex flex-col ml-[110px] mt-4">
            <h2 className="text-xl font-bold mt-0 mb-2 text-white">Filtrage</h2>
            <p className="text-[13px] text-white">
              Grâce à KiddyCreche, vous avez la possibilité de filtrer vos recherches et l'adapter à vos besoins
            </p>
          </div>
        </div>
        <div className="bg-[#99BFE4] h-[160px] w-[280px] rounded-3xl mb-4 flex relative">
          <img
            src={Responsable}
            alt="Responsable image"
            className={`absolute top-4 left-3 h-[75px] w-[72px]`}
          />
          <div className="flex flex-col ml-[110px] mt-4">
            <h2 className="text-xl font-bold mt-0 mb-2 text-white">Responsable</h2>
            <p className="text-[13px] text-white">
              Vous êtes propriétaire d'une crèche et désirez mieux faire connaître vos services? KiddyCreche est la solution
            </p>
          </div>
        </div>
      </div>
    </section>




    <section id="section3" className={`${isSmallScreen ? "w-[88vh]" : ""} h-[95vh] flex flex-col justify-center items-center my-20`}>
      <div className='relative '>
      <img  className={`${isSmallScreen ? " w-full h-[125vh]" : "w-[150vh] h-[140vh]"} mt-4 `} src={PinkBulle} alt='Bulle rose' />
      <div className={`${isSmallScreen ? "left-[8vh] top-[170px]" : "left-[25vh] top-[220px]"} absolute   font-regular`}>
      {isSmallScreen ? (
        <p>
          <br></br>
          Nous sommes une petite équipe de six <br></br>membres, toutes étudiantes dans une école nationale<br></br> supérieure
          d'informatique.<br />
          Motivées et engagées à faciliter la recherche <br></br> de crèches aux parents algériens, nous avons toutes <br></br>
          allié et uni nos compétences allant du design à la <br></br> conception graphique ainsi que la programmation,
          <br></br>en passant par la gestion de projet. Nous sommes une <br></br> équipe soudée et avons toujours suivi trois
          valeurs que <br></br>nous avons choisi pour notre application web: Fun,<br></br> minimalisme et professionalisme.
          Nous sommes<br></br> toutefois ravis et impatients de vous aider à trouver <br></br>la crèche idéale selon vos critères.
        </p>
      ) : (
        <p>
        Nous sommes une petite équipe de 6 membres, toutes étudiantes <br/>dans une 
          école nationale supérieure
          d'informatique.<br/>
          Motivées et engagées à faciliter la recherche de crèches aux parents <br/>algériens,
          nous avons toutes allié et uni nos compétences allant du <br/>design à la conception graphique ainsi 
          que la programmation, <br/>en passant par la gestion de projet. Nous sommes une équipe
          soudée <br/>et avons toujours suivi trois valeurs que nous avons choisi pour <br/>notre application
          web: Fun, minimalisme et professionalisme. <br/>Nous sommes toutefois ravis et impatients de vous 
          aider à trouver <br/>la crèche idéale selon vos critères 
        </p>
      )}
    </div>
      <div className='absolute top-[10vh] right-2 '>
        <img src={WhoweAre} alt='qui sommes nous' className={`${isSmallScreen ? "mr-[12vh] h-[30vh] w-[30vh]" : "h-[190px] w-[190px] "} `}   />
      </div>
      </div>
      
    </section>

    <section id="section4" className="w-full h-screen flex flex-row justify-center items-center mt-[15vh]">
     <div className='w-full h-[300px] bg-[#AD98E9] rounded-2xl relative'>
      <ul className={`${isSmallScreen ? "" : " space-x-[52vh]"} flex justify-center items-center mt-[10vh] text-white text font-semibold text-[1.25rem] `}>
        <li className={`${isSmallScreen ? "hidden" : ""} `}>Notre team</li>
        <li className={`${isSmallScreen ? "text-[2rem] mt-5" : ""} `}>Nos crèches</li>
        <li className={`${isSmallScreen ? "hidden" : ""} `}>Nos fonctionnalités</li>
      </ul>
      <ul className={`${isSmallScreen ? "" : "space-x-[50vh]"} flex justify-center items-center  text-white text font-semibold text-[5rem]`}>
        <li className={`${isSmallScreen ? "hidden" : ""} `}>06</li>
        <li>+20</li>
        <li className={`${isSmallScreen ? "hidden" : ""} `}>+25</li>
      </ul>
     <img className=' absolute top-[-100px] left-5 h-[200px] w-[150px]' src={PinkShape} alt='/' /> 
     <img className='absolute top-[-50px] right-[2vh] h-[70px] w-[40vh] rotate-12' src={BlueShape} alt='Forme bleue' />
     </div>
    </section>

    <section id="section5" className="h-screen relative">
    <div  className={`${isSmallScreen ? "w-[99%] h-[92%]" : "right-[80px] w-[95vh] h-[95vh] flex flex-col"} absolute   justify-center items-center rounded-full bg-[#FFB1A6]  top-[50px]`} >
      <img  className={`${isSmallScreen ? "hidden" : "h-[60vh] w-[60vh]"} `} src={mockup} alt="LinkedIn Kiddy" />
    </div>
    <div className='absolute w-1/2'>
      <div className='absolute w-[350px] flex flex-col justify-center items-center text-center left-[80px] top-[200px]'>
      <p>Vous êtes parent à la recherche d’une crèche ou un responsable souhaitant inscrire votre crèche parmi nous ?
         Connectez-vous dès maintenant et débloquez l’accès à de nombreuses fonctionnalités</p>
      <img className='mt-4' src={PurpleShape} alt='Forme violette'></img>
      <RouterLink to="/Login">
      <button className='bg-[#FFB1A6] rounded-3xl w-[150px] h-10 font-bold text-white mt-0 hover:bg-[#d8897f] border-white'>Inscrivez-vous</button>
      </RouterLink>
      </div>
    </div>
    
    </section>

    <section id="section6" className="h-screen flex flex-row justify-center items-center">
    <div className='h-[300px] bg-[#FDD313] rounded-2xl flex justify-between items-center'>
      <div className={`${isSmallScreen ? "hidden" : "w-1/4 flex flex-col justify-center items-center px-4 ml-4 text-center"} `}>
        <h1 className=' text-[#094076] font-bold text-2xl '>Guide en Ligne</h1>
        <p className='mt-4'>Vous vous sentez perdu ou ne savez pas par ou commencer ? Suivez notre didacticiel en ligne et facilitez-vous la tâche</p>
      </div>
      <div className='rounded-2xl overflow-hidden mr-10 ml-10'>
        <Youtube  videoId="Ki6XnW6JG14" opts={opts}  />
      </div>
    </div>
    </section>

<div className=' flex justify-items justify-end mr-[2%] mt-[10%] mb-[5%]'>
<button className='w-[5vh] h-[5vh]' onClick={() => smoothScroll('section1')}>
  <img  src={arrowup} alt="/" />
</button>
</div>

    <section id="section7" className=" flex flex-row justify-end"> 
      <Footer />
    </section>
  </div>
  </div>
  )
}

export default Accueil
