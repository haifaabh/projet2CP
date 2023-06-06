import React from 'react'
import { datas } from './RubriquesResponsable'
import { Link  } from 'react-router-dom';

const SidebarContent = ({ toggle }) => {
  return (
    <>
    {datas.map(data => {
        return(
            <div className={`${toggle ? "last:w-[3.6rem]" : "last:w-[25rem]"} flex items-center mt-4 p-4 rounded-lg cursor-pointer hover:bg-[#56a6f7] transition-all duration-300 
            last:absolute last:left-4 last:bottom-0`}>
                  <div className='mr-8 text-[1.7rem] text-white'>{data.icon}</div>
                <a href={data.link} key={data.id}>
                  <div className={` ${toggle ? "opacity-0 hidden delay-200" : "text-[1rem] text-white font-medium"}` }>{data.text}</div>
                  </a>
  
              </div>
        )
    })}
    </>
  )
}

export default SidebarContent