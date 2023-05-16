// import { useState } from 'react';
// import { RiHeart2Line } from 'react-icons/ri';
import Fiche from '../../components/Map';

// function InfoBox({ nom, localisation, note,nbplace,num, onFicheOpen }) {
//   const [isFavorite, setIsFavorite] = useState(false);

//   const handleToggleFavorite = () => {
//     setIsFavorite(!isFavorite);
//   };

//   return (
//     <div className="w-full h-400px relative ">
//       <div className="bg-white rounded p-2 flex flex-col justify-between hover:bg-slate-500 shadow-md absolute inset-0">
//         <div>
//           <p className="font-bold">Creche : {nom}</p>
//           <p>Localisation : {localisation}</p>
//           <p>Note d'évaluation : {note}</p>
//           <p>Places Disponible : {nbplace}</p>
//           <p>Numero de téléphone : {num}</p>
//         </div>
//         <div className="flex justify-between items-center border-t border-gray-200 pt-1">
//           <button
//             className={`p-2 rounded-full shadow-sm ${isFavorite ? 'bg-red-500' : 'bg-white border border-gray-300'}`}
//             onClick={handleToggleFavorite}
//           >
//             <RiHeart2Line className={`w-6 h-6 ${isFavorite ? 'text-white' : 'text-black'}`} />
//           </button>
//           <button className="bg-[#99BFE4] text-white rounded-3xl px-6 py-1 shadow-sm "  onClick={onFicheOpen}>
//             Plus d'infos
//           </button>
//         </div>
//       </div>
//       <div style={{ paddingBottom: '60%' }}></div>
//     </div>
//   );
// }

// export default InfoBox;
import { useState } from 'react';
import { RiHeart2Line } from 'react-icons/ri';

function InfoBox({
  nomCreche,
  location,
  place,
  note,
  onFicheOpen,
  id,
  handleToggleFavorite,
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  

  const handleToggle = async () => {
    setIsFavorite(!isFavorite);
    handleToggleFavorite(id);
  };

  return (
    <div className="w-full h-400px relative ">
      <div className="bg-white rounded p-2 flex flex-col justify-between hover:bg-slate-500 shadow-md absolute inset-0">
        <div>
          <p className="font-bold">Creche : {nomCreche}</p>
          {/* <p>{days}</p> */}
          <p>Localisation : {location}</p>
          <p>Note d'évaluation : {note}</p>
          <p>Places disponibles : {place}</p>
        </div>
        <div className="flex justify-between items-center border-t border-gray-200 pt-1">
          <button
            className={`p-2 rounded-full shadow-sm ${isFavorite ? 'bg-red-500' : 'bg-white border border-gray-300'}`}
            onClick={handleToggle}
          >
            <RiHeart2Line className={`w-6 h-6 ${isFavorite ? 'text-white' : 'text-black'}`} />
          </button>
          <button className="bg-[#99BFE4] text-white rounded-3xl px-6 py-1 shadow-sm "  onClick={onFicheOpen}  >
            Plus d'infos
          </button>
        </div>
      </div>
      <div style={{ paddingBottom: '60%' }}></div>
    </div>
  );
}

export default InfoBox;