/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState, useEffect } from 'react';

import Header from "../components/Header";
import Aside from "../components/Aside";
import ContainerMain from "../components/ContainerMain";

import InformationContainer from '../styles/pages/home';

import api from "../services/api/serverApi";

import auth from "../services/auth";

const Home = ({ data }) => {

    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        let mounted = true;
        setExpenses(data);
        return () => mounted = false;
    }, [data, expenses]);

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

    const { redirect } = auth(context);

    if(redirect)
        return redirect;

    const fetch = await api(context)
                    .get("/expenses")
                    .then(({ data }) => data)
                    .catch(({ response }) =>
                        response === undefined 
                        ? "Erro no servidor, as informações não podem ser apresentadas" : response
                    );

    const data = await fetch.response;

    return {
          props: {
              data
          }
      }
}

export default Home;