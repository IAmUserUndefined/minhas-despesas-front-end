import React from 'react';

import Header from "../../components/Header";
import Aside from "../../components/Aside";
import ContainerMain from "../../components/ContainerMain";

import InformationContainer from './styles';

const Home = () => {
    return ( 
        <>
            <Header />
            <Aside />
            <ContainerMain>
                <InformationContainer>
                    <h2>Total de Despesas</h2>
                    <span>8</span>
                </InformationContainer>
                <InformationContainer>
                    <h2>Total à Pagar</h2>
                    <span>R$ 500</span>
                </InformationContainer>
                <InformationContainer>
                    <h2>Despesas Vencidas</h2>
                    <span>2</span>
                </InformationContainer>
            </ContainerMain>
        </>
     );
}
 
export default Home;