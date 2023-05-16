import React, { useState } from 'react'
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import axios from 'axios';
import { useParams } from 'react-router-dom';



const RendezVous = () => {
  const initialValue = dayjs('2023-04-17');
  const [isLoading, setIsLoading] = React.useState(false);
  const [statusMessage, setStatusMessage] = React.useState('');
  const [value, setValue] = React.useState(dayjs('2022-04-17T15:30'));
  const [value1, setValue1] = React.useState(dayjs('2022-04-17T15:30'));
  const [selectedDate, setSelectedDate] = useState(initialValue);
   const { id } = useParams();
  //  const id = "63f910357b55d68c6d3ef109";
  const handleDateChange = (date) => {
    setSelectedDate(date);
  }

  const handleConfirmClick = async (id) => {
    const rdvData = {
      date: selectedDate.toISOString().substr(0, 10),
      heure_debut: value1.toISOString().substr(11, 5),
      heure_fin: value.toISOString().substr(11, 5),
    };
  
    try {
      const response = await axios.post(`/api/parentRoute/prendre_rdv/${id}`, rdvData, {
        withCredentials: true,
      });
      console.log(response.data);
      setStatusMessage('Rendez-vous pris avec succès');
    } catch (error) {
      console.error(error);
    }
  };
  
    
  return (

       <div className='relative'>
        <div className='absolute w-[220vh] h-14 bg-[#FFB1A6] rounded-xl top-4 left-3 text-white font-semibold' >Prise de Rendez-vous</div>
        <div className='absolute top-[140px] left-[120px] '>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
                value={selectedDate}
                onChange={handleDateChange}
                loading={isLoading}
                renderLoading={() => <DayCalendarSkeleton />}
            />
        </LocalizationProvider>
                  <input type='text' value={selectedDate.format('YYYY-MM-DD')} className='border-2 border-gray-200 rounded-xl px-4 py-2 ml-[20px]' readOnly />
        </div>
    <div className='absolute left-[450px] top-[150px]' >
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimeField
          label="Heure Debut rendez-vous"
          value={value1}
          onChange={(newValue) => setValue1(newValue)}
          format="HH:mm"
        />
    </LocalizationProvider> 
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimeField
          label="Heure Fin rendez-vous"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          format="HH:mm"
        />
    </LocalizationProvider>     
      </div>
<div>
  {statusMessage && <p>{statusMessage}</p>}
  {/* rest of your JSX */}
</div>
        <div className='absolute  left-[435px]  bottom-0 mb-5 mr-5 top-[480px]'>
           <button className='bg-[#FFB1A6] rounded-2xl mr-10 w-[100px] h-8' onClick={() => handleConfirmClick()}>Confirmer</button>
  
{/* <button className='bg-[#FFB1A6] rounded-2xl mr-10 w-[100px] h-8' onClick={() => handleConfirmClick(creche._id)} data-id={creche._id}>Prendre rendez-vous</button> */}

            <button className=' border border-black rounded-2xl w-[100px] h-8'>Annuler</button>
            
    </div>
    {statusMessage && <p>{statusMessage}</p>}
        </div>

  )
}

export default RendezVous