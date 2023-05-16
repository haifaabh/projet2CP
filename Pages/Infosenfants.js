import React from 'react'
import './style.css'
// import photo from './photo.png'

  function Infosenfant() {

    return (
      <div className="boxx">
        <div className="boxinfos">
          <h1 className="Nom">Prénom</h1>
          <h4 className="trait"></h4> 
          <h4 className="Nom">Nom</h4>
          <h4>Mohammed Cherif</h4>
          <h5 className="trait2"></h5> 
          <h5 className="Nom">Age</h5>
          <h4>2 ans</h4> 
          <h5 className="trait3"></h5> 
        </div>
        {/* <img src={photo} alt="" style={{ width: '140px', height: '90px', position: 'absolute', top:'-90px', left:'325px' }} /> */}
      </div>
    );
  }
  
  export default Infosenfant;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './style.css';

// function Infosenfant() {
//   const [enfants, setEnfants] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await axios.get('/api/parentRoute/enfants');
//       setEnfants(response.data);
//     };
//     fetchData();
//   }, []);

  // return (
  //   <div className="boxx">
  //     {enfants.map((enfant, index) => (
  //       <div className="boxinfos" key={index}>
  //         <h1 className="Nom">Prénom</h1>
  //         <h2>{enfant.prenom}</h2>
  //         <h4 className="trait2"></h4>
  //         <h5 className="age">Age</h5>
  //         <h6>{enfant.age} </h6>
  //         <h5 className="trait3"></h5>
  //       </div>
  //     ))}
  //   </div>
  // );
// }

// export default Infosenfant;