/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Header from "../components/Header";
import Aside from "../components/Aside";
import ContainerMain from "../components/ContainerMain";

import { Table, UpdateButton, DeleteButton } from "../styles/pages/expenses";

import api from "../services/api/clientApi";

import { useModal } from "../providers/ModalProvider";

import auth from "../services/auth";

const Expenses = () => {
    const { handleShowModal } = useModal();
    const [expenses, setExpenses] = useState([]);
    const router = useRouter();

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

    const handleExpenseDeletion = async (expenseId) => {
      await api
        .delete(`/expenses/delete/${expenseId}`)
        .catch(({ response }) =>
          response
            ? handleShowModal(response.data.response)
            : handleShowModal("Erro no Servidor")
        );
    };

    const handleUpdateExpense = (id, expenseName, dueDate, price) => {
      router.push(`/update-expense?id=${id}&expenseName=${expenseName}&dueDate=${dueDate.split("T")[0]}&price=${price}`);
    }
    
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
                          <td>
                            <UpdateButton onClick={() => handleUpdateExpense(expense._id, expense.expenseName, expense.dueDate, expense.price)}>
                              Atualizar
                            </UpdateButton>
                          </td>
                          <td><DeleteButton onClick={() => handleExpenseDeletion(expense._id)}>Excluir</DeleteButton></td>
                        </tr>
                      ))}
                    </tbody>
                </Table>
            </ContainerMain>
        </>
     );
}

export const getServerSideProps = async (context) => auth(context);

export default Expenses;