import React, { useState } from 'react';
import Texte from './Texte';
import Recherche from './Recherche';
import axios from 'axios';
import { Link , useNavigate} from 'react-router-dom';


function HomePage() {
  const [localisation, setLocalisation] = useState('');
  const [creches, setCreches] = useState([]);

  const navigate = useNavigate();

  const handleLocalisationChange = (event) => {
    setLocalisation(event.target.value);
  };

  const handleSearch = async () => {
    try {
    axios.post('/api/invite/rechercher-lieu', { localisation }).then((data)=>{
      setCreches(data.data);
      navigate("/Navigation",{state:{creches:data.data}});
      }
        
        );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex justify-top'>
      <Texte />
      <Recherche
        localisation={localisation}
        handleLocalisationChange={handleLocalisationChange}
        creches={creches}
        handleSearch={handleSearch}
      /> 
         <Link to={{
        pathname: '/Navigation',
        state: {
          creches: creches
        }
      }}></Link>
       <button className='text-black font-bold' onClick={handleSearch}>
        Trouver
      </button>
    
    </div>
  );
}
export default HomePage;
