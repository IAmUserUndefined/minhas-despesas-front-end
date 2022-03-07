import React from 'react';

import FormTitleContainer from './styles';
import Image from 'next/image';

const FormTitle = ( { children } ) => {
    return ( 
        <>
            <FormTitleContainer>
                <h2>{children}</h2>
                <Image src="/images/logo.svg" alt="Saco de Dinheiro" width={70} height={70} />
            </FormTitleContainer>
        </>
     );
}
 
export default FormTitle;