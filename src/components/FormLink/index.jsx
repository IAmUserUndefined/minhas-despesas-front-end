import React from 'react';
import { useNavigate } from 'react-router-dom';

import FormLinkStyle from './styles';

const FormLink = ( { link, children } ) => {
    const navigate = useNavigate();

    const handleLink = (link) => navigate(link);

    return ( 
        <>
            <div>
                <FormLinkStyle onClick={() => handleLink(link)}>
                    { children }
                </FormLinkStyle>
            </div>
        </>
     );
}
 
export default FormLink;