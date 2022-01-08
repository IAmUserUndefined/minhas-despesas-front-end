import React from 'react';

import ContainerMainStyle from "./styles";

const ContainerMain = ( { children } ) => {
    return ( 
        <>
            <ContainerMainStyle>
                {children}
            </ContainerMainStyle>
        </>
     );
}
 
export default ContainerMain;