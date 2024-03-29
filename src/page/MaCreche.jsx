//Dcalaration des import necessaires images et component
import React, { useState, useEffect } from 'react';
// import logoImg from '../images/logo5.png';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Sidebar from '../Component/Sidebar/Sidebar';
import Navbar70 from '../Component/NavBar';
import axios from 'axios';

//Déclaration des jours
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

const MaCreche= () => {
    const [modeEdition,SetmodeEdition] = useState(false);
  const [ days, setDays ] = useState([]);
  const [ langues, setLangues ] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [ accueil, setAccueil ] = useState([]);
  const [disponibilite, setDisponibilite] = useState(""); 
  const [NomCreche, setNomCreche] = useState(""); 
  const [creche , setCreche] = useState({});
  const [Etab, setEtab] = useState("");
  const [ageMin, setAgeMin] = useState("");
  const [ageMax, setAgeMax] = useState("");
  const [capacite, setCapacite] = useState("");
  const [uniteMin, setuniteMin] = useState("");
  const [uniteMax, setuniteMax] = useState("");
  const [pedagogie, setPedagogie] = useState("");
  const [Localisation, setLocalisation] = useState("");

  useEffect(() => {
    fetchCrecheData();
  }, []);
  
  const fetchCrecheData = async () => {
    try {
      const response = await axios.get('api/proprietaire/afficher_ma_creche');
      const crecheData = response.data;
      setCreche(response.data);
      setNomCreche(crecheData.nom);
      setLocalisation(crecheData.localisation);
      setPedagogie(crecheData.pédagogie);
      setCapacite(crecheData.capacité_accueil);
      setEtab(crecheData.type_établissement);
      setDisponibilite(crecheData.disponibilité_places);
      setAccueil(crecheData.type_accueil);
      setuniteMax(crecheData.age_accueil.uniteMax);
      setuniteMin(crecheData.age_accueil.uniteMin);
      setAgeMin(crecheData.age_accueil.ageMin);
      setAgeMax(crecheData.age_accueil.ageMax);
      SelectLangues(crecheData.langues);

    } catch (error) {
      console.error(error);
    }
  };
  //fonction pour envoyer les modifications et ou inscription de la crèche
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if(uniteMin==='ans')
        setAgeMin(ageMin*12);
      if(uniteMax==='ans')
        setAgeMax(ageMax*12);
      const crecheData = {
        nom: NomCreche,
        localisation: Localisation,
        type_accueil: accueil,
        jours_accueil: days,
        gps : creche.gps,
        type_établissement: Etab,
        age_accueil: { "ageMin": ageMin, "ageMax": ageMax },
        pédagogie: pedagogie,
        langue: langues,
        capacite_acceuil:capacite,
        disponibilite_places: disponibilite,
    };
    console.log('loool');
    console.log(crecheData);
      await axios.put('api/proprietaire/creche/modifier', crecheData);
    } catch (error) {
      console.error(error);
    }
  };

  //valider les jours selectionnes
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
  const handleValiderClick =() => {
    const pedagogy = document.getElementById("pedagogie");
    console.log(pedagogy.value);
  }
  const ModifierEdition = () => {
    SetmodeEdition(!modeEdition);
  }

  const handleAgeMinChange = (e) => {
    const enteredAge =parseInt(e.target.value);
  };

  const handleAgeMaxChange = (e) => {
    const enteredAge = parseInt(e.target.value);
  
  };
 
  
useEffect(() => {
  setIsSmallScreen(window.innerWidth < 670);
  window.addEventListener("resize", () => setIsSmallScreen(window.innerWidth < 670));
}, []);

  return (
    <div className=''>

    <Navbar70 />

<div className='absolute'>
<button className='absolute top-[0px] left-[1200px] m-2 text-[#094076] font-semibold underline' variant='outlined' onClick={ModifierEdition} >Modifier</button>

<div className="flex justify-start  top-[500px] mr-11 left-[500px] ">
<div className='absolute top-[0px]  mr-11 left-[05px] '>
  <Sidebar />
  </div>
          {/* <img className='h-[90px] w-[110px] ml-5 mt-4 hidden md:block mt-4' src={logoImg} alt="Logo" /> */}
        <div className={`${isSmallScreen ? "text-center" : "text-left"} mt-2 md:mt-[100px]`}>
           <p className={`${isSmallScreen ? "text-[12px] mb-0" : "text-[12px] mb-4"} text-[#ffffff] px-4 md:px-6 whitespace-pre-wrap  text-lg font-regular`}>Remplissez dès maintenant la fiche descriptive de votre crèche pour la rendre visible aux parents cherchant des services de garde pour leurs enfants.</p>
        </div>
        
      <div className='w-full p-6 md:w-2/3 md:h-screen order-2 md:order-2 flex justify-left items-center left-[500px] lg:mt-[20px]  mb-4'>
        <div className='flex flex-col text-left items-center justify-left md:w-2/3 lg:w-2/3 mx-auto mt-40 left-[500px]'>
        <div className="flex flex-col text-left w-[700px]  bg-white rounded-xl p-8 space-y-2 shadow-xl">
        <p className="text-1xl  text-[#094076] border-b-2 border-gray-300 pb-4"></p>
         <form className='w-full left-[50px]' onSubmit={handleFormSubmit}> 
        <p className="text-1xl  border-b-2 border-gray-300 pb-2">
            <a className="font-semibold">Nom Crèche : </a>
              <input 
              readOnly={!modeEdition}
              className="black-text border-transparent focus:outline-none focus:ring-0 font-regular" type="text" value={NomCreche}  onChange={(e) => setNomCreche(e.target.value)} ></input>
            </p>
            <p className="text-1xl  border-b-2 border-gray-300 pb-2">
            <a className="font-semibold">Localisation : </a>
              <input 
              readOnly={!modeEdition}
              className="black-text border-transparent focus:outline-none focus:ring-0 font-regular" type="text" value={Localisation}  onChange={(e) => setLocalisation(e.target.value)} ></input>
            </p>
            <p className="text-1xl  border-b-2 border-gray-300 pb-2">
            <a className="font-semibold">Type d’accueil : </a>
              <input 
              readOnly={!modeEdition}
              className="black-text border-transparent focus:outline-none focus:ring-0 font-regular"  type="text" value={accueil} onChange={(e) => setAccueil(e.target.value)}  />
            </p>
            <p className="text-1xl  border-b-2 pb-2 mb-4">
            <a 
            readOnly={!modeEdition}
            className="font-semibold">Jours d’accueil : </a>
            <div 
            disabled={!modeEdition}
            className=' flex flex-wrap gap-2'>
              {
                Days.map((elt,index)=>{
                  return(
                    <div key={index} className=' flex flex-wrap gap-1'>
                      <input 
                      disabled={!modeEdition}
                      onChange={()=>{SelectDays(elt)}} type="checkbox" id={elt} name={elt}/>
                      <label for={elt}>{elt}</label>
                    </div>
                  )
                })
              }
            </div>
          </p>
          
            <p className="text-1xl  border-b-2 pb-2 mb-4">
            <a className="font-semibold">Type d’établissement : </a>
              <input 
              readOnly={!modeEdition}
              className="black-text border-transparent focus:outline-none focus:ring-0 font-regular " type="text" value={Etab} onChange={(e) => setEtab(e.target.value)} />
            </p>
            <p className="text-1xl  border-b-2 border-gray-300 pb-2 mb-4">
            <a className="font-semibold">Âge d’accueil min : </a>
              <input 
              readOnly={!modeEdition}
              className="black-text border-transparent focus:outline-none focus:ring-0 font-regular" type="number" value={ageMin}  onChange={handleAgeMinChange} />
  <select 
  disabled={!modeEdition}
>
<option value = "0"> {uniteMin} </option>
    <option value="ans">ans</option>
    <option value="mois">mois</option>
</select>
            </p>
            <p className="text-1xl  border-b-2 border-gray-300 pb-2 mb-4">
            <a 
            readOnly={!modeEdition}
            className="font-semibold">Âge d’accueil max : </a>
              <input 
              readOnly={!modeEdition}
              className="black-text border-transparent focus:outline-none focus:ring-0 font-regular" type="number" value={ageMax} onChange={handleAgeMaxChange} />
  <select
  disabled={!modeEdition}
  className=' block w-full border p-2 rounded-2xl bg-[#99BFE4] appearance-none text-center focus:bg-gray'
  onChange={(e) => setuniteMax(e.target.value)}
>
<option value="0"> {uniteMax}</option>
    <option value="ans">ans</option>
    <option value="mois">mois</option>
</select>
            </p>
        <p className="text-1xl border-b-2 border-gray-300 pb-2 mb-4">
          <a 
          readOnly={!modeEdition} 
          className="font-semibold">Pédagogie : </a>
          <input 
          readOnly={!modeEdition}
          className="black-text border-transparent focus:outline-none focus:ring-0 font-regular"type="text" value={pedagogie} id="pedagogie" onChange={(e) => setPedagogie(e.target.value)} />
        </p>
        <p className="text-1xl   border-b-2 border-gray-300 pb-2 mb-4">
        <a 
        readOnly={!modeEdition} 
        className="font-semibold">Capacité d’accueil : </a>
          <input 
          readOnly={!modeEdition}
          className="black-text border-transparent focus:outline-none focus:ring-0 font-regular  "type="number"value={capacite} onChange={(e) => setCapacite(e.target.value)} />
        </p>
        <p className="text-1xl font-regular  border-b-2 border-gray-300 pb-2 mb-4">
        <a className="font-semibold">Disponibilité de places : </a>
          <input 
          readOnly={!modeEdition}
          className="black-text border-transparent focus:outline-none focus:ring-0 font-regular" type="number" value={disponibilite} onChange={(e) => setDisponibilite(e.target.value)}/>
        </p>
        <p className="text-1xl  border-b-2 pb-2 mb-4">
            <a className="font-semibold">Langues : </a>
            <div className=' flex flex-wrap gap-2' >
              {
                Langues.map((elt,index)=>{
                  return(
                    <div key={index} className=' flex flex-wrap gap-1'>
                      <input 
                      disabled={!modeEdition}
                      onChange={()=>{SelectLangues(elt)}} type="checkbox" id={elt} name={elt}/>
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
          <button type="submit" >Valider</button>
          </p>
        </div>
 </form>
      </div>
            </div>

        </div>

    
    </div> 
    </div> 
    </div> 
  );
}     
export default MaCreche;
