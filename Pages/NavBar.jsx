import React, { useEffect, useState } from 'react';
import Logo from '../images/rrr.png';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { FiLogOut} from "react-icons/fi";
import axios from 'axios';
import { Link } from 'react-router-dom';

function Navbar() {
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
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleLog();
    axios
      .get('/api/invite/role')
      .then((res) => {
        setUserRole(res.data['Role']);
        console.log(userRole);
      })
      .catch((err) => console.error(err));
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  const handleSwitchAccount = (role) => {
    setUserRole(role);
  }

  
// const handleLogout = () => {
//   axios.post('/api/auth/deconnecter', null, { withCredentials: true })
//     .then((response) => {
//       console.log(response.data); // Output: { message: 'Successfully logged out' }
//       // Redirect the user to the login page or do something else
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

const handleLogout = () => {
  axios
    .post('/api/auth/deconnecter', null, { withCredentials: true })
    .then((response) => {
      console.log(response.data); // Output: { message: 'Successfully logged out' }
      setIsLoggedIn(false); // Update isLoggedIn state here
      // Redirect the user to the login page or do something else
    })
    .catch((error) => {
      console.error(error);
    });
};


  function renderNavbar() {
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
              <ul class="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
              <li>
              <a class="hover:text-grey-500 focus:text-[#ffa194] focus:font-bold " href="/accueil">Accueil</a>
            </li>
              
                <li>
                  <a class="hover:text-grey-500 focus:text-[#ffa194] focus:font-bold" href="/accueil#section2">Nos services</a>
                </li>
                <li>
  <a class="hover:text-grey-500 focus:text-[#ffa194] focus:font-bold" href="/accueil#section3">
    Qui sommes nous?
  </a>
</li>

                <li>
                  <a class="hover:text-grey-500 focus:text-[#ffa194] focus:font-bold" href="/Aide">Aide</a>
                </li>
              </ul>
            </div>
    
            <div class="flex items-center gap-6">
            {/* {isLoggedIn && userRole === 'guest' && (
              // <div>
              //   <button onClick={() => handleSwitchAccount('parent')} class="bg-[#FFB1A6] text-white font-semibold px-5 py-2 rounded-full border-b border-grey-800 hover:bg-[#FFC9C1] ">Parent</button>
              // </div>
            )} */}

              <a href="/SignUp">
              <button
                class="bg-[#FFB1A6] text-white font-semibold px-5 py-2 rounded-full border-b border-grey-800 hover:bg-[#FFC9C1]"
                onClick={() => setIsLoggedIn(!isLoggedIn)}
              >
                Inscriptions
              </button>
              </a>
              <a href="/Login">
  <button
    className="bg-white text-black font-semibold px-5 py-2 rounded-full  border-grey-800 "
    onClick={() => setIsLoggedIn(!isLoggedIn)}
  >
    Connexion
  </button>
</a>

        
            {isOpen ? (
              <a href="#menu" onClick={toggleMenu}>
                <AiOutlineClose />
              </a>
            ) : (
              <a href="#menu" onClick={toggleMenu} class="md:hidden">
                <AiOutlineMenu />
              </a>
            )}
          </div>
          
          </div>
        </header>
      );
    }  else if (userRole === 'proprietaire') {
      return (
        <>
          <header class="bg-white" style={{
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            borderRadius: '4px'
          }}>
            <nav2 class="flex  justify-between items-center w-[92%] mx-auto h-20">
    
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
    
              <div class={`md:static absolute md:min-h-fit min-h-[60vh] left-0 top-[9%] md:w-auto w-full flex items-center px-5 md:px-20 ${isOpen ? 'block' : 'hidden md:block'}`}>
                <ul class="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
                  <li>
                    <a class="hover:text-grey-500 focus:text-[#ffa194] focus:font-bold" href="/accueil">Acceuil</a>
                  </li>
                  <li>
                    <a class="hover:text-grey-500 focus:text-[#ffa194] focus:font-bold" href="/profil">Mon compte</a>
                  </li>
                  <li>
                    <a class="hover:text-grey-500 focus:text-[#ffa194] focus:font-bold" href="/Aide/Aide">Aide</a>
                  </li>
                  <li>
                  <div class="flex items-center gap-4">
                  <button  onClick={handleLogout} class="text-black font-semibold py-2  hover:text-[#ff614d] ">Déconnecter</button>

                  <div class="">
                  <FiLogOut />
                  </div>
                  </div>
                  </li>
                </ul>
              </div>
    
              <div class="flex items-center gap-6">
    
                {isOpen ? (
                  <a href="#menu" onClick={toggleMenu}>
                    <AiOutlineClose />
                  </a>
                ) : (
                  <a href="#menu" onClick={toggleMenu} class="md:hidden">
                    <AiOutlineMenu />
                  </a>
                )}
              </div>
    
            </nav2>
          </header>
        </>
      );
    }else if (userRole === 'parent') {
      return (
        <>
          <header class="bg-white" style={{
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            borderRadius: '4px'
          }}>
            <nav2 class="flex  justify-between items-center w-[92%] mx-auto h-20">
    
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
    
              <div class={`md:static absolute md:min-h-fit min-h-[60vh] left-0 top-[9%] md:w-auto w-full flex items-center px-5 md:px-20 ${isOpen ? 'block' : 'hidden md:block'}`}>
                <ul class="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
                  <li>
                    <a class="hover:text-grey-500 focus:text-[#ffa194] focus:font-bold" href="/accueil">Acceuil</a>
                  </li>
                  <li>
                    <a class="hover:text-grey-500 focus:text-[#ffa194] focus:font-bold" href="/MonCompteParent">Profil</a>
                  </li>

                  <li>
                    <a class="hover:text-grey-500 focus:text-[#ffa194] focus:font-bold" href="/favoris">Mes favoris</a>
                  </li>
                  <li>
                    <a class="hover:text-grey-500 focus:text-[#ffa194] focus:font-bold" href="/Aide/Aide">Aide</a>
                  </li>
                  <li>
                  <div class="flex items-center gap-4">
                  <button  onClick={handleLogout} class="text-black font-semibold py-2  hover:text-[#ff614d] ">Déconnecter</button>
                  <div class="">
                  <FiLogOut />
                  </div>
                  </div>
                  </li>
                </ul>
              </div>
    
              <div class="flex items-center gap-6">
    
                {isOpen ? (
                  <a href="#menu" onClick={toggleMenu}>
                    <AiOutlineClose />
                  </a>
                ) : (
                  <a href="#menu" onClick={toggleMenu} class="md:hidden">
                    <AiOutlineMenu />
                  </a>
                )}
              </div>
    
            </nav2>
          </header>
        </>
      );
    }
    else if (userRole === 'admin') {
      return (
        <>
          <header class="bg-white" style={{
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            borderRadius: '4px'
          }}>
            <nav2 class="flex  justify-between items-center w-[92%] mx-auto h-20">
    
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
    
              <div class={`md:static absolute md:min-h-fit min-h-[60vh] left-0 top-[9%] md:w-auto w-full flex items-center px-5 md:px-20 ${isOpen ? 'block' : 'hidden md:block'}`}>
                <ul class="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
                  
          
                  <li>
                    <a class="hover:text-grey-500 focus:text-[#ffa194] focus:font-bold" href="/Attente">Crèches en attente</a>
                  </li>
                  <li>
                    <a class="hover:text-grey-500 focus:text-[#ffa194] focus:font-bold" href="/Crecheadmin">Crèches acceptées</a>
                  </li>
                  <li>
                    <a class="hover:text-grey-500 focus:text-[#ffa194] focus:font-bold" href="/dashboard">Dashboard</a>
                  </li>
            
                  <li>
                  <div class="flex items-center gap-4">
                  <a href="Accueil">
                  <button  onClick={handleLogout} class="text-black font-semibold py-2  hover:text-[#ff614d] ">Déconnecter</button>
                  </a>
                  <div class="">
                  <FiLogOut />
                  </div>
                  </div>
                  </li>
                </ul>
              </div>
    
              <div class="flex items-center gap-6">
    
                {isOpen ? (
                  <a href="#menu" onClick={toggleMenu}>
                    <AiOutlineClose />
                  </a>
                ) : (
                  <a href="#menu" onClick={toggleMenu} class="md:hidden">
                    <AiOutlineMenu />
                  </a>
                )}
              </div>
    
            </nav2>
          </header>
        </>
      )
                }
  }

  return (
    
    <nav>
      {renderNavbar()}
    </nav>
    
  );
}

export default Navbar;
