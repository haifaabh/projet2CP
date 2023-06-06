import React, { useState } from 'react';


function Bouton3() {
    const [displayText, setDisplayText] = useState('');
    const [showText, setShowText] = useState(false);
  
    const handleClick = () => {
      if (showText) {
        setDisplayText('');
        setShowText(false);
      } else {
        setDisplayText('Pour modifier les paramètres de votre compte utilisateur, connectez-vous à votre compte et accédez\nà la section "Mon compte", selon l\interface de notre site web. Vous pouvez modifier des éléments tels\nque votre nom, votre adresse e-mail, votre mot de passe, vos préférences de notification et plus encore.\nPour appliquer les modifications, cliquez sur le bouton "Enregistrer" ou "Mettre à jour" en bas de la page.\nSi vous rencontrez des difficultés pour modifier les paramètres de votre compte ou si vous avez des\nquestions supplémentaires,n\hésitez pas à contacter notre service client pour obtenir de l\aide.');
        setShowText(true);
      }};
  return (
    <div>
      <button className='relative text-[Montserrat] text-[19px] font-bold text-[#094076] mt-[10px] ml-[180px]' onClick={handleClick}>Comment puis-je modifier les paramètres de mon compte utilisateur ?</button>
      {showText && (
      <p className='relative text-black mt-[10px] ml-[180px]' style={{ whiteSpace: 'pre-line' }}>{displayText}</p>
      )}
    </div>
  );
}

export default Bouton3;