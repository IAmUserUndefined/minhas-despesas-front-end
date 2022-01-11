/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';

import Header from "../../components/Header";
import Aside from "../../components/Aside";
import ContainerMain from "../../components/ContainerMain";

import InformationContainer from './styles';

import api from "../../services/api";

import { useModal } from "../../providers/ModalProvider";

const Home = () => {

    const { handleShowModal } = useModal();
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        let mounted = true;
    
        const fetchExpenses = async () => {
          await api
            .get("/expenses")
            .then(({ data }) => (mounted ? setExpenses(data.response) : null))
            .catch(({ response }) =>
              response === undefined ? handleShowModal("Erro no servidor, as informações não pode ser apresentadas") : null
            );
        };
    
        fetchExpenses();
    
        return () => mounted = false;
      }, [expenses]);

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
 
export default Home;