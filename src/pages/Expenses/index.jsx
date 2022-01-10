import React from 'react';

import Header from "../../components/Header";
import Aside from "../../components/Aside";
import ContainerMain from "../../components/ContainerMain";

import { Table, UpdateButton, DeleteButton } from "./styles";

const Expenses = () => {
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
                        <tr>
                            <td>Luz</td>
                            <td>09/10/2022</td>
                            <td>R$ 350,00</td>
                            <td><UpdateButton>Atualizar</UpdateButton></td>
                            <td><DeleteButton>Excluir</DeleteButton></td>
                        </tr>

                        <tr>
                            <td>Luz</td>
                            <td>09/10/2022</td>
                            <td>R$ 350,00</td>
                            <td><UpdateButton>Atualizar</UpdateButton></td>
                            <td><DeleteButton>Excluir</DeleteButton></td>
                        </tr>

                        <tr>
                            <td>Luz</td>
                            <td>09/10/2022</td>
                            <td>R$ 350,00</td>
                            <td><UpdateButton>Atualizar</UpdateButton></td>
                            <td><DeleteButton>Excluir</DeleteButton></td>
                        </tr>
                    </tbody>
                </Table>
            </ContainerMain>
        </>
     );
}
 
export default Expenses;