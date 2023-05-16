import React, { useEffect } from 'react'
import { Link , useNavigate } from 'react-router-dom';
import Recherche from '../Component/Recherche';
// import logo from '../images/rrr.png';
import {useState} from 'react';
import axios from 'axios';

const Filtres4 = ()=>{
    const navigate = useNavigate();
    const [creches , setCreches] = useState([]);
    const [ days, setDays ] = useState([]);
    const [showDays, setShowDays] = useState(false);
    const [showLangues, setShowLangues] = useState(false);
    const [showAcceuil, setShowAcceuil] = useState(false);
    const [showEtab, setShowEtab] = useState(false);
    const [showPeda, setShowPeda] = useState(false);
    const [showAge, setShowAge] = useState(false);
    const [ valeur, setValeur ] = useState("");
    const [ unité, setUnité ] = useState("");
    const [ Etab, setEtab ] = useState("");

  
 
    async function searchCreches() {
        try {
               await axios.post('api/invite/rechercher-criteres', {type_accueil:Acceuil,jours_accueil:days,type_établissement:Etab, age : {unite : unité , num : valeur},pédagogie:peda,langue:langues})
               .then(response => {
                const crechesData = response.data;
                setCreches(crechesData);
                navigate('/Navigation', {state :{creches: crechesData}});
                return response.data;
              });
            }catch (error) {
          console.error(error);
          return null;
        }
      }

     const handleAgeChange = (e) => {
      const enteredAge = parseInt(e.target.value);
      setValeur(enteredAge);
    
    };
     const handlePedaChange = (event) => {
      const newPeda = event.target.value;
      setPeda(newPeda);
    };
    const handleAcceuilChange = (event) => {
      const newAcceuil = event.target.value;
      setAcceuil(newAcceuil);
    };
    const handleEtabChange = (event) => {
      const newEtab = event.target.value;
      setEtab(newEtab);
    };
   
    const handleButtonClickA = () => {
      setShowDays(true);
      setShowLangues(false);
      setShowEtab(false);
      setShowAcceuil(false);
      setShowPeda(false);
      setShowAge(false);
      
    };
    const handleButtonClickC = () => {
        setShowDays(false);
        setShowLangues(false);
        setShowAcceuil(true);
        setShowEtab(false);
        setShowPeda(false);
        setShowAge(false);
      };
      const handleButtonClickD = () => {
        setShowDays(false);
        setShowLangues(false);
        setShowAcceuil(false);
        setShowEtab(true);
        setShowPeda(false);
        setShowAge(false);
        
      };
    const handleButtonClickB = () => {
      setShowDays(false);
      setShowLangues(true);
      setShowAcceuil(false);
      setShowEtab(false);
      setShowPeda(false);
      setShowAge(false);
    };
    const handleButtonClickE = () => {
      setShowDays(false);
      setShowLangues(false);
      setShowAcceuil(false);
      setShowEtab(false);
      setShowPeda(true);
      setShowAge(false);
    };
    const handleButtonClickF = () => {
      setShowDays(false);
      setShowLangues(false);
      setShowAcceuil(false);
      setShowEtab(false);
      setShowPeda(false);
      setShowAge(true);
    };
    const handleButtonClickG = () => {
      setShowDays(false);
      setShowLangues(true);
      setShowAcceuil(false);
      setShowEtab(false);
      setShowPeda(false);
      setShowAge(false);
    };

    const [ langues, setLangues ] = useState([]);
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

    return (
        <div>
        <h className='flex top-[80px] left-[500px] font-[Montserrat] text-black text-sm'>Si vous souhaitez changer la localisation</h>
      <div >
        <h className='text-[#094076] text-[20px] absolute font-[Montserrat] top-[155px] left-[14px] font-bold'>FILTRAGE</h>
        <p className='w-[470px] h-[2px] bg-[#094076] absolute top-[189px] left-[14px]'></p>

        <button className='font-[Montserrat] text-base text-[#094076] border-none cursor-pointer left-[13px] top-[200px] absolute' onClick={handleButtonClickC}>Type d'acceuil</button>
      
        <button className='font-[Montserrat] text-base text-[#094076] border-none cursor-pointer left-[13px] top-[240px] absolute' onClick={handleButtonClickA}>Jours d'acceuil</button>
        <button className='font-[Montserrat] text-base text-[#094076] border-none cursor-pointer left-[13px] top-[280px] absolute' onClick={handleButtonClickD}>Type d'établissement</button>
   
        <button className='font-[Montserrat] text-base text-[#094076] border-none cursor-pointer left-[13px] top-[320px] absolute' onClick={handleButtonClickE}>Pédagogie</button>
        <button className='font-[Montserrat] text-base text-[#094076] border-none cursor-pointer left-[13px] top-[360px] absolute' onClick={handleButtonClickB}>Langues</button>
        <button className='font-[Montserrat] text-base text-[#094076] border-none cursor-pointer left-[13px] top-[400px] absolute' onClick={handleButtonClickF}>Age d’accueil </button>

        {/* <img src={logo} alt="" className='w-[68px] h-[120px] absolute top-[20px] left-[14px]' /> */}
      </div>
      
      <div className='w-[1105px] h-[700px] bg-[#99BFE4] border-none absolute right-[0px] top-[0px] left-[250px] flex justify-center'>
      <Recherche/>
      <div className='bg-[#99BFE4] border-none absolute right-[0px] top-[200px] left-[50px] flex justify-center'>
        {showDays && (
          <div className='flex flex-col gap-2'>
            {
              Days.map((elt,index)=>{
                return(
                  <div key={index} className='flex flex-wrap gap-1'>
                    <input onChange={()=>{SelectDays(elt)}} type="checkbox" id={elt} name={elt}/>
                    <label htmlFor={elt}>{elt}</label>
                  </div>
                )
              })
            }
            <button onClick={()=>{console.log('jours:', days)}} >Valider</button>
          </div>
     
        )}
        {showLangues && (
          <div className='flex flex-col gap-2'>
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
            <button onClick={()=>{console.log('lng:', langues)}} >Valider</button>
          </div>
     
        )}
    {showAcceuil && (
        <div className='relative'>
        <div className='flex items-center'>
        <span className="mx-2"> </span> {/* espace entre les deux listes déroulantes */}
        <select className='block border p-8 rounded-lg bg-[#D9D9D9] appearance-none text-center focus:bg-[#FFB1A6]'
        onChange={handleAcceuilChange}
              value={Acceuil}>
       
        <option value="0">-- Type d'acceuil --</option>
        <option value="régulier">Régulier</option>
          <option value="occasionnel">Occasionnel</option>
        </select>
      </div>
                 <button onClick={()=>{console.log(Acceuil)}} >Valider</button>
      </div>
      )}
      {showEtab && (
        <div className='relative'> 
        <div className='flex items-center'>
        <span className="mx-2"> </span> {/* espace entre les deux listes déroulantes */}
        <select className='block border p-8 rounded-lg bg-[#D9D9D9] appearance-none text-center focus:bg-[#FFB1A6]'
        onChange={handleEtabChange}
              value={Etab}>
        <option value="0">-- Type d'établissement --</option> 
        <option value="étatique">Etatique</option>
          <option value="privée">Privé</option>
        </select>
      </div>
      <button onClick={()=>{console.log('Etab:', Etab)}} >Valider</button>
      </div>
      )}
      {showPeda && (
        <div className='relative'> 
        <div className='flex items-center'>
        <span className="mx-2"> </span> {/* espace entre les deux listes déroulantes */}
        <select className='block border p-8 rounded-lg bg-[#D9D9D9] appearance-none text-center focus:bg-[#FFB1A6]'
        onChange={handlePedaChange}
              value={peda} >
        <option value="0">-- Pédagogie --</option> 
        <option value="Montessori">Montessori</option>
          <option value="Palmito">Palmito</option>
          <option value="Pikler Loczy">Pikler Loczy</option>
          <option value="Freinet">Freinet</option>
        </select>
      </div>
      <button onClick={()=>{console.log('peda:', peda)}} >Valider</button>
      </div>
      )}
      
     
    {showAge && (
      <div className='relative'> 
      <div className='flex items-center p-8'>
      {/* HNA DINA<3  */}
      <p className="text-1xl  border-b-2 border-gray-300 pb-2 mb-4">
            <a className="font-semibold">Âge d’accueil : </a>
              <input className="black-text border-transparent focus:outline-none focus:ring-0 font-regular" type="number" value={valeur}  onChange={handleAgeChange} />
  <select
  className=' block w-full border p-2 rounded-2xl bg-[#99BFE4] appearance-none text-center focus:bg-gray'  onChange={(e) => setUnité(e.target.value)}>
<option value="0"> unite </option>
    <option value="ans">ans</option>
    <option value="mois">mois</option>
</select>
            </p>
              
                 <Link to = "/Navigation">
                <button onClick={searchCreches}>Rechercher</button>     
                 
                
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
