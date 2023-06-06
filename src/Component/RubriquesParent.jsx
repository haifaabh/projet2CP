import { FiUser, FiLogOut } from "react-icons/fi";
import ChildCareOutlinedIcon from '@mui/icons-material/ChildCareOutlined';
import { BsCalendar2Date } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

export const datas = [
    {
        id: 1,
        text: "",
    },
    {
        id: 2,
        icon: <FiUser />,
        text: "Mon Compte",
        link : "/compte",
    },
    {
        id: 3,
        icon: <ChildCareOutlinedIcon />,
        text: "Mes enfants",
        link : "/enfants",
    },
    {
        id: 4,
        icon: <BsCalendar2Date />,
        text: "Mes rendez-vous",
        link : "/mesRendezvous",
    },
    {
        id: 5,
        icon: <IoNotificationsOutline />,
        text: "Mes réseravtions",
        link : "/mesReservations",
    },
    {
        id: 6,
        text: "",
    },
    {
        id: 7,
        text: "",
    },
    {
        id: 8,
        text: "",
    },
];