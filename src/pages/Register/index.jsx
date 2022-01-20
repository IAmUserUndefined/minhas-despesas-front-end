import React, { useState } from "react";

import PagesContainer from "../../components/PagesContainer/index";
import Form from "../../styles/form";
import TitleForm from "../../components/FormTitle/index";
import FormInput from "../../components/FormInput/index";
import FormLink from "../../components/FormLink/index";
import Button from "../../components/Button/index";
import LoadingGif from "../../components/LoadingGif/index";

import api from "../../services/api";

import isEmailValid from "../../utils/isEmailValid";
import isPasswordValid from "../../utils/isPasswordValid";

import { useModal } from "../../providers/ModalProvider";

const Register = () => {
  const { handleShowModal } = useModal();
  const [formValues, setFormValues] = useState({});
  const [buttonChildren, setButtonChildren] = useState("Cadastrar");

  const handleRegister = async (e) => {
    e.preventDefault();

    const { email, password, passwordConfirm } = e.target;

    if (!email.value || !password.value || !passwordConfirm.value)
      return handleShowModal("Preencha todos os campos");

    if (!isEmailValid(email.value))
      return handleShowModal("Coloque um email válido");

    const { result, message } = isPasswordValid(password.value);

    if (!result) return handleShowModal(message);

    if (password.value !== passwordConfirm.value)
      return handleShowModal("As senhas não coincidem");

    setButtonChildren(<LoadingGif />);

    await api
      .post("/user/create", {
        email: email.value,
        password: password.value,
        passwordConfirm: passwordConfirm.value,
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

    setButtonChildren("Cadastrar");
  };

  return (
    <>
      <PagesContainer>
        <Form onSubmit={handleRegister}>
          <TitleForm>Cadastro</TitleForm>

          <FormInput 
            type="email" 
            name="email" 
            placeholder="Email" 
            formValues={formValues}
            setFormValues={setFormValues}
          />
          <FormInput 
            type="password" 
            name="password"
            placeholder="Senha" 
            formValues={formValues}
            setFormValues={setFormValues}
          />
          <FormInput
            type="password"
            name="passwordConfirm"
            placeholder="Confirmação de Senha"
            formValues={formValues}
            setFormValues={setFormValues}
          />

          <Button type="submit">{buttonChildren}</Button>

          <FormLink link="/">Já tem um cadastro?</FormLink>
        </Form>
      </PagesContainer>
    </>
  );
};

export default Register;