import React, { useState } from 'react';

import { AiOutlineMenu, AiOutlineCloseCircle } from "react-icons/ai";

const useMenu = () => {
    const [left, setLeft] = useState(`${-1000}px`);
    const [icon, setIcon] = useState(<AiOutlineMenu onClick={() => showMenu()} />)
    const showMenu = () => {
        setIcon(<AiOutlineCloseCircle onClick={() => {
            setIcon(<AiOutlineMenu onClick={() => showMenu()} />);
            setLeft(`${-1000}px`);
        }} />);
        setLeft(0);
    };

    const closeMenu = () => {
        setIcon(<AiOutlineMenu onClick={() => showMenu()} />);
        setLeft(`${-1000}px`);
    }

    return { left, icon, closeMenu }
}
 
export default useMenu;