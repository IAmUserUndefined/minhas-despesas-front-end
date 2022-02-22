import React from 'react';

import PagesContainerStyle from './styles';

import BannerImage from "../../assets/images/banner.svg";

const PagesContainer = ( { children } ) => {
    return ( 
        <>
            <PagesContainerStyle>
                <div>
                    { children }
                </div>

                <div>
                    <img src={BannerImage} alt="Ilustração de uma mão com um saco de dinheiro" />
                </div>
            </PagesContainerStyle>
        </>
     );
}
 
export default PagesContainer;