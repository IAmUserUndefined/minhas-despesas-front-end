import React, { createContext, useContext } from 'react';
import hook from "./hooks/useMenu";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const { left, icon, closeMenu } = hook();

    return(
        <MenuContext.Provider value={{ left, icon, closeMenu }}>
            {children}
        </MenuContext.Provider>
    );
}

export const useMenu = () => useContext(MenuContext);