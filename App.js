import { ReactDOM } from 'react-dom/client';
import React from 'react';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Mesenfants from './Pages/Mesenfants';
import HomePage from './Pages/HomePage';
import RendezVous from './Pages/RendezVous';
import NavBar from './Pages/NavBar';
import InscriptionAdmin from './Pages/InscriptionAdmin';
import SgnInCreche from './Pages/SignInCreche';
import SignInCreche from './Pages/SignInCreche';
import SignInCreche2 from './Pages/SignInCreche2';
import SignUp from './Pages/SignUp';
import Dashboard from './Pages/Dashboard';
import Reservation from './Pages/Reservation';
import SignIn from './Pages/SignIn';
import Navigation from './Pages/Navigation/Navigation';
import MonCompteResponsable from './components/MonCompteResponsable';
import Accueil from './Pages/Accueil';
import Filtres4 from './Pages/filtrage';
import MonCompteParent from './components/MonCompteParent';
import MesRendezVous from './Pages/MesRendezVous';
import MesResevations from './Pages/MesReservations';
// import { Router } from 'express';

function App() {
 
  return (
    <Routes>
    <Route exact path="/Login" element={<Login/>} />
    <Route exact path="/Accueil" element={<Accueil/>} />
    <Route exact path="/Mesenfants" element={<Mesenfants/>} /> 
    <Route exact path="/RendezVous/:id" element={<RendezVous/>} /> 
    <Route exact path="/NavBar" element={<NavBar/>} /> 
    <Route exact path="/InscriptionAdmin" element={<InscriptionAdmin/>} /> 
    <Route exact path="/SignInCreche" element={<SignInCreche/>} /> 
    <Route exact path="/HomePage" element={<HomePage/>} /> 
    <Route exact path="/SignInCreche2" element={<SignInCreche2/>} /> 
    <Route exact path="/SignUp" element={<SignUp/>} /> 
    <Route exact path="/Reservation/:id" element={<Reservation/>} /> 
    <Route exact path="/SignIn" element={<SignIn/>} /> 
    <Route exact path="/Navigation" element={<Navigation/>} /> 
    <Route exact path="/MonCompteParent" element={<MonCompteParent/>} /> 
    <Route exact path="/MesRendezVous" element={<MesRendezVous/>} />
    <Route exact path="/MesReservations" element={<MesResevations/>} /> 
    <Route exact path="/filtres4" element={<Filtres4/>} /> 
    <Route exact path="/Dashboard" element={<Dashboard/>} /> 
  </Routes>
  
  );

}


export default App;
