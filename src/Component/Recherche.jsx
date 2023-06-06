import React from 'react'

const Recherche = () => {
  return (
    <form className='w-[505px] h-[40px] top-[120px] absolute ml-[130px] '>
         <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
         <div className="relative w-[505px] h-[40px]">
        <div className="absolute inset-y-0 left-1 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5  text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input type="search" id="default-search" className="block w-[505px] font-[Montserrat] h-[40px] p-4 pl-10 text-sm text-gray-900 border-none rounded-[50px] bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Refaire une recherche..." required/>
        <button type="submit" className="text-black absolute right-0.5 top-0.5 font-[Montserrat] bg-[#FFB1A6]  hover:bg-[#ff9789] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[50px] text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Recherche</button>
    </div>
    </form>
   
  )
}

export default Recherche;