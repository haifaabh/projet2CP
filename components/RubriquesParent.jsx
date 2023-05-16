import { FiUser, FiLogOut} from "react-icons/fi";
import ChildCareOutlinedIcon from '@mui/icons-material/ChildCareOutlined';
import { BsCalendar2Date } from "react-icons/bs";
import {IoNotificationsOutline} from "react-icons/io5";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

export const datas = [
{
id: 1,
icon: <FiUser />,
text: "Mon Compte",
},
{
id: 2,
icon: <ChildCareOutlinedIcon />,
text: "Mes enfants",
},
{
id: 3,
icon: <BsCalendar2Date/>,
text: "Mes rendez-vous",
},
{
id: 4,
icon: <ArticleOutlinedIcon/>,
text: "Mes Reservations",
},
    {
    id: 5,
    icon: <ErrorOutlineOutlinedIcon />,
    text: "Signaler un problème",
    },
    ];