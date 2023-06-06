import React, { useState } from 'react';

function Bouton() {
  const [displayText, setDisplayText] = useState('');
  const [showText, setShowText] = useState(false);

  const handleClick = () => {
    if (showText) {
      setDisplayText('');
      setShowText(false);
    } else {
      setDisplayText('1/Accédez à la page d\'inscription en cliquant sur le bouton "Sign up" situé en haut de la page d\'accueil\n2/Remplissez le formulaire d\'inscription avec vos informations personnelles telles que votre nom complet,\nvotre adresse e-mail et votre mot de passe.\n3/Vérifiez que toutes les informations sont correctes et cliquez sur le bouton "Valider".\n4/Vous recevrez un e-mail de confirmation sur l\'adresse e-mail que vous avez fournie lors de l\'inscription.\nOuvrez cet e-mail et cliquez sur le lien de confirmation pour activer votre compte utilisateur.\n5/Une fois votre compte activé, connectez-vous à votre compte en utilisant votre adresse e-mail et votre\nmot de passe,et vous pouvez commencer à utiliser toutes les fonctionnalités de notre site web.');
      setShowText(true);
    }
  };

  return (
    <div>
      <button className='relative text-[Montserrat] text-[19px] font-bold text-[#094076] mt-[180px] ml-[180px]' onClick={handleClick}>
        Comment puis-je m'inscrire sur votre site web et créer un compte utilisateur ?
      </button>
      {showText && (
        <p className='relative text-black mt-[10px] ml-[180px]' style={{ whiteSpace: 'pre-line' }}>
          {displayText}
        </p>
      )}
    </div>
  );
}

export default Bouton;