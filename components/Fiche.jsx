import React, { useState, useEffect } from 'react';
import { BsGeoAlt,BsCalendarCheck ,BsHouseDoor,BsPeople} from "react-icons/bs";
import {AiOutlineStar} from "react-icons/ai";
import {IoSchoolOutline, IoLanguageOutline} from "react-icons/io5";
import {MdOutlineReduceCapacity,MdMiscellaneousServices } from "react-icons/md";
import {FaChild} from "react-icons/fa";
import CloseIcon from '@mui/icons-material/Close';
import { Slide } from '@mui/material';
import RendezVous from '../page/RendezVous'
import Reservation from '../page/Reservation'
import Carousel from './Carousel';
import axios from 'axios';

const slides = [
  "https://i.ibb.co/yg7BSdM/2.png",
  "https://i.ibb.co/yg7BSdM/3.png",
]

const Fiche = ({ open, onClose , id }) => {
  const [currentSection, setCurrentSection] = useState('content');
  const [creche, setCreche] = useState({});
  const [ body, setBody ] = useState('');
  const [ note, setNote ] = useState('');
  const [loading, setLoading] = useState(true);
  console.log('id ',id);

    useEffect(()=>
    {
      const fetchCrecheDetails = async () => {
      try{
      await axios.get(`/api/invite/creches/${id}`)
           .then((response)=>
           {
            setCreche(response.data);
            console.log(response.status);
            setLoading(false);
      });
    }catch (error) {
        console.error(error);
        setLoading(false);
        return null;
    };
  }
  if (id) {
    fetchCrecheDetails();
  }
    },[id]);
    

 const handleSubmit = async (event ) => {
  event.preventDefault();
  try{const response = await axios.post(`/api/parent/creches/${id}/commenter`, { body : body,note:note }, { withCredentials: true });
    console.log(response.data);
  }catch (error) {
    console.error(error);
    return null;
}
};

const handleBodyChange = (event) => {
  setBody(event.target.value);
};

const handleNoteChange = (event) => {
  setNote(event.target.value);
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


  if(!open) return null
  return (

<>
    {!loading  && (
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
                  <div className='overflow-y-scroll h-96 text-[#094076]'>
                  <div class="my-8 font-semibold text-[22px] ">{creche.nom}</div>
                  <div class="flex items-center ">
                <BsGeoAlt/>
                <div class="my-4 ml-4">Localisation : {creche.localisation}</div>
                 </div>
              
                <div class="flex items-center">
                <BsCalendarCheck/>
                <div class="my-4 ml-4">Jours d’accueil : {creche.jours_accueil.join(', ')}</div>
                </div>   
                 <div class="flex items-center">
                <BsCalendarCheck/>
                <div class="my-4 ml-4">Horaire : {creche.horaire}</div>
                 </div>

                 <div  class="flex items-center">
                 <FaChild/>
                  <div class="my-4 ml-4"> Age d'Acceuil : {creche.age_accueil.ageMin} {creche.age_accueil.uniteMin} - {creche.age_accueil.ageMax} {creche.age_accueil.uniteMax}</div> 
                  </div>   

                 <div class="flex items-center">
                <BsHouseDoor/>
                <div class="my-4 ml-4">Type d’établissement : {creche.type_établissement}</div>
                 </div>

                 <div class="flex items-center">
                <IoSchoolOutline/>
                <div class="my-4 ml-4">Pédagogie : {creche.pédagogie}</div>
                 </div>

                 
                 <div class="flex items-center">
                <IoLanguageOutline/>
                 <div class="my-4 ml-8">Langue : {creche.langue.join(', ')}</div>
                </div>
                <div class="flex items-center">
               <MdOutlineReduceCapacity/>
               <div class="my-4 ml-4">Capacité d’accueil : {creche.capacité_accueil}</div>
                </div>


                <div class="flex items-center">
                <BsPeople/>
                <div class="my-4 ml-4"> Disponibilité de places : {creche.disponibilité_places}</div>
                 </div>
               
                
               <div  class="flex items-center">
               <MdMiscellaneousServices/>
               <div class="my-4 ml-4">Numéro de téléphone : {creche.tél}</div>
                </div> 

               
                <div class="flex items-center">
                <AiOutlineStar/>
                <div class="my-4 ml-4">Note d'évaluation : {creche.note_évaluation}</div>
                 </div>
                 
                <form onSubmit={handleSubmit}>
                 <div className="w-[65vh] mt-5 mb-10 border rounded-2xl px-2 py-2 ">
                 <div className="">
                   <label>
                     Ajouter un commentaire
                     <br></br>
                     <input type="text" className="bg-gray-300 rounded-2xl px-[10vh] py-4 mb-4" placeholder='Partagez votre expérience' value={body} onChange={handleBodyChange} />

                   </label>
                   <br />
                   <label className=''>
                     Ajouter une note:
                     <br></br>
                     <select name="Note: " id="note" value={note} onChange={handleNoteChange} className="bg-gray-300 rounded-2xl p-2 outline-none px-[23vh]  focus:bg-blue-300 hover:bg-blue-300 py-4 mb-6">
  <option value="1/5">1/5</option>
  <option value="2/5">2/5</option>
  <option value="3/5">3/5</option>
  <option value="4/5">4/5</option>
  <option value="5/5">5/5</option>
</select>

                   </label>
                 </div>
                 <div className=" ml-[70%]">
  <button type="submit" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ">
  Envoyer
</button>
</div>
               </div> 
               </form>                 
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
onRendezvousClick={handleRendezVousClick} onAnnulerClick={handleCloseClick} id={id} />
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

                    <RendezVous onClick={handlePlusdinfoclick} onPlusDinfoclick={handlePlusdinfoclick} onReserverClick={handleReserverClick} onAnnulerClick={handleCloseClick} id={id} />
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
    )}
    </>
  );
};

export default Fiche;