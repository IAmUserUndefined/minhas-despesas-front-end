import React from 'react';

import { ContainerHeader, IconMenu } from './styles';

import { useMenu } from "../../providers/MenuProvider";

const Header = () => {

    const { icon } = useMenu(); 
    
    return ( 
        <>
            <ContainerHeader>
                <div>
                    <h1>Minhas Despesas</h1>
                </div>
                <IconMenu>
                    {icon}
                </IconMenu>
            </ContainerHeader>
        </>
     );
}
 
export default Header;