import React from 'react'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

function Modifier (){
    function handleClick() {
        console.log('Le bouton a été cliqué !');
    }
    return (
        <span onClick={handleClick} className="modifier" style={{ textDecoration: 'underline', cursor: 'pointer' }}>
         Modifier 
         <FontAwesomeIcon icon={faPencilAlt} className="modifier-icon" /> 
        </span>
    );
}
export default Modifier;