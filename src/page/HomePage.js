import React, { useState } from 'react'; // Importation de React et useState depuis la bibliothèque 'react'
// import Texte from './Texte';
import Recherche from './Recherche'; // Importation du composant Recherche depuis './Recherche'
import axios from 'axios'; // Importation d'axios pour effectuer des requêtes HTTP

function HomePage() {
  const [localisation, setLocalisation] = useState(''); // Variable d'état pour stocker la localisation
  const [creches, setCreches] = useState([]); // Variable d'état pour stocker les résultats de recherche des crèches

  const handleLocalisationChange = (event) => {
    setLocalisation(event.target.value); // Mise à jour de la localisation avec la valeur saisie par l'utilisateur
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post('/api/invite/rechercher-lieu', { localisation }); // Envoi d'une requête POST à l'API backend pour rechercher des crèches en fonction de la localisation
      setCreches(response.data); // Mise à jour des résultats de recherche avec les données récupérées
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

export default HomePage; // Exportation du composant HomePage
