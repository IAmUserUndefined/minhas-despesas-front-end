import React from 'react';

import FormInputStyle from './styles';

const FormInput = ( { type, name, placeholder, value, onChange } ) => {
    return ( 
        <>
            <div>
                <FormInputStyle type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} />
            </div>
        </>
     );
}
 
export default FormInput;