import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid } from '@mui/material';
import Sidebar from '../component/Sidebar';
import { HiPencilAlt } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AjouterEnfant from './AjouterEnfant';


const Enfants = () => {
  const [enfants, setEnfants] = useState([]);
  const [modeEdition, setModeEdition] = useState(false);
  const [prenom, setPrenom] = useState("");
  const [age, setAge] = useState("");
  const [unite, setUnite] = useState("");
  const [showContent, setShowContent] = useState(true);
  const [selectedEnfantId, setSelectedEnfantId] = useState(null);

  useEffect(() => {
    axios
      .get("/api/parentRoute/enfants")
      .then((res) => setEnfants(res.data))
      .catch((err) => console.log(err));
  }, []);

 const handleModification = (enfantId) =>{  
    console.log(enfantId);
    console.log(enfants);
    setSelectedEnfantId(enfantId);
    setShowContent(false);
    setModeEdition(true);
    fetchEnfant(enfantId);  }
  
  
  function handleSave() {
    axios.put(`/api/parentRoute/modifier_enfant/${selectedEnfantId}`, {
        prenom,
        age,
        unite,
      })
      .then((res) => {
        console.log(res.data);
        // Mettre à jour la liste des enfants avec les nouvelles informations de l'enfant modifié
        const updatedEnfants = enfants.map((enfant) => {
          if (enfant._id === selectedEnfantId) {
            return {
              ...enfant,
              prenom,
              age,
              unite,
            };
          }
          return enfant;
        });
        setEnfants(updatedEnfants);
        setShowContent(true);
        setModeEdition(false);
        setSelectedEnfantId(null);
      })
      .catch((err) => console.log(err));
  }

 const fetchEnfant= async (enfantId) => {
    try {
      const response = await axios.get(`/api/parentRoute/afficher_enfant/${enfantId}`);
      const enfantData = response.data;
      
      // Update the necessary state variables with the fetched enfant data
      setPrenom(enfantData.prenom);
      setAge(enfantData.age);
      setUnite(enfantData.unite);
    } catch (error) {
      console.log(error);
    }
  }

  const handleRemoveEnfant = (enfantId) => {
    axios
      .delete(`/api/parentRoute/enfants/${enfantId}`)
      .then((res) => {
        if (res.status === 200) {
          setEnfants(enfants.filter((enfant) => enfant._id !== enfantId));
        }
      })
      .catch((err) => console.log(err));
  };
  
  

  return (
    <div>
      <Sidebar />
      <div className="flex flex-nowrap h-[100vh] justify-center ">
       
        <div className="absolute">

           <Link to="/AjouterEnfant">
          <button className="bg-[#FBEBAC] text-[#094076] font-bold w-[190px] h-[40px] top-[-150px] rounded-[12px] left-[500px] text-[18px] font-[Montserrat] absolute">
            Ajouter un enfant
          </button>
        </Link>
        </div>

        {enfants.map((enfant,index) => (
          <div key={index}>
            {showContent ? (
              <div className="relative top-[-80vh] w-[270px] h-[250px] left-[120px] bg-white rounded-2xl p-2 m-4 hover:bg-gray-50 shadow-lg">
                <Grid container spacing={1}>
                  <Grid item xs={12} key={index}>
                    <div>
                      <p className="border-b border-purple-400 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                        <span className="font-semibold">Prénom :</span> {enfant.prenom}
                      </p>
                      <p className="border-b border-purple-400 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                        <span className="font-semibold">Age :</span> {enfant.age} {enfant.unite}
                      </p>
                      <button
                        className="bg-white text-[#094076] w-[95px] h-[25px] rounded-[12px] font-[Montserrat] top-[80px] right-[-15px] text-[14px] p-[1px] border border-purple-400 relative"
                        onClick={() => handleModification(enfant._id)}
                      >
                        Modifier
                      </button>
                      <button
                        className="bg-[#F45F3E] text-[#094076] w-[95px] h-[25px] rounded-[12px] font-[Montserrat] top-[80px] right-[-40px] text-[14px] p-[1px] relative"
                        onClick={() => handleRemoveEnfant(enfant._id)}
                      >
                        Retirer
                      </button>
                    </div>
                  </Grid>
                </Grid>
              </div>
            ) : (
              <div className="absolute w-[453px] h-[400px] bg-white rounded-2xl p-2  hover:bg-gray-50 shadow-lg left-[333px] top-[70px]">
                <form className='ml-[10%] w-[300px]'>
                  <label htmlFor="prenom" className="mt-10 block text-gray-500 text-8 mb-0">
                    Prénom
                  </label>
                  <input
                    readOnly={!modeEdition}
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
                    readOnly={!modeEdition}
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
                    readOnly={!modeEdition}
                    type="text"
                    id="unite"
                    value={unite}
                    onChange={(e) => setUnite(e.target.value)}
                    className="border-b border-purple-400 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </form>
                {modeEdition && (
                  <button
                    className="bg-[#F45F3E] text-[#094076] w-[95px] h-[25px] rounded-[12px] font-[Montserrat] top-[30px] right-[-60px] text-[14px] p-[1px] relative"
                    onClick={handleSave}
                  >
                    Enregistrer
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Enfants;
