import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';

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

const UpdateExpense = () => {
  const { handleShowModal } = useModal();
  const { query } = useRouter();
  const { id, expenseName, dueDate, price } = query;
  const [buttonChildren, setButtonChildren] = useState("Atualizar Despesa");
  const [formValues, setFormValues] = useState({
    expenseName: expenseName,
    dueDate: dueDate,
    price: price
  });
  const router = useRouter();

  const handleUpdateExpense = async (e) => {
    e.preventDefault();
    
    const { expenseName, dueDate, price } = e.target;

    if (!expenseName.value || !dueDate.value || !price.value)
      return handleShowModal("Preencha todos os campos");

    setButtonChildren(<LoadingGif />);

    await api
      .put(`/expenses/update/${id}`, {
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

    setButtonChildren("Atualizar Despesa");
    router.push("/expenses");

  };

  return (
    <>
      <Header />
      <Aside />
      <ContainerMain>
        <Form onSubmit={handleUpdateExpense}>

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

export default PrivateRoute(UpdateExpense);