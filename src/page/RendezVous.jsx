import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import axios from 'axios';

const RendezVous = ({ onPlusDinfoclick, onReserverClick,onAnnulerClick ,id}) => {
  const initialValue = dayjs('2023-04-17');
  const [isLoading, setIsLoading] = React.useState(false);
  const [statusMessage, setStatusMessage] = React.useState('');
  const [value, setValue] = React.useState(dayjs('2022-04-17T15:30'));
  const [value1, setValue1] = React.useState(dayjs('2022-04-17T15:30'));
  const [selectedDate, setSelectedDate] = useState(initialValue);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleConfirmClick = async () => {
    const rdvData = {
      date: selectedDate.toISOString().substr(0, 10),
      heure_debut: value1.toISOString().substr(11, 5),
      heure_fin: value.toISOString().substr(11, 5),
    };
    try {
      const response = await axios.post(`/api/parent/prendre_rdv/${id}`, rdvData, {
        withCredentials: true,
      });
      console.log(response.data);
      setStatusMessage('Rendez-vous pris avec succès');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setIsSmallScreen(window.innerWidth < 670);
    window.addEventListener("resize", () => setIsSmallScreen(window.innerWidth < 670));
  }, []);

  return (
    <div className={`relative flex justify-center  top-4`}>
    <div className={`absolute  h-12 w-[80%] z-10 rounded-xl bg-[#FFB1A6] flex justify-end  ${isSmallScreen ? '' : 'mt-6'}`}>
      <button className='mr-3 ml-4 font-semibold text-white' onClick={onPlusDinfoclick}>Plus d'infos</button>
      <button className='mr-4 ml-3 font-semibold text-white' onClick={onReserverClick}>Reserver</button>
    </div>
    <div className={`absolute ${isSmallScreen ? 'w-[65%]' : 'w-[150vh]'} absolute flex flex-col sm:flex-row justify-center`}>
      <div className={` ${isSmallScreen ? ' w-[100%] mt-[20%]' : 'w-[35%] mt-20 mr-[15vh]'} mb-1 `}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
            value={selectedDate}
            onChange={handleDateChange}
            loading={isLoading}
            renderLoading={() => <DayCalendarSkeleton />}
            className={`${isSmallScreen ? 'w-full' : 'w-[50vh]'}`}
      style={{ width: isSmallScreen ? '100vh' : '100vh', maxWidth: '100%', height: isSmallScreen ? '40%' : '100vh' }}

          />
        </LocalizationProvider>
        <input
          type="text"
          value={selectedDate.format('YYYY-MM-DD')}
          className={` sm:my-0 mx-2 border-2 border-gray-200 rounded-xl px-4 py-2 my-4 ${isSmallScreen ? 'w-[90%] ' : 'w-[80%]  ml-5'}`}
          readOnly
        />  
      </div>
      <div className={`flex justify-center ${isSmallScreen ? ' mt-5' : 'flex-col  mt-[20vh]'}`} >
        <div className={` w-[100%]`}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimeField
              label="Heure Debut rendez-vous"
              value={value1}
              onChange={(newValue) => setValue1(newValue)}
              format="HH:mm"
            />
          </LocalizationProvider>
          <div className='h-6'></div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimeField
              label="Heure Fin rendez-vous"
              value={value}
              onChange={(newValue) => setValue(newValue)}
              format="HH:mm"
            />
          </LocalizationProvider>
        </div>
        </div>
    </div>
    <div className={`flex justify-start ${isSmallScreen ? 'mt-[130vh]' : 'mt-[74vh] ml-[45%]'}`}>
      <button
        className={`bg-[#FFB1A6] rounded-2xl mr-10 ${isSmallScreen ? 'w-[20vh] ' : 'w-[16vh]'} h-8`} onClick={handleConfirmClick}>
        Confirmer
      </button>
        <button className={`border border-black rounded-2xl ${isSmallScreen ? 'w-[20vh]' : 'w-[16vh]'} h-8 z-10`}  onClick={onAnnulerClick}>Annuler</button>
      </div>
    </div>
  );

};


export default RendezVous;