import { FiUser, FiLogOut} from "react-icons/fi";
import { BsFillHouseFill } from 'react-icons/bs';
import { BsCalendar2Date } from "react-icons/bs";
import {IoNotificationsOutline} from "react-icons/io5";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

export const datas = [
{
id: 1,
icon: <FiUser />,
text: "Mon Compte",
},
{
id: 2,
icon: <BsFillHouseFill />,
text: "Ma crèche",
},
{
id: 3,
icon: <IoNotificationsOutline />,
text: "Notifications",
},
{
id: 4,
icon: <ErrorOutlineOutlinedIcon />,
text: "Signaler un problème",
},
{
id: 5,
icon: <FiLogOut />,
text: "Se déconnecter",
},
];