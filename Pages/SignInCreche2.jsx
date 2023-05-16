

import React, { useState, useEffect } from 'react';
// import logoImg from '../images/logo5.png';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

const Days = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi"
]
const Langues = [
  "Arabe",
  "Francais",
  "Anglais",
  "Espagnol",
  "Kabyle",
]

const SignInCreche2= () => {
  const [ days, setDays ] = useState([]);
  const [ langues, setLangues ] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [ username, setUsername ] = useState([]);
  const [ accueil, setAccueil ] = useState([]);
  const [ body, setBody ] = useState([]);
  const [ note, setNote ] = useState([]);
  const [disponibilite, setDisponibilite] = useState(""); 
  const [NomCreche, setNomCreche] = useState(""); 
  const [Code, setCode] = useState(""); 
  const [Etab, setEtab] = useState("");
  const [ageMin, setAgeMin] = useState("");
  const [ageMax, setAgeMax] = useState("");
  const [capacite, setCapacite] = useState("");
  const [uniteMin, setuniteMin] = useState("");
  const [uniteMax, setuniteMax] = useState("");
  const [pedagogie, setPedagogie] = useState("");
  const [Localisation, setLocalisation] = useState("");

  
  const SelectDays = ( day ) =>{
    let test = days;
    if ( test.includes( day ) ){
      test = [];
      days.forEach((elt,index)=>{
        if ( elt != day ){
          test.push(elt)
        }
      })
    } else {
      test.push(day)
    }
    setDays(test);
  }
  console.log(days);
  const SelectLangues = ( langue ) =>{
    let test = langues;
    if ( test.includes( langue ) ){
      test = [];
      langues.forEach((elt,index)=>{
        if ( elt != langue ){
          test.push(elt)
        }
      })
    } else {
      test.push(langue)
    }
    setLangues(test);
  }
console.log(langues)
    const crecheData = 
    {
      nom: NomCreche,
      localisation: Localisation,
      type_accueil: accueil,
       jours_accueil: days,
      type_établissement: "Public",
      age_accueil: { "ageMin": ageMin, "ageMax": ageMax },
      pédagogie: "Montessori",
      langue: langues,
      capacite_acceuil:capacite,
      disponibilite_places: disponibilite,
      code:Code
  };
  const handleValiderClick =() => {
    const pedagogy = document.getElementById("pedagogie");
    console.log(pedagogy.value);
  }
  const handleAgeMinChange = (e) => {
    const enteredAge =parseInt(e.target.value);
  };

  const handleAgeMaxChange = (e) => {
    const enteredAge = parseInt(e.target.value);
  
  };
 
   const handleSubmit=async (event) =>{
    event.preventDefault();
    // console.log(crecheData);
    try {
      const response = await axios.post('/api/auth/inscrire_proprietaire', {nom:crecheData.nom,localisation:crecheData.localisation, gps:crecheData.gps,type_accueil : crecheData.type_accueil,jours_accueil:crecheData.jours_accueil,type_établissement:crecheData.type_établissement,age_accueil:crecheData.age_accueil,uniteMin,uniteMax,note_évaluation:crecheData.note_évaluation,pédagogie:crecheData.pédagogie,langue:crecheData.langue,capacité_accueil:crecheData.capacité_acceuil,disponibilité_places:crecheData.disponibilité_places,tél:crecheData.tél,avis:crecheData.avis,horaire:crecheData.horaire,img:crecheData.img,code:crecheData.code});
      console.log(response.data);
    console.log(typeof ageMax);
    console.log(typeof ageMin);
    }
   
    catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        console.log(error.response.data.msg);
      } else if (error.response.status === 401) {
        console.log(error.response.data.msg);
      }
    }
  }

useEffect(() => {
  setIsSmallScreen(window.innerWidth < 670);
  window.addEventListener("resize", () => setIsSmallScreen(window.innerWidth < 670));
}, []);

  return (
    <div className='flex flex-wrap '>
      <div className='items-center w-full h-[1200px] md:w-1/3 p-4 bg-[#99BFE4] rounded order-1 md:order-1'>
        <div className="flex items-center justify-center md:justify-start">
          {/* <img className='h-[90px] w-[110px] ml-5 mt-4 hidden md:block mt-4' src={logoImg} alt="Logo" /> */}
        </div>
        <div className={`${isSmallScreen ? "text-center" : "text-left"} mt-2 md:mt-[100px]`}>
        <h1 className={`${isSmallScreen ? "text-[36px] mt-0" : "text-[30px]"} text-[#094076]  mt-2 font-bold mb-2 md:mb-2 px-4 md:px-6`}>FICHE DESCRIPTIVE</h1>    
           <p className={`${isSmallScreen ? "text-[12px] mb-0" : "text-[12px] mb-4"} text-[#ffffff] px-4 md:px-6 whitespace-pre-wrap  text-lg font-regular`}>Remplissez dès maintenant la fiche descriptive de votre crèche pour la rendre visible aux parents cherchant des services de garde pour leurs enfants.</p>
        </div>
      </div>

      <div className='w-full p-6 md:w-2/3 md:h-screen order-2 md:order-2 flex justify-left items-center  lg:mt-[20px] mb-4'>
        <div className='flex flex-col text-left items-center justify-left md:w-2/3 lg:w-2/3 mx-auto mt-40'>
        <div className="flex flex-col text-left w-[700px]  bg-white rounded-xl p-8 space-y-2 shadow-xl">
        <p className="text-1xl  text-[#094076] border-b-2 border-gray-300 pb-4"></p>
        <form className='w-full' > 
        {/* onSubmit={handleSubmit} */}
        <p className="text-1xl  border-b-2 border-gray-300 pb-2">
            <a className="font-semibold">Nom Crèche : </a>
              <input className="black-text border-transparent focus:outline-none focus:ring-0 font-regular" type="text" value={NomCreche}  onChange={(e) => setNomCreche(e.target.value)} ></input>
            </p>
            <p className="text-1xl  border-b-2 border-gray-300 pb-2">
            <a className="font-semibold">Localisation : </a>
              <input className="black-text border-transparent focus:outline-none focus:ring-0 font-regular" type="text" value={Localisation}  onChange={(e) => setLocalisation(e.target.value)} ></input>
            </p>
            <p className="text-1xl  border-b-2 border-gray-300 pb-2">
            <a className="font-semibold">Code Crèche : </a>
              <input className="black-text border-transparent focus:outline-none focus:ring-0 font-regular"  type="text" value={Code}  onChange={(e) => setCode(e.target.value)}  />
             
            </p>
            <p className="text-1xl  border-b-2 border-gray-300 pb-2">
            <a className="font-semibold">Type d’accueil : </a>
              <input className="black-text border-transparent focus:outline-none focus:ring-0 font-regular"  type="text" value={accueil} onChange={(e) => setAccueil(e.target.value)}  />
            </p>
            <p className="text-1xl  border-b-2 pb-2 mb-4">
            <a className="font-semibold">Jours d’accueil : </a>
            <div className=' flex flex-wrap gap-2'>
              {
                Days.map((elt,index)=>{
                  return(
                    <div key={index} className=' flex flex-wrap gap-1'>
                      <input onChange={()=>{SelectDays(elt)}} type="checkbox" id={elt} name={elt}/>
                      <label for={elt}>{elt}</label>
                    </div>
                  )
                })
              }
            </div>
          </p>
          
            <p className="text-1xl  border-b-2 pb-2 mb-4">
            <a className="font-semibold">Type d’établissement : </a>
              <input className="black-text border-transparent focus:outline-none focus:ring-0 font-regular " type="text" value={Etab} onChange={(e) => setEtab(e.target.value)} />
            </p>
            <p className="text-1xl  border-b-2 border-gray-300 pb-2 mb-4">
            <a className="font-semibold">Âge d’accueil min : </a>
              <input className="black-text border-transparent focus:outline-none focus:ring-0 font-regular" type="number" value={ageMin}  onChange={handleAgeMinChange} />
  <select
  className=' block w-full border p-2 rounded-2xl bg-[#99BFE4] appearance-none text-center focus:bg-gray'  onChange={(e) => setuniteMin(e.target.value)}
>
<option value="0"> unité </option>
    <option value="ans">ans</option>
    <option value="mois">mois</option>
</select>
            </p>
            <p className="text-1xl  border-b-2 border-gray-300 pb-2 mb-4">
            <a className="font-semibold">Âge d’accueil max : </a>
              <input className="black-text border-transparent focus:outline-none focus:ring-0 font-regular" type="number" value={ageMax} onChange={handleAgeMaxChange} />
  <select
  className=' block w-full border p-2 rounded-2xl bg-[#99BFE4] appearance-none text-center focus:bg-gray'
  onChange={(e) => setuniteMax(e.target.value)}
>
<option value="0"> unité </option>
    <option value="ans">ans</option>
    <option value="mois">mois</option>
</select>
            </p>
        <p className="text-1xl border-b-2 border-gray-300 pb-2 mb-4">
          <a className="font-semibold">Pédagogie : </a>
          <input className="black-text border-transparent focus:outline-none focus:ring-0 font-regular"type="text" value={pedagogie} id="pedagogie" onChange={(e) => setPedagogie(e.target.value)} />
        </p>
        <p className="text-1xl   border-b-2 border-gray-300 pb-2 mb-4">
        <a className="font-semibold">Capacité d’accueil : </a>
          <input className="black-text border-transparent focus:outline-none focus:ring-0 font-regular  "type="number"value={capacite} onChange={(e) => setCapacite(e.target.value)} />
        </p>
        <p className="text-1xl font-regular  border-b-2 border-gray-300 pb-2 mb-4">
        <a className="font-semibold">Disponibilité de places : </a>
          <input className="black-text border-transparent focus:outline-none focus:ring-0 font-regular" type="number" value={disponibilite} onChange={(e) => setDisponibilite(e.target.value)}/>
        </p>
        <p className="text-1xl  border-b-2 pb-2 mb-4">
            <a className="font-semibold">Langues : </a>
            <div className=' flex flex-wrap gap-2' >
              {
                Langues.map((elt,index)=>{
                  return(
                    <div key={index} className=' flex flex-wrap gap-1'>
                      <input onChange={()=>{SelectLangues(elt)}} type="checkbox" id={elt} name={elt}/>
                      <label for={elt}>{elt}</label>
                    </div>
                  )
                })
              }
            </div>
          </p>  
        
        <div className=' flex flex-row justify-evenly'>
          <p className="text-1xl font-bold text-center text-[#094076]">
          <a href="page-A">Annuler</a>
          
          </p>
          <p className="text-1xl font-bold text-center text-[#094076]">
          <button type="submit" onClick={handleSubmit} >Valider</button>
          </p>
        </div>
 </form>
      </div>
            </div>

        </div>

    
    </div> 
  );
}     
export default SignInCreche2