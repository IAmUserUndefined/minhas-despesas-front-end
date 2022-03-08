/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';

import Header from "../components/Header";
import Aside from "../components/Aside";
import ContainerMain from "../components/ContainerMain";

import InformationContainer from '../styles/pages/home';

import api from "../services/api/serverApi";

import auth from "../services/auth";

const Home = ({ expenses }) => {

    const handleTotalPrice = () => {
        let price = 0;

        expenses.map((expense) => ( 
              price += expense.price
        ));

        return price;
    }

    const handleDueExpense = () => {
        let dueExpense = 0;

        expenses.map((expense) => (
            Date.now() > Date.parse(expense.dueDate) ? dueExpense++ : null
        ));

        return dueExpense;
    }

    return ( 
        <>
            <Header />
            <Aside />
            <ContainerMain>
                <InformationContainer>
                    <h2>Total de Despesas</h2>
                    <span>{expenses.length}</span>
                </InformationContainer>
                <InformationContainer>
                    <h2>Total à Pagar</h2>
                    <span>R$ {handleTotalPrice()}</span>
                </InformationContainer>
                <InformationContainer>
                    <h2>Despesas Vencidas</h2>
                    <span>{handleDueExpense()}</span>
                </InformationContainer>
            </ContainerMain>
        </>
     );
}

export const getServerSideProps = async (context) => {

    if(auth(context))
        return auth(context);

    const fetch = await api(context)
                    .get("/expenses")
                    .then(({ data }) => data);

    const data = await fetch.response;

    return {
            props: {
                expenses: data
            }
        }
}

export default Home;