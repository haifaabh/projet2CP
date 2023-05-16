import React, { useState, useEffect } from 'react';
import { BsGeoAlt,BsCalendarCheck ,BsHouseDoor,BsPeople} from "react-icons/bs";
import {AiOutlineStar} from "react-icons/ai";
import {IoSchoolOutline, IoLanguageOutline} from "react-icons/io5";
import {MdOutlineReduceCapacity,MdMiscellaneousServices } from "react-icons/md";
import {FaChild} from "react-icons/fa";
import CloseIcon from '@mui/icons-material/Close';
import { Slide } from '@mui/material';
import RendezVous from '../RendezVous';
import Reservation from '../Reservation';
import Carousel from '../../components/Carousel';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import kids from '../../assets/kidscreche.jpg'

const slides = [
  kids,
  "https://i.ibb.co/yg7BSdM/3.png",
]

const Fiche = ({ open, onClose }) => {
  const [currentSection, setCurrentSection] = useState('content');
  const id = "63f910357b55d68c6d3ef109";
  const [creche, setCreche] = useState({});
  const [ username, setUsername ] = useState([]);
  const [ body, setBody ] = useState([]);
  const [ note, setNote ] = useState([]);
   
  const avis = {
  'username':username,
  'body':body,
  'note':note,
 }
 const handleUsernameChange = (event) => {
  setUsername(event.target.value);
};
const handleReserverClick = () => {
  setCurrentSection('reserver');
};

const handleRendezVousClick = () => {
  setCurrentSection('rendez-vous');
};

const handlePlusdinfoclick = () => {
  setCurrentSection('content');
}

const handleCloseClick = () => {
  onClose();
}

const handleBodyChange = async (event) => {
  setBody(event.target.value);
  const response = await axios.post(`/api/invite/creches/${id}/commenter`, {
    username,
    body: event.target.value,
    note,
  });
};

const handleNoteChange = async (event) => {
  setNote(event.target.value);
  const response = await axios.post(`/api/invite/creches/${id}/commenter`, {
    username,
    body,
    note: event.target.value,
  });
};

  useEffect(() => {
    const fetchCrecheDetails = async () => {
      const response = await axios.get(`/api/invite/creches/${id}`);
      setCreche(response.data);
    };
    fetchCrecheDetails();
  }, [id]);

  if(!open) return null
  return (
      <Slide direction="up" in={open}>
      <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50'>
      <div className=' bg-white rounded-3xl shadow-lg max-w-4xl w-full mx-8 max-h-3/4 overflow-y-auto'>

          {currentSection === 'content' && (
            <>
            <div className='flex justify-center pl-10'>

              <div className='w-1/2 mr-0 order-2 flex justify-end'>
                <Carousel>
                  {slides.map((s) => (
                    <img src={s} />
                  ))}
                </Carousel>
              </div>
              <div className='flex-col order-1 w-1/2 pr-6'>
              <button onClick={handleCloseClick} className='absolute top-1 right-[25vh]'>
                  <CloseIcon sx={{ fontSize: '3rem',color: 'white',fontWeight: 'bold' }} />
                </button>
                <div className='overflow-y-scroll h-[85vh] '>

                <div class="flex items-center">
              <BsGeoAlt/>
              <div class="my-4 ml-4">{creche.nom} </div>  </div>
              <div class="flex items-center">
                <div class="my-4 ml-4">Localisation : {creche.localisation} </div>  </div>
                <div class="flex items-center">
                <div class="my-4 ml-4">Type d'accueil : {creche.type_accueil}</div> </div>
                <div class="flex items-center">
                <BsCalendarCheck/>
                <div class="my-4 ml-4">Jours d’accueil : {creche.jours_accueil.join(', ')} </div>
                 </div>

                 <div class="flex items-center">
                 <div class="my-4 ml-4">horaire : {creche.horaire}</div> </div> 
                <div class="flex items-center">
                <BsHouseDoor/>
                <div class="my-4 ml-4">Type d'établissement  :{creche.type_établissement}</div>
                 </div>
                <div class="flex items-center">
                <IoSchoolOutline/>
                <div class="my-4 ml-4">Pédagogie : {creche.pédagogie}</div>
                </div>
                {/* <div class="my-4">Age d'accueil : {creche.age_accueil}</div> */}
                <div class="flex items-center">
                <IoLanguageOutline/>
                <div class="my-4 ml-8">Langue : {creche.langue.join(', ')}</div></div>
                <div class="flex items-center">
                <div class="my-4">Capacité d'accueil : {creche.capacité_accueil}</div></div>
                <div class="flex items-center">
                <BsPeople/>
                <div class="my-4 ml-4">Disponibilité de places : {creche.disponibilité_places} </div>
                 </div>
                 <div class="flex items-center"> 
                <div class="my-4">Numéro de téléphone : {creche.tél}</div></div>
                <div class="flex items-center">
                <AiOutlineStar/>
                <div class="my-4 ml-4">Note d'évaluation : {creche.note_évaluation}</div>
                 </div>
                {/* <div class="my-4">Commentaires et évaluation : {creche.avis.map((obj) => (
    <div key={obj.username}>
      <span>{obj.username}</span>
      <span>{obj.body}</span>
      <span>{obj.note}</span>
    </div>
  ))}</div> */}
                {/* <div class="my-4">Commentaires et évaluation : {creche.avis}</div> */}
                
                
               
                <div className="block w-full p-8 mb-3 rounded-md bg-gray-300">
                 <div className="p-4">
                   <label>
                     Body:
                     <input type="text" className="bg-gray-300" value={body} onChange={handleBodyChange} />

                   </label>
                   <br />
                   <label>
                     Note:
                     <input type="text" className="bg-gray-300" value={note} onChange={handleNoteChange} />

                   </label>
                   </div>
               </div>    
                </div>                  
                  <div className=' border-top'>
                    <button onClick={handleReserverClick} className=' bg-[#AD98E9] text-white font-semibold px-[30px]  py-1.5 rounded-full border-b border-grey-800 hover:bg-[#FFC9C1] mr-10'>
                      Réserver
                    </button>
                    <button onClick={handleRendezVousClick} className=' bg-[#FFB1A6] text-white font-semibold px-[30px] py-1.5 rounded-full border-b border-grey-800 hover:bg-[#FFC9C1] ml-10'>
                      Rendez-vous
                    </button>
                  </div>
                </div>
                </div>
              </>
            )}

            {currentSection === 'reserver' && (
              <>
               <div className=' h-[560px] justify-center items-center'>

<Reservation onClick={handlePlusdinfoclick} onPlusDinfoclick={handlePlusdinfoclick}
onRendezvousClick={handleRendezVousClick} onAnnulerClick={handleCloseClick} />
</div>
<div className='flex-col order-1 w-1/2 pr-6 '>
<button onClick={handleCloseClick} className='absolute top-1 right-[35vh]'>
                    <CloseIcon sx={{ fontSize: '3rem',color: 'black' }} />
                  </button>
                </div>
              </>
            )}
            {currentSection === 'rendez-vous' && (
              <>
                <div className=' h-[560px] justify-center items-center'>

                    <RendezVous onClick={handlePlusdinfoclick} onPlusDinfoclick={handlePlusdinfoclick} onReserverClick={handleReserverClick} onAnnulerClick={handleCloseClick} />
                  </div>
                <div className='flex-col order-1 w-1/2 pr-6'>
                <button onClick={handleCloseClick} className='absolute top-2 right-[37vh]'>
                    <CloseIcon sx={{ fontSize: '2rem',color: 'black' }} />
                  </button>
                </div>
              </>
            )}
          
        </div>
      </div>
    </Slide>
  );
};

export default Fiche;