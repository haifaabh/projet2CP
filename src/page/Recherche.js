import React, { useEffect  } from 'react'
// import JSONDATA from './MOCK_DATA.json'
import './style.css'
import {useState} from 'react' 
import axios from 'axios';
import InfoBox from '../Component/Navigation/InfoCreche';

function Recherche({ localisation, handleLocalisationChange, creches, handleSearch }) {
    const [nomC,setNomC]=useState('');
    useEffect(() => {
      if (localisation) {
        handleSearch(localisation);
      }
    }, [localisation]);
  
    const handleToggleFavorite = async (crecheId) => {
        try {
          const response = await axios.post(`api/parent/favoris/${crecheId}`);
          console.log(response.data);
        } catch (error) {
          console.log('yadraaa');
          console.error(error);
        }
    };

    return (
      <div className="recherche">
        <div className="search-input">
          <input
          type="text"
          placeholder="Refaire une recherche..."
          value={localisation}
          onChange={handleLocalisationChange}
        />
        
        <span className="icon-rech">
          <i className="fa-solid fa-magnifying-glass" style={{ color: '#000000' }}></i>
        </span>
      </div>
      
      {creches.length > 0 && 
        creches.map((creche, index) => {
          return (
            <div className="user" key={index}>
         <InfoBox
                location={creche.nom}
                days={creche.jours_accueil.join(', ')}
                phone={creche.tél}
                onFicheOpen={() => setNomC(creche.nom)}
              />
              <button onClick={() => handleToggleFavorite(creche._id)}>Toggle Favorite</button>
            </div>
          );
        })}
    </div>
  );
}

export default Recherche;





