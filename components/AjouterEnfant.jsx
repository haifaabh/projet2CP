import { useState } from "react";
import axios from "axios";
import { Box, Grid } from '@mui/material';
import Sidebar from '../component/Sidebar';
import pgarçon from "../images/pgarçon.png";

const AjouterEnfant = () => {
  const [prenom, setPrenom] = useState("");
  const [age, setAge] = useState("");
  const [unite, setUnite] = useState("");

  const handleSave = () => {
    axios.post("/api/parentRoute/enfants/ajouter", {
      prenom,
      age,
      unite
    })
    .then((res) => {
      console.log(res.data);
      // Add your logic for handling the successful save here
    })
    .catch((err) => {
      console.log(err);
      // Add your logic for handling the error here
    });
  };

  return (
    <div>
      <Sidebar />

      <div className="absolute w-[453px] h-[400px] bg-white rounded-2xl p-2  hover:bg-gray-50 shadow-lg left-[600px] top-[150px]">
        <form className='ml-[10%] w-[300px]'>
          <label htmlFor="prenom" className="mt-10 block text-gray-500 text-8 mb-0">
            Prénom
          </label>
          <input
            type="text"
            id="prenom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            className="border-b border-purple-400 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
          <label htmlFor="age" className="mt-6 block text-gray-500 text-8 mb-0">
            Age
          </label>
          <input
            type="text"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="border-b border-purple-400 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
          <label htmlFor="unite" className="mt-6 block text-gray-500 text-8 mb-0">
            Unité
          </label>
          <input
            type="text"
            id="unite"
            value={unite}
            onChange={(e) => setUnite(e.target.value)}
            className="border-b border-purple-400 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
        </form>
        <button
          className="bg-[#F45F3E] text-[#094076] w-[95px] h-[25px] rounded-[12px] font-[Montserrat] top-[30px] right-[-60px] text-[14px] p-[1px] relative"
          onClick={handleSave}
        >
          Enregistrer
        </button>
      </div>
    </div>
  );
}

export default AjouterEnfant;
