import React from 'react';
import Link from 'next/link';

import FormLinkStyle from './styles';

const FormLink = ( { link, children } ) => {

    return ( 
        <>
            <div>
                <FormLinkStyle>
                    <Link href={link} passHref>
                        { children }
                    </Link>
                </FormLinkStyle>
            </div>
        </>
     );
}
 
export default FormLink;