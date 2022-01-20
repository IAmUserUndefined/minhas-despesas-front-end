import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Header from "../../components/Header";
import Aside from "../../components/Aside";
import ContainerMain from "../../components/ContainerMain";
import Form from "../../styles/form";
import FormInput from "../../components/FormInput/index";
import Button from "../../components/Button/index";
import LoadingGif from "../../components/LoadingGif/index";

import api from "../../services/api";

import { useModal } from "../../providers/ModalProvider";

const UpdateExpense = () => {
  const { handleShowModal } = useModal();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const [formValues, setFormValues] = useState({
    expenseName: query.get("expenseName"),
    dueDate: query.get("dueDate"),
    price: query.get("price")
  });
  const [buttonChildren, setButtonChildren] = useState("Atualizar Despesa");
  const navigate = useNavigate();
  const handleLink = () => navigate("/expenses");

  const handleUpdateExpense = async (e) => {
    e.preventDefault();
    
    const { expenseName, dueDate, price } = e.target;

    if (!expenseName.value || !dueDate.value || !price.value)
      return handleShowModal("Preencha todos os campos");

    setButtonChildren(<LoadingGif />);

    await api
      .put(`/expenses/update/${query.get("id")}`, {
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

    handleLink();
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

export default UpdateExpense;