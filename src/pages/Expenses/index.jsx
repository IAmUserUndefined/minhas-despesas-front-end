/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';

import Header from "../../components/Header";
import Aside from "../../components/Aside";
import ContainerMain from "../../components/ContainerMain";

import { Table, UpdateButton, DeleteButton } from "./styles";

import api from "../../services/api";

import { useModal } from "../../providers/ModalProvider";

const Expenses = () => {

    const { handleShowModal } = useModal();
    const [expenses, setExpenses] = useState([]);

    const handleTaskDeletion = async (expenseId) => {
      await api
        .delete(`/expenses/delete/${expenseId}`)
        .catch(({ response }) =>
          response
            ? handleShowModal(response.data.response)
            : handleShowModal("Erro no Servidor")
        );
    };

    useEffect(() => {
        let mounted = true;
    
        const fetchExpenses = async () => {
          await api
            .get("/expenses")
            .then(({ data }) => (mounted ? setExpenses(data.response) : null))
            .catch(({ response }) =>
              response === undefined ? handleShowModal("Erro no servidor, as despesas não pode ser apresentadas") : null
            );
        };
    
        fetchExpenses();
    
        return () => mounted = false;
      }, [expenses]);

    return ( 
        <>
            <Header />
            <Aside />
            <ContainerMain>
                <Table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Data de Vencimento</th>
                            <th>Preço</th>
                            <th>Atualizar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                    {expenses.map((expense) => ( 
                            <tr key={expense._id}>
                                <td>{expense.expenseName}</td>
                                <td>{new Date(expense.dueDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</td>
                                <td>{`R$ ${expense.price}`}</td>
                                <td><UpdateButton>Atualizar</UpdateButton></td>
                                <td><DeleteButton onClick={() => handleTaskDeletion(expense._id)}>Excluir</DeleteButton></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </ContainerMain>
        </>
     );
}
 
export default Expenses;