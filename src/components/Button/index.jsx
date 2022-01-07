import React from 'react';

import ButtonStyle from './styles';

const Button = ({ children, onClick }) => {
    return ( 
        <>
            <div>
                <ButtonStyle onClick={onClick} type="button">
                    {children}
                </ButtonStyle>
            </div>
        </>
     );
}
 
export default Button;