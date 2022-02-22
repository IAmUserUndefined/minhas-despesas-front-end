import React from 'react';

import FormTitleContainer from './styles';

import LogoImage from "../../assets/images/logo.svg";

const FormTitle = ( { children } ) => {
    return ( 
        <>
            <FormTitleContainer>
                <h2>{children}</h2>
                <img src={LogoImage} alt="Saco de Dinheiro" style={ { width: "70px" } } />
            </FormTitleContainer>
        </>
     );
}
 
export default FormTitle;