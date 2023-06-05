import React from 'react'
// import photo from './photo.png'

const Rectangle = () => {
  return (
    <div className='bg-[#AD98E9] h-[580px] w-[407px] absolute'>
       <h1 style={{ fontFamily: 'Montserrat', fontSize: '28px',position: 'absolute',top:'10px',left:'55px' }}>MES FAVORIS</h1>
       <p className='text-white absolute left-[40px] top-[60px] text-[18px] font-[Montserrat]'>
        Bienvenu(e) dans l’espace de gestion
        <br /> 
        de vos favoris ici vous aurez la
        <br /> 
        possibilité de reconsulter les crèches
        <br />
        qui vous intèressent et organiser vos 
        <br />
        choix
        </p>
        {/* <img src={photo} alt="" className='w-[145px] h-[340px] absolute top-[234px] left-[110px]'/> */}
     </div>
  )
}

export default Rectangle
