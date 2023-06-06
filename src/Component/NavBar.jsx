import React, { useEffect, useState } from 'react';
import Logo from '../Component/logo.png';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { FiLogOut} from "react-icons/fi";
import axios from 'axios';
import { Link } from 'react-router-dom';

function Navbar() {
  // Fonctions de changement de rôle utilisateur
  function switchToParent() {
    setUserRole('parent');
  }
  
  function switchToAdmin() {
    setUserRole('parent'); 
  }

  function switchToGuest() {
    setUserRole('guest');
  }

  function switchToResponsable() {
    setUserRole('proprietaire');
  }

  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  const handleLog = async () => {
    try {
      const response = await axios.get('/api/isConnected');
      setIsLoggedIn(response.data.isConnected);
      console.log(isLoggedIn);
      console.log(response.data.isConnected);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleLog();

    const Role = async() => {
      await axios
        .get('/api/invite/role')
        .then((res) => {
          setUserRole(res.data['Role']);
          console.log(userRole);
        })
        .catch((err) => console.error(err));
    }
    Role();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  const handleSwitchAccount = (role) => {
    setUserRole(role);
  }

  const handleLogout = () => {
    axios
      .post('/api/auth/deconnecter', null, { withCredentials: true })
      .then((response) => {
        console.log(response.data); // Affiche : { message: 'Déconnexion réussie' }
        setIsLoggedIn(false); // Met à jour l'état isLoggedIn ici
        // Redirige l'utilisateur vers la page de connexion ou effectue une autre action
      })
      .catch((error) => {
        console.error(error);
      });
  };

  function renderNavbar() {
    // Si l'utilisateur est un invité ou n'est pas connecté
    if (userRole === 'guest' || !isLoggedIn) {
      return (
        <header class="bg-white" style={{
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          borderRadius: '4px'
        }}>
          <div class="flex justify-between items-center w-[92%] mx-auto h-20">
            <div class="flex items-center">
              <a href="/accueil">
                <img class="w-16" src={Logo} alt="logo" style={{
                  width: '33px',
                  height: '60px',
                  objectFit: 'fill'
                }} />
              </a>

              <div class="ml-5 text-[#FFB1A6] font-semibold text-xl font-bold hidden md:block">
                Kiddy Creche
              </div>
            </div>

            <div class={`md:static absolute md:min-h-fit min-h-[60vh] left-0 top-[9%] md:w-auto w-full flex items-center px-5 md:py-20 md:px-20 ${isOpen ? 'block' : 'hidden md:block'}`}>
              <ul class="space-y-5 text-[#E83350] font-semibold text-xl font-bold md:flex items-center flex-col md:flex-row">
                <li><Link to="/accueil" onClick={toggleMenu}>Accueil</Link></li>
                <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
                <li><Link to="/connexion" onClick={toggleMenu}>Connexion</Link></li>
                <li><Link to="/inscription" onClick={toggleMenu}>Inscription</Link></li>
              </ul>
            </div>

            <div class="md:hidden flex items-center">
              {isOpen ? (
                <AiOutlineClose class="text-[#E83350] cursor-pointer w-8 h-8" onClick={toggleMenu} />
              ) : (
                <AiOutlineMenu class="text-[#E83350] cursor-pointer w-8 h-8" onClick={toggleMenu} />
              )}
            </div>
          </div>
        </header>
      );
    }

    // Si l'utilisateur est connecté et a le rôle de parent
    if (isLoggedIn && userRole === 'parent') {
      return (
        <header class="bg-white" style={{
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          borderRadius: '4px'
        }}>
          <div class="flex justify-between items-center w-[92%] mx-auto h-20">
            <div class="flex items-center">
              <a href="/accueil">
                <img class="w-16" src={Logo} alt="logo" style={{
                  width: '33px',
                  height: '60px',
                  objectFit: 'fill'
                }} />
              </a>

              <div class="ml-5 text-[#FFB1A6] font-semibold text-xl font-bold hidden md:block">
                Kiddy Creche
              </div>
            </div>

            <div class={`md:static absolute md:min-h-fit min-h-[60vh] left-0 top-[9%] md:w-auto w-full flex items-center px-5 md:py-20 md:px-20 ${isOpen ? 'block' : 'hidden md:block'}`}>
              <ul class="space-y-5 text-[#E83350] font-semibold text-xl font-bold md:flex items-center flex-col md:flex-row">
                <li><Link to="/accueil" onClick={toggleMenu}>Accueil</Link></li>
                <li><Link to="/planning" onClick={toggleMenu}>Planning</Link></li>
                <li><Link to="/factures" onClick={toggleMenu}>Factures</Link></li>
                <li><Link to="/profil" onClick={toggleMenu}>Profil</Link></li>
                <li><FiLogOut class="text-[#E83350] cursor-pointer w-8 h-8" onClick={handleLogout} /></li>
              </ul>
            </div>

            <div class="md:hidden flex items-center">
              {isOpen ? (
                <AiOutlineClose class="text-[#E83350] cursor-pointer w-8 h-8" onClick={toggleMenu} />
              ) : (
                <AiOutlineMenu class="text-[#E83350] cursor-pointer w-8 h-8" onClick={toggleMenu} />
              )}
            </div>
          </div>
        </header>
      );
    }

    // Si l'utilisateur est connecté et a le rôle d'administrateur
    if (isLoggedIn && userRole === 'admin') {
      return (
        <header class="bg-white" style={{
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          borderRadius: '4px'
        }}>
          <div class="flex justify-between items-center w-[92%] mx-auto h-20">
            <div class="flex items-center">
              <a href="/accueil">
                <img class="w-16" src={Logo} alt="logo" style={{
                  width: '33px',
                  height: '60px',
                  objectFit: 'fill'
                }} />
              </a>

              <div class="ml-5 text-[#FFB1A6] font-semibold text-xl font-bold hidden md:block">
                Kiddy Creche
              </div>
            </div>

            <div class={`md:static absolute md:min-h-fit min-h-[60vh] left-0 top-[9%] md:w-auto w-full flex items-center px-5 md:py-20 md:px-20 ${isOpen ? 'block' : 'hidden md:block'}`}>
              <ul class="space-y-5 text-[#E83350] font-semibold text-xl font-bold md:flex items-center flex-col md:flex-row">
                <li><Link to="/accueil" onClick={toggleMenu}>Accueil</Link></li>
                <li><Link to="/utilisateurs" onClick={toggleMenu}>Utilisateurs</Link></li>
                <li><Link to="/parametres" onClick={toggleMenu}>Paramètres</Link></li>
                <li><Link to="/profil" onClick={toggleMenu}>Profil</Link></li>
                <li><FiLogOut class="text-[#E83350] cursor-pointer w-8 h-8" onClick={handleLogout} /></li>
              </ul>
            </div>

            <div class="md:hidden flex items-center">
              {isOpen ? (
                <AiOutlineClose class="text-[#E83350] cursor-pointer w-8 h-8" onClick={toggleMenu} />
              ) : (
                <AiOutlineMenu class="text-[#E83350] cursor-pointer w-8 h-8" onClick={toggleMenu} />
              )}
            </div>
          </div>
        </header>
      );
    }

    // Si l'utilisateur est connecté et a le rôle de responsable
    if (isLoggedIn && userRole === 'proprietaire') {
      return (
        <header class="bg-white" style={{
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          borderRadius: '4px'
        }}>
          <div class="flex justify-between items-center w-[92%] mx-auto h-20">
            <div class="flex items-center">
              <a href="/accueil">
                <img class="w-16" src={Logo} alt="logo" style={{
                  width: '33px',
                  height: '60px',
                  objectFit: 'fill'
                }} />
              </a>

              <div class="ml-5 text-[#FFB1A6] font-semibold text-xl font-bold hidden md:block">
                Kiddy Creche
              </div>
            </div>

            <div class={`md:static absolute md:min-h-fit min-h-[60vh] left-0 top-[9%] md:w-auto w-full flex items-center px-5 md:py-20 md:px-20 ${isOpen ? 'block' : 'hidden md:block'}`}>
              <ul class="space-y-5 text-[#E83350] font-semibold text-xl font-bold md:flex items-center flex-col md:flex-row">
                <li><Link to="/accueil" onClick={toggleMenu}>Accueil</Link></li>
                <li><Link to="/employes" onClick={toggleMenu}>Employés</Link></li>
                <li><Link to="/factures" onClick={toggleMenu}>Factures</Link></li>
                <li><Link to="/profil" onClick={toggleMenu}>Profil</Link></li>
                <li><FiLogOut class="text-[#E83350] cursor-pointer w-8 h-8" onClick={handleLogout} /></li>
              </ul>
            </div>

            <div class="md:hidden flex items-center">
              {isOpen ? (
                <AiOutlineClose class="text-[#E83350] cursor-pointer w-8 h-8" onClick={toggleMenu} />
              ) : (
                <AiOutlineMenu class="text-[#E83350] cursor-pointer w-8 h-8" onClick={toggleMenu} />
              )}
            </div>
          </div>
        </header>
      );
    }
  }

  return (
    <div>
      {renderNavbar()}
    </div>
  );
}

export default Navbar;
