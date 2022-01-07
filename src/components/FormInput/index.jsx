import React from 'react';

import FormInputStyle from './styles';

const FormInput = ( { type, name, placeholder } ) => {
    return ( 
        <>
            <div>
                <FormInputStyle type={type} name={name} placeholder={placeholder} />
            </div>
        </>
     );
}
 
export default FormInput;