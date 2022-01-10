import React, { useState } from 'react';

import Header from "../../components/Header";
import Aside from "../../components/Aside";
import ContainerMain from "../../components/ContainerMain";
import Form from "../../styles/form";
import FormInput from "../../components/FormInput/index";
import Button from "../../components/Button/index";
import LoadingGif from "../../components/LoadingGif/index";

import api from "../../services/api";

import { useModal } from "../../providers/ModalProvider";

const RegisterExpense = () => {
    const { handleShowModal } = useModal();
    const [buttonChildren, setButtonChildren] = useState("Cadastrar Despesa");
  
    const handleRegisterExpense = async () => {
      setButtonChildren(<LoadingGif />);
  
      const form = document.forms.expense;
  
      let { expenseName, dueDate, price } = form;
  
      if (!expenseName.value || !dueDate.value || !price.value) {
        setButtonChildren("Cadastrar Despesa");
        return handleShowModal("Preencha todos os campos");
      }
  
      await api
        .post("/expenses", {
          expenseName: expenseName.value,
          dueDate: dueDate.value,
          price: price.value,
        })
        .then(({ data }) => {
          expenseName.value = "";
          dueDate.value = "";
          price.value = "";
          handleShowModal(data.response);
        })
        .catch(({ response }) =>
          response
            ? handleShowModal(response.data.response)
            : handleShowModal("Erro no Servidor")
        );
  
      expenseName.value = "";
      dueDate.value = "";
      price.value = "";
  
      setButtonChildren("Cadastrar Despesa");
    };

    return ( 
        <>
            <Header />
            <Aside />
            <ContainerMain>
                <Form name="expense">
                            
                    <FormInput type="text" placeholder="Nome" name="expenseName" />
                    <FormInput type="date" placeholder="Data de Vencimento" name="dueDate" />
                    <FormInput type="number" placeholder="Preço" min="0" name="price" />

                    <Button onClick={() => handleRegisterExpense()}>{buttonChildren}</Button>

                </Form>
            </ContainerMain>
        </>
     );
}
 
export default RegisterExpense;