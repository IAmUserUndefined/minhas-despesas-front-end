import React from 'react';

import FormInputStyle from './styles';

const FormInput = ({ formValues, setFormValues, type, placeholder, name }) => {

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    };
  
    return (
      <>
        <div>
          <FormInputStyle 
            type={type}
            placeholder={placeholder} 
            name={name} 
            onChange={handleInputChange} 
            value={formValues[name] || ""}
          />
        </div>
      </>
    );
  };
  
  export default FormInput;
