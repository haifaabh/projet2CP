import React from 'react';

const ModifierCritere = ({open,onClose}) => {
  if(!open) return null
  return (
    <div className="flex items-center justify-center  fixed inset-0 bg-black bg-opacity-70 z-50">
      <div className="w-3/4 md:w-1/2 h-[98vh] bg-white rounded-xl px-8 space-y-1">
      <p className="text-1xl font-bold text-center text-[#094076] border-b-2 border-gray-300 pb-4">
         Accéder à la page ...
        </p>
        <p className="text-1xl font-regular text-center border-b-2 border-gray-300 pb-4">
          <a href="pageA">Type d’accueil</a>
        </p>
        <p className="text-1xl font-regular text-center border-b-2 pb-4 mb-4">
          <a href="pageA">Jours d’acceuil</a>
        </p>
        <p className="text-1xl font-regular text-center border-b-2 pb-4 mb-4">
          <a href="pageA">Type d’établissement</a>
        </p>
        <p className="text-1xl font-regular text-center border-b-2 border-gray-300 pb-4 mb-4">
          <a href="pageA">Âge d’accueil</a>
        </p>
        <p className="text-1xl font-regular text-center border-b-2 border-gray-300 pb-4 mb-4">
          <a href="pageA">Note d’évaluation</a>
        </p>
        <p className="text-1xl font-regular text-center border-b-2 border-gray-300 pb-4 mb-4">
          <a href="pageA">Pédagogie</a>
        </p>
        <p className="text-1xl font-regular text-center border-b-2 border-gray-300 pb-4 mb-4">
          <a href="pageA">Capacité d’accueil </a>
        </p>
        <p className="text-1xl font-regular text-center border-b-2 border-gray-300 pb-4 mb-4">
          <a href="pageA">Disponibilité de places</a>
        </p>
        <p className="text-1xl font-regular text-center border-b-2 border-gray-300 pb-4 mb-2">
          <a href="pageA">Services particuliers</a>
        </p>
        <button onClick={onClose} className="text-1xl font-bold ml-[45%] text-center text-[#094076]">
            Annuler
        </button>

      </div>
    </div>
  );
};

export default ModifierCritere;