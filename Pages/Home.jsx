import React, { useState } from 'react'
import Fiche from '../Component/Fiche'
import { useParams } from 'react-router-dom'

function Home() {
  const [openFiche, setOpenFiche] = useState(false)
//   const { id } = useParams()

  return (
    <div>
   <button className='ModalBtn' onClick={() => setOpenFiche(true)}>fichedisc</button>
   <Fiche open={openFiche} onClose={() => setOpenFiche(false) } />
    </div>
  );
}

export default Home