import React, { useState } from 'react';

function Bouton2() {
  const [displayText, setDisplayText] = useState('');
  const [showText, setShowText] = useState(false);

  const handleClick = () => {
    if (showText) {
      setDisplayText('');
      setShowText(false);
    } else {
      setDisplayText('1/Entrez les mots clés pertinents pour votre recherche de crèche dans la barre de recherche de notre\nsite web.\n2/Les résultats de la recherche afficheront une liste de crèches correspondant à votre recherche.\nCliquez sur le nom ou la photo dune crèche pour accéder à sa page de détails.\n3/Sur la page de détails de la crèche, vous trouverez des informations telles que l\adresse,le numéro\nde téléphone et l\e-mail de la crèche.Vous pouvez également trouver des liens vers les réseaux sociaux\nde la crèche.\n4/Pour contacter la creche, vous pouvez utiliser l/une de ces informations de contact pour envoyer un \ne-mail ou appeler la crèche directement. Vous pouvez poser des questions sur les services offerts, les tarifs,\nles horaires et les disponibilités.');
      setShowText(true);
    }
  };
  return (
    <div>
      <button className='relative text-[Montserrat] text-[19px] font-bold text-[#094076] mt-[10px] ml-[180px]' onClick={handleClick}>Comment puis-je contacter une crèche à travers votre moteur de recherche ?</button>
      {showText && (
      <p className='relative text-black mt-[10px] ml-[180px]' style={{ whiteSpace: 'pre-line' }}>{displayText}</p>
      )}
    </div>
  );
}

export default Bouton2;