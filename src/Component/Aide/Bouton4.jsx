import React, { useState } from 'react';

function Bouton4 () {
    const [displayText, setDisplayText] = useState('');
    const [showText, setShowText] = useState(false);
     const handleClick = () => {
    if (showText) {
      setDisplayText('');
      setShowText(false);
    } else {
      setDisplayText('Si vous constatez que la crèche que vous avez visitée ne respecte pas les normes de sécurité ou de\nqualité, vous pouvez laisser un commentaire sur cette crèche pour informer les autres parents et aider\nla crèche à améliorer ses services. Pour cela, vous pouvez suivre les étapes suivantes.\n1/Recherchez la crèche sur notre site web et accédez à sa page de détails.\n2/Faites défiler la page jusqu\a la section des commentaires et cliquez sur le bouton "Ajouter un\ncommentaire".\n3/Rédigez votre commentaire en donnant autant de détails que possible sur les problèmes que vous\navez observés dans la crèche. Soyez aussi précis que possible en fournissant des exemples concrets et en\névitant les jugements subjectifs.\n4/Vérifiez votre commentaire pour vous assurer qu\il est clair, précis et respectueux.Évitez les insultes,\nles commentaires malveillants ou les informations fausses ou trompeuses.\n5/Publiez votre commentaire. Votre commentaire sera publié sur la page de la crèche et sera visible par\nles autres parents et les responsables de la crèche.\nEn laissant un commentaire sur une crèche qui ne respecte pas les normes de sécurité ou de qualité, vous\ncontribuezà protéger les enfants et à améliorer la qualité des services offerts par la crèche. Votre commentaire\npeut également aider d\autres parents à prendre une décision éclairée lorsqu\ils recherchent une crèche\npour leur enfant.');
      setShowText(true);
    }
  };
  return (
    <div>
      <button className='relative text-[Montserrat] text-[19px] font-bold text-[#094076] mt-[10px] ml-[180px]' onClick={handleClick}>Comment signaler une crèche qui ne respecte pas les normes de sécurité ou de qualité ?</button>
      {showText && (
      <p className='relative text-black mt-[10px] ml-[180px]' style={{ whiteSpace: 'pre-line' }}>{displayText}</p>
      )}
    </div>
  );
}

export default Bouton4;