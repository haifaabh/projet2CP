import React, { useState } from 'react';
// import Texte from './Texte';
import Recherche from './Recherche';
import axios from 'axios';

function HomePage() {
  const [localisation, setLocalisation] = useState('');
  const [creches, setCreches] = useState([]);

  const handleLocalisationChange = (event) => {
    setLocalisation(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post('/api/invite/rechercher-lieu', { localisation });
      setCreches(response.data);
    } catch (error) {
      console.log('yooo');
      console.error(error);
    }
  };

  return (
    <div className='flex justify-top'>
      {/* <Texte /> */}
      <Recherche
        localisation={localisation}
        handleLocalisationChange={handleLocalisationChange}
        creches={creches}
        handleSearch={handleSearch}
      />
      <form onSubmit={handleSearch}>
        <button type='submit' className='text-black font-bold'>
          Trouver
        </button>
      </form>
    </div>
  );
}

export default HomePage;