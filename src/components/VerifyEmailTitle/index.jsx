import React from 'react';

import PaddingContainer from "../../components/PaddingContainer/index";
import LoadingBigGif from "../../components/LoadingBigGif/index";

import VerifyEmailTitleContainer from './style';

const VerifyEmailTitle = () => {
    return ( 
        <>
            <PaddingContainer>
                <VerifyEmailTitleContainer>
                    <div>
                        <h1>Verificando Email</h1>
                    </div>
                    <LoadingBigGif />
                </VerifyEmailTitleContainer>
            </PaddingContainer>
        </>
     );
}
 
export default VerifyEmailTitle;