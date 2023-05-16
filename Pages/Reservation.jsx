import React, { useState } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Reservation = ({ onPlusDinfoclick, onRendezvousClick }) => {

  const initialValue = dayjs('2023-04-17');
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedDate, setSelectedDate] = useState(initialValue);
  const [nomValue, setNomValue] = useState("");
  const [ageValue, setAgeValue] = useState("");
  // const { id } = useParams();
  const id = "63f910357b55d68c6d3ef109";

  const handleAgeChange = (event) => {
    event.preventDefault();
    const selectedOption = event.target.value;
    setAgeValue(selectedOption);
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


//   const handleConfirmClick = () => {
//     console.log(selectedDate.format('YYYY-MM-DD'));
//     const number = parseInt(ageValue);
//     const unit = ageValue.includes("mois") ? "mois" : "annee";
//     console.log(`Age: number: ${number}, unity: ${unit}`);
//   };

  const handleConfirmClick = (event) => {
    event.preventDefault();
    const nom = document.querySelector('input[name="nom"]').value;
    console.log(nom);
    const number = parseInt(ageValue);
    const unit = ageValue.includes("mois") ? "mois" : "ans";
    console.log(typeof number);
    console.log(unit);
    axios.post(`/api/parentRoute/reserver/${id}`, {
        // date: selectedDate.format('YYYY-MM-DD'),
        date: selectedDate.toISOString().substr(0, 10),
        enfants: {
            prenom: nom,
            age:number,
            unite: unit
        }
    })
    
      .then(response => {
          console.log(response.data);
          alert('votre reservation est créée!');
      })
      .catch(error => {
          console.error(error);
          alert('Erreur dans la création de la reservation');
      });
  }

  return (
    <div className=' relative flex justify-between top-4'>
      <div className='absolute mx-10 h-12 w-[145vh] rounded-xl bg-[#99BFE4] flex justify-end mt-6'>
        <button className='mr-4 ml-4 font-semibold text-white z-10' onClick={onPlusDinfoclick}>Plus d'infos</button>
        <button className='mr-4 ml-4 font-semibold text-white' onClick={onRendezvousClick}>Rendez-Vous</button>
      </div>
      <div className="absolute flex justify-between">
        <div className="w-full flex mt-[20vh] ml-[25vh]">
          <div className=" w-1/2  h-[30vh]">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                value={selectedDate}
                onChange={handleDateChange}
                loading={isLoading}
                renderLoading={() => <DayCalendarSkeleton />}
              />
            </LocalizationProvider>
            <input
              type="text"
              value={selectedDate.format('YYYY-MM-DD')}
              className="border-2 border-gray-200 rounded-xl px-4 py-2 ml-[20px]"
              readOnly
            />
          </div>
          <div className="w-1/2">
            <div className="ml-16">  
            {/* pas touche ifsawen agi */}
          <input className='block w-full border p-4 mb-3 mt-4 rounded-2xl  bg-[#99BFE4]  text-[#181818] selection:text-[#000000] active:text-[#000000] black-text ' type='text' placeholder='Nom' name='nom' />
          <div className='relative'>
  <input className='block w-full border p-4 mb-3 rounded-2xl bg-[#99BFE4] text-[#181818] selection:text-[#000000] active:text-[#000000] black-text' placeholder='Age' name='age'/>
  <select
  className='absolute inset-0 block w-full border p-4 rounded-2xl bg-[#99BFE4] appearance-none text-center focus:bg-gray'
  onChange={handleAgeChange}
>
<option value="0">- Select -</option>
    <option value="3 mois">3 mois</option>
    <option value="4 mois">4 mois</option>
    <option value="5 mois">5 mois</option>
    <option value="6 mois">6 mois</option>
    <option value="7 mois">7 mois</option>
    <option value="8 mois">8 mois</option>
    <option value="9 mois">9 mois</option>
    <option value="10 mois">10 mois</option>
    <option value="11 mois">11 mois</option>
    <option value="1 an">1 an</option>
    <option value="2 ans">2 ans</option>
    <option value="3 ans">3 ans</option>
    <option value="4 ans">4 ans</option>
    <option value="5 ans">5 ans</option>
    <option value="6 ans">6 ans</option>
</select>

</div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[80vh] ml-[90vh] flex justify-start">
        <button
          className="bg-[#99BFE4] rounded-2xl mr-7 w-[100px] h-8"
          onClick={handleConfirmClick} >
          Confirmer
        </button>
        <button className="border border-black rounded-2xl w-[100px] h-8">Annuler</button>
      </div>
    </div>
  );
};

export default Reservation;