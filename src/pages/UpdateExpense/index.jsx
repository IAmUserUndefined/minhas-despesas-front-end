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
  const [buttonChildren, setButtonChildren] = useState("Atualizar Despesa");
  const [expenseName, setExpenseName] = useState(query.get("expenseName"));
  const [dueDate, setDueDate] = useState(query.get("dueDate"));
  const [price, setPrice] = useState(query.get("price"));
  const navigate = useNavigate();
  const handleLink = () => navigate("/expenses");

  const handleUpdateExpense = async () => {
    setButtonChildren(<LoadingGif />);

    const form = document.forms.expense;

    let { expenseName, dueDate, price } = form;

    if (!expenseName.value || !dueDate.value || !price.value) {
      setButtonChildren("Atualizar Despesa");
      return handleShowModal("Preencha todos os campos");
    }

    await api
      .put(`/expenses/update/${query.get("id")}`, {
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

    setButtonChildren("Atualizar Despesa");

    handleLink();
  };

  const handleInputExpenseName = (e) => {
    setExpenseName(e.target.value);
  };

  const handleInputDueDate = (e) => {
    setDueDate(e.target.value);
  };

  const handleInputPrice = (e) => {
    setPrice(e.target.value);
  };

  return (
    <>
      <Header />
      <Aside />
      <ContainerMain>
        <Form name="expense">

          <FormInput
            type="text"
            placeholder="Nome"
            name="expenseName"
            value={expenseName}
            onChange={handleInputExpenseName}
          />

          <FormInput
            type="date"
            placeholder="Data de Vencimento"
            name="dueDate"
            value={dueDate}
            onChange={handleInputDueDate}
          />
          
          <FormInput
            type="number"
            placeholder="Preço"
            min="0"
            name="price"
            value={price}
            onChange={handleInputPrice}
          />

          <Button onClick={() => handleUpdateExpense()}>
            {buttonChildren}
          </Button>
        </Form>
      </ContainerMain>
    </>
  );
};

export default UpdateExpense;