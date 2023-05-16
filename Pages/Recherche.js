import React, { useEffect } from 'react'
import JSONDATA from './MOCK_DATA.json'
import './style.css'
import {useState} from 'react' 
import axios from 'axios';

function Recherche({ localisation, handleLocalisationChange, creches, handleSearch }) {
    const [nomC,setNomC]=useState('');  
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
        {creche.nom}
        <div> Localisation : {creche.localisation}</div>
        <div>Jours d'accueil : {creche.jours_accueil.join(', ')}</div>
        <div>Numéro de téléphone : {creche.tél}</div>
            </div>
          );
        })}
    </div>
  );
}
export default Recherche;







