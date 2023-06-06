import React from "react";
import { useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import SidebarContent from "./SidebarContent";

const Sidebar = () => {
    const [toggle, setToggle] = useState(false);
    return (
        <div className={`bg-[#99BFE4] rounded-2xl mb-2 ml-2 mt-2 border transition-all duration-500 border-solid border-gray-300 relative ${toggle ? "w-[4.2rem]" : " w-[17rem]"}`}>
            <SidebarContent toggle={toggle} />
            <div className="absolute top-[7rem] flex justify-center items-center -left-5 w-8 h-8 bg-white rounded-full cursor-pointer" onClick={() => {
                setToggle(!toggle);
            }}>
                <BiChevronLeft className={`text-3xl transition-all duration-300 ${toggle ? "rotate-180" : ""}`} />
            </div>
        </div>
    );
}
export default Sidebar;