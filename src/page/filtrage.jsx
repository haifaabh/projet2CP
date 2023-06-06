import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Recherche from '../Component/Recherche';
import logo from '../Component/logo.png';
import { useState } from 'react';
import axios from 'axios';

const Filtres4 = () => {
  const navigate = useNavigate();

  // États pour les différentes variables
  const [creches, setCreches] = useState([]);
  const [days, setDays] = useState([]);
  const [showDays, setShowDays] = useState(false);
  const [showLangues, setShowLangues] = useState(false);
  const [showAcceuil, setShowAcceuil] = useState(false);
  const [showEtab, setShowEtab] = useState(false);
  const [showPeda, setShowPeda] = useState(false);
  const [showAge, setShowAge] = useState(false);
  const [valeur, setValeur] = useState("");
  const [unité, setUnité] = useState("");
  const [Etab, setEtab] = useState("");
  
  // Fonction de recherche des crèches
  async function searchCreches() {
    try {
      await axios.post('api/invite/rechercher-criteres', {
        type_accueil: Acceuil,
        jours_accueil: days,
        type_établissement: Etab,
        age: { unite: unité, num: valeur },
        pédagogie: peda,
        langue: langues
      }).then(response => {
        const crechesData = response.data;
        setCreches(crechesData);
        navigate('/Navigation', { state: { creches: crechesData } });
        return response.data;
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // Gestionnaire de changement de l'âge
  const handleAgeChange = (e) => {
    const enteredAge = parseInt(e.target.value);
    setValeur(enteredAge);
  };

  // Gestionnaire de changement de la pédagogie
  const handlePedaChange = (event) => {
    const newPeda = event.target.value;
    setPeda(newPeda);
  };

  // Gestionnaire de changement du type d'accueil
  const handleAcceuilChange = (event) => {
    const newAcceuil = event.target.value;
    setAcceuil(newAcceuil);
  };

  // Gestionnaire de changement du type d'établissement
  const handleEtabChange = (event) => {
    const newEtab = event.target.value;
    setEtab(newEtab);
  };

  // Gestionnaires de boutons pour afficher les filtres correspondants

  // Afficher le critere jours d'acceuil
  const handleButtonClickA = () => {
    setShowDays(true);
    setShowLangues(false);
    setShowEtab(false);
    setShowAcceuil(false);
    setShowPeda(false);
    setShowAge(false);
  };
// Afficher le critere type d'acceuil
  const handleButtonClickC = () => {
    setShowDays(false);
    setShowLangues(false);
    setShowAcceuil(true);
    setShowEtab(false);
    setShowPeda(false);
    setShowAge(false);
  };


  // Afficher le critere type d'etablissement
  const handleButtonClickD = () => {
    setShowDays(false);
    setShowLangues(false);
    setShowAcceuil(false);
    setShowEtab(true);
    setShowPeda(false);
    setShowAge(false);
  };

  // Afficher le critere langues
    const handleButtonClickB = () => {
      setShowDays(false);
      setShowLangues(true);
      setShowAcceuil(false);
      setShowEtab(false);
      setShowPeda(false);
      setShowAge(false);
    };

    // Afficher le critere pedagogie
    const handleButtonClickE = () => {
      setShowDays(false);
      setShowLangues(false);
      setShowAcceuil(false);
      setShowEtab(false);
      setShowPeda(true);
      setShowAge(false);
    };

    // Afficher le critere age d'acceuil
    const handleButtonClickF = () => {
      setShowDays(false);
      setShowLangues(false);
      setShowAcceuil(false);
      setShowEtab(false);
      setShowPeda(false);
      setShowAge(true);
    };

    // Afficher le critere langues
    const handleButtonClickG = () => {
      setShowDays(false);
      setShowLangues(true);
      setShowAcceuil(false);
      setShowEtab(false);
      setShowPeda(false);
      setShowAge(false);
    };

    const [ langues, setLangues ] = useState([]);
    // la liste des jours de la semaine

    const Days = [
        "Dimanche",
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi"
      ]

      // La liste des langues
      const Langues = [
        "Arabe",
        "Français",
        "Anglais",
        "Kabyle",
        "Espagnol"
      ]
      
      const [ Acceuil, setAcceuil ] = useState("");
      const [ peda, setPeda ] = useState("");
      
      const SelectDays = ( day ) =>{
        let test = days;
        if ( test.includes( day ) ){
            // Vérifier si le jour est déjà sélectionné
          test = [];
          days.forEach((elt,index)=>{
            if ( elt != day ){
                // Ajouter les jours différents de celui sélectionné
              test.push(elt)
            }
          })
        } else {
          test.push(day)
          // Ajouter le jour à la liste des jours sélectionnés
        }
        // Mettre à jour l'état des jours sélectionnés
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

    return (
        <div>
        <div   >
        <h className='text-[#094076] text-[25px] absolute font-[Montserrat] top-[185px] left-[40px]  font-bold'>FILTRAGE</h>
        <p className='w-[470px] h-[2px] bg-[#094076] absolute top-[240px] left-[14px]'></p>

        <button className='font-[Montserrat] text-[20px] text-[#094076] border-none cursor-pointer left-[40px] top-[280px] absolute' onClick={handleButtonClickC}>Type d'acceuil</button>
        <button className='font-[Montserrat] text-[20px] text-[#094076] border-none cursor-pointer left-[40px] top-[330px] absolute' onClick={handleButtonClickA}>Jours d'acceuil</button>
        <button className='font-[Montserrat] text-[20px] text-[#094076] border-none cursor-pointer left-[40px] top-[380px] absolute' onClick={handleButtonClickD}>Type d'établissement</button>
        <button className='font-[Montserrat] text-[20px] text-[#094076] border-none cursor-pointer left-[40px] top-[430px] absolute' onClick={handleButtonClickE}>Pédagogie</button>
        <button className='font-[Montserrat] text-[20px] text-[#094076] border-none cursor-pointer left-[40px] top-[480px] absolute' onClick={handleButtonClickB}>Langues</button>
        <button className='font-[Montserrat] text-[20px] text-[#094076] border-none cursor-pointer left-[40px] top-[530px] absolute' onClick={handleButtonClickF}>Age d’accueil </button>
      </div>
      <img src={logo} alt="" className='w-[68px] h-[120px] absolute top-[20px] left-[50px]' />
      <div className='w-[880px] h-[700px] bg-[#99BFE4] border-none absolute right-[0px] top-[0px] left-[500px] flex justify-center'>
      <div className='bg-[#99BFE4] border-none absolute right-[0px] top-[200px] left-[50px] flex justify-center'>
     
      {showDays && ( // Vérifie si showDays est vrai, affiche le contenu à l'intérieur du bloc s'il est vrai
      <div className='flex flex-col gap-2'>
        <h2 className="text-white text-[30px] absolute top-[-70px] left-[45%] transform translate-x-[-30%] font-bold whitespace-nowrap">Jours d'âccueil</h2>
        {/* Affiche un titre pour les jours d'accueil */}
        {
          Days.map((elt,index)=>{ // Parcourt la liste des jours
            return(
              <div key={index} className='flex flex-wrap gap-1'>
                {/* Affiche une case à cocher pour chaque jour */}
                <input onChange={()=>{SelectDays(elt)}} type="checkbox" id={elt} name={elt}/>
                <label htmlFor={elt}>{elt}</label> {/* Affiche le nom du jour */}
              </div>
            )
          })
        }
        <button className="flex mt-8 left-[130px]  font-semibold text-[#094076]" onClick={() => { console.log('Age:', peda) }}>Valider</button>
        {/* Affiche un bouton de validation */}
      </div>
    )}
        {showLangues && (
          <div className='flex flex-col gap-2'>
          <h2 className="text-white text-[30px] absolute top-[-70px] left-[45%] transform translate-x-[-30%] font-bold whitespace-nowrap">Langues</h2>

            {
              Langues.map((elt,index)=>{
                return(
                  <div key={index} className='flex flex-wrap gap-1'>
                    <input onChange={()=>{SelectLangues(elt)}} type="checkbox" id={elt} name={elt}/>
                    <label htmlFor={elt}>{elt}</label>
                  </div>
                )
              })
            }
            <button className="flex mt-8 left-[130px]  font-semibold text-[#094076]" onClick={() => { console.log('Age:', peda) }}>Valider</button>
            </div>
     
        )}
    {showAcceuil && (
        <div className='relative'>
        <div className='flex items-center'>
        <h2 className="text-white text-[30px] absolute top-[-70px] left-[30%] transform translate-x-[-30%] font-bold whitespace-nowrap">Type d'âccueil</h2>

        <span className="mx-2"> </span> {/* espace entre les deux listes déroulantes */}
        <select           className='block border p-8 rounded-full w-[300px] bg-[#fff45b] mr-[75px] appearance-none text-center text-[20px] '

        onChange={handleAcceuilChange}
              value={Acceuil}>
       
        <option value="0">-- Type d'acceuil --</option>
        <option value="régulier">Régulier</option>
          <option value="occasionnel">Occasionnel</option>
        </select>
      </div>
                       <button className="absolute mt-8 left-[130px] font-semibold text-[#094076]" onClick={() => { console.log('Age:', peda) }}>Valider</button>

      </div>
      )}
      {showEtab && (
        <div className='relative'> 
        <div className='flex items-center'>
        <h2 className="text-white text-[30px] absolute top-[-70px] left-[25%] transform translate-x-[-30%] font-bold whitespace-nowrap">Type d'établissement</h2>
        <span className="mx-2"> </span> 
        <select  className='block border p-8 rounded-full w-[300px] bg-[#fff45b] mr-[75px] appearance-none text-center text-[20px] '
        onChange={handleEtabChange}
              value={Etab}>
        <option value="0">-- Type d'établissement --</option> 
        <option value="étatique">Etatique</option>
          <option value="privée">Privé</option>
        </select>
      </div>
      <button className="absolute mt-8 left-[130px] font-semibold text-[#094076]" onClick={() => { console.log('Age:', peda) }}>Valider</button>
      </div>
      )}
      {showPeda && (
        <div className='relative'> 
        <h2 className="text-white text-[30px] absolute top-[-70px] left-[30%] transform translate-x-[-30%] font-bold ">Pédagogie</h2>

        <div className='flex items-center '>
        <span className=" absolute left-[100px] "></span> 
        <select
        className='block border p-8 rounded-full w-[300px] bg-[#fff45b] mr-[75px] appearance-none text-center text-[20px]'
        onChange={handlePedaChange}
          value={peda}
        >
          <option value="0">-- Pédagogie --</option>
          <option value="Montessori">Montessori</option>
          <option value="Palmito">Palmito</option>
          <option value="Pikler Loczy">Pikler Loczy</option>
          <option value="Freinet">Freinet</option>
        </select>
      </div>
        <button className="absolute mt-8 left-[130px] font-semibold text-[#094076]" onClick={() => { console.log('Age:', peda) }}>Valider</button>
      </div>
      )}
      
     
      {showAge && ( // Vérifie si showAge est vrai, affiche le contenu à l'intérieur du bloc s'il est vrai
      <div className='relative'> 
        <div className='flex items-center p-8'>
          <h2 className="text-white text-[30px] absolute top-[-70px] left-[30%] transform translate-x-[-30%] font-bold ">Âge accueil</h2>
          {/* Affiche un titre pour l'âge d'accueil */}
          <p className="text-1xl pb-2 mb-4">
            <input
              className='block border p-4 rounded-full w-[300px] bg-[#fff45b] mr-[75px] appearance-none text-center text-[20px]'
              type="number" value={valeur} placeholder="Âge accueil" onChange={handleAgeChange} />
            {/* Affiche une zone de saisie pour l'âge d'accueil */}
            <select
              className=' p-2 rounded-full w-[300px] bg-[#fff45b] mr-[75px] appearance-none text-center text-[20px] mt-4'
              onChange={(e) => setUnité(e.target.value)}>
              <option value="0"> unité </option>
              <option value="ans">ans</option>
              <option value="mois">mois</option>
            </select>
            {/* Affiche une liste déroulante pour l'unité de l'âge */}
          </p>
          <Link to="/Navigation"> {/* Crée un lien vers "/Navigation" */}
            <button onClick={searchCreches} className="absolute mt-24 px-8 rounded-full p-4 text-[24px] bg-[#094076] left-[35px] font-semibold text-white">Filtrer les résultats</button>     
            {/* Affiche un bouton pour filtrer les résultats */}
          </Link> 
        </div>
      </div>   
    )} 
                 </div>
    </div>
    </div>
    
    

    )
}
export default Filtres4 ;
