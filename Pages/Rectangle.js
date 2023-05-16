import React from 'react'
import './style.css'
function Rectangle (){
    function handleClick() {
        console.log('Le div a été cliqué !');
      }
    return (
    <div className='rectangle'>
        <div onClick={handleClick} className="choix1" style={{ cursor: 'pointer' }} >
          Mon compte
        </div>
        <div onClick={handleClick} className="choix2" style={{ cursor: 'pointer' }} >
          Mes enfants
        </div>
        <div onClick={handleClick} className="choix3" style={{ cursor: 'pointer' }} >
          Mes rendez-vous
        </div>
        <div onClick={handleClick} className="choix4" style={{ cursor: 'pointer' }} >
          Notifications
        </div>
        <div onClick={handleClick} className="choix5" style={{ cursor: 'pointer' }} >
          Signaler un problème
        </div>
    </div>
    )
}
export default Rectangle;