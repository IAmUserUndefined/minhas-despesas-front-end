import React, { useState } from "react";

import PrivateRoute from "../components/PrivateRoute";
import Header from "../components/Header";
import Aside from "../components/Aside";
import ContainerMain from "../components/ContainerMain";
import FormInput from "../components/FormInput/index";
import Button from "../components/Button/index";
import LoadingGif from "../components/LoadingGif/index";

import Form from "../styles/form";

import api from "../services/api/clientApi";

import { useModal } from "../providers/ModalProvider";

const RegisterExpense = () => {
  const { handleShowModal } = useModal();
  const [formValues, setFormValues] = useState({});
  const [buttonChildren, setButtonChildren] = useState("Cadastrar Despesa");

  const handleRegisterExpense = async (e) => {
    e.preventDefault();
    
    const { expenseName, dueDate, price } = e.target;

    if (!expenseName.value || !dueDate.value || !price.value)
      return handleShowModal("Preencha todos os campos");

    setButtonChildren(<LoadingGif />);

    await api
      .post("/expenses", {
        expenseName: expenseName.value,
        dueDate: dueDate.value,
        price: price.value,
      })
      .then(({ data }) => {
        setFormValues({});
        handleShowModal(data.response);
      })
      .catch(({ response }) =>
        response
          ? handleShowModal(response.data.response)
          : handleShowModal("Erro no Servidor")
      );

    setButtonChildren("Cadastrar Despesa");
  };

  return (
    <>
      <Header />
      <Aside />
      <ContainerMain>
        <Form onSubmit={handleRegisterExpense}>
          <FormInput
            type="text"
            placeholder="Nome"
            name="expenseName"
            formValues={formValues}
            setFormValues={setFormValues}
          />
          <FormInput
            type="date"
            placeholder="Data de Vencimento"
            name="dueDate"
            formValues={formValues}
            setFormValues={setFormValues}
          />
          <FormInput 
            type="number" 
            placeholder="Preço" 
            min="0" 
            name="price" 
            formValues={formValues}
            setFormValues={setFormValues}
          />

          <Button type="submit">
            {buttonChildren}
          </Button>
        </Form>
      </ContainerMain>
    </>
  );
};

export default PrivateRoute(RegisterExpense);