import React from 'react';

import Header from "../../components/Header";
import Aside from "../../components/Aside";
import ContainerMain from "../../components/ContainerMain";
import Form from "../../styles/form";
import FormInput from "../../components/FormInput/index";
import Button from "../../components/Button/index";

const RegisterExpense = () => {
    return ( 
        <>
            <Header />
            <Aside />
            <ContainerMain>
                <Form name="expense">
                            
                    <FormInput type="text" placeholder="Nome" name="expenseName" />
                    <FormInput type="date" placeholder="Data de Vencimento" name="dueDate" />
                    <FormInput type="number" placeholder="Preço" min="0" name="price" />

                    <Button>Cadastrar Despesa</Button>

                </Form>
            </ContainerMain>
        </>
     );
}
 
export default RegisterExpense;