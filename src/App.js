import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Login from './page/Login';
import MonCompteParent from './Component/MonCompteParent';
import HomePage from './page/HomePage';
import SignInCreche2 from './page/SignInCreche2';
import Filtres4 from './page/filtrage';
import Navigation from './Component/Navigation/Navigation';
import MesReservations from './page/MesReservations';
import AfficherRdv from './Component/AfficherRdv';
import RdvAttente from './Component/RdvAttente';
import MonCompteResponsable from './Component/MonCompteResponsable';
import AfficherReservation from './Component/AfficherReservation';
import RsvAttente from './Component/RsvAttente';
import MaCreche from './page/MaCreche';
import Favoris_parents from './Component/Favoris_parents';
import AjouterEnfant from './Component/AjouterEnfant';
import Enfants from './Component/Enfants';
import MesRendezVous from './page/MesRendezVous';
import Accueil from './page/Accueil';
import Aide from './Component/Aide/Aide';
import InscriptionsAdmin from './page/InscriptionAdmin';
import Dashboard from './page/Dashboard';
import Attente from './Component/Attente';
import Crecheadmin from './Component/Crecheadmin';
import SignUp from './page/SignUp';
import SignIn from './page/SignIn';

function App() {
  return (
      <Routes>
        <Route exact path="/" Component={Login} />
        {/* <Route exact path="/home/:id" Component={Home} /> */}
        <Route exact path='/compte' Component={MonCompteParent} />
        <Route exact path="/homepage" Component={HomePage}/>
        <Route exact path="/SignInCreche2" Component={SignInCreche2}/>
        <Route exact path="/filtres4" Component={Filtres4}/>
        <Route path='/Navigation' element={<Navigation/>}/> 
        <Route path="/mesReservations" element = {<MesReservations/>} />
        <Route path="/afficherRdv" element = {<AfficherRdv/>} />
        <Route path="/rdvsAttente" element = {<RdvAttente/>} />
        <Route path="/compteRespo" element = {<MonCompteResponsable/>} />
        <Route path="/afficherRsv" element = {<AfficherReservation/>} />
        <Route path="/rsvsAttente" element = {<RsvAttente/>} />
        <Route path="/maCreche" element={<MaCreche/>} />
        <Route path="/favoris" element = {<Favoris_parents/>} />
        <Route path="/enfants" element = {<Enfants/>} />
        <Route path="/ajouterEnfant" element = {<AjouterEnfant/>} />
        <Route path="/mesRendezvous" element = {<MesRendezVous/>} />
        <Route path="/accueil" element = {<Accueil/>} />
        <Route path="/aide" element = {<Aide/>} />
        <Route path="/connexionAdmin" element = {<InscriptionsAdmin/>} />
        <Route path="/dashboard" element = {<Dashboard/>} />
        <Route path="/attente" element = {<Attente/>} />
        <Route path="/adminCreches" element = {<Crecheadmin/>} />
        <Route path="/inscriptionEnfant" element = {<SignIn/>} />
        <Route path="/inscription" element = {<SignUp/>} />
      </Routes>
  );
}

export default App;