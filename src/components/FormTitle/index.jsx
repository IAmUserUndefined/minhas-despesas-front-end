import React from 'react';

import FormTitleContainer from './styles';

const FormTitle = ( { children } ) => {
    return ( 
        <>
            <FormTitleContainer>
                <h2>{children}</h2>
                <img src="images/logo.svg" alt="Saco de Dinheiro" style={ { width: "70px" } } />
            </FormTitleContainer>
        </>
     );
}
 
export default FormTitle;