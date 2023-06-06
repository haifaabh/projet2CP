import { FiUser, FiLogOut } from "react-icons/fi";
import { BsFillHouseFill } from 'react-icons/bs';
import { BsCalendar2Date } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

export const datas = [
    {
        id: 1,
        icon: <FiUser />,
        text: "Mon Compte",
        link: "/compteRespo",
    },
    {
        id: 2,
        icon: <BsFillHouseFill />,
        text: "Ma crèche",
        link : "/maCreche",
    },
    {
        id: 3,
        icon: <IoNotificationsOutline />,
        text: "Mes rendez-vous en attente",
        link : "/rdvsAttente",
    },
    {
        id: 4,
        icon: <IoNotificationsOutline />,
        text: "Mes rendez-vous acceptés",
        link : "/afficherRdv",
    },
    {
        id: 5,
        icon: <IoNotificationsOutline />,
        text: "Mes réservations en attente",
        link : "/rsvsAttente",
    },
    {
        id: 6,
        icon: <IoNotificationsOutline />,
        text: "Mes réservations acceptées",
        link : "/afficherRsv",
    },

];