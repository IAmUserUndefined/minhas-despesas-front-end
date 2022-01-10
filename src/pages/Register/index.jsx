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
  const [buttonChildren, setButtonChildren] = useState("Cadastrar");

  const handleRegister = async () => {
    setButtonChildren(<LoadingGif />);

    const form = document.forms.register;

    let { email, name, password, passwordConfirm } = form;

    if (!email.value || !name || !password.value || !passwordConfirm.value) {
      setButtonChildren("Cadastrar");
      return handleShowModal("Preencha todos os campos");
    }

    if (!isEmailValid(email.value)) {
      setButtonChildren("Cadastrar");
      email.value = "";
      return handleShowModal("Coloque um email válido");
    }

    const { result, message } = isPasswordValid(password.value);

    if (!result) {
      setButtonChildren("Cadastrar");
      return handleShowModal(message);
    }

    if (password.value !== passwordConfirm.value) {
      setButtonChildren("Cadastrar");
      password.value = "";
      passwordConfirm.value = "";
      return handleShowModal("As senhas não coincidem");
    }

    await api
      .post("/user/create", {
        email: email.value,
        password: password.value,
        passwordConfirm: passwordConfirm.value,
      })
      .then(({ data }) => {
        email.value = "";
        password.value = "";
        passwordConfirm.value = "";
        handleShowModal(data.response);
      })
      .catch(({ response }) =>
        response
          ? handleShowModal(response.data.response)
          : handleShowModal("Erro no Servidor")
      );

    email.value = "";
    password.value = "";
    passwordConfirm.value = "";

    setButtonChildren("Cadastrar");
  };
  
    return (
      <>
        <PagesContainer>
          <Form name="register">
            
            <TitleForm>
              Cadastro
            </TitleForm>

            <FormInput type="email" name="email" placeholder="Email" />
            <FormInput type="password" name="password" placeholder="Senha" />
            <FormInput type="password" name="passwordConfirm" placeholder="Confirmação de Senha" />
  
            <Button onClick={() => handleRegister()}>
              {buttonChildren}
            </Button>
  
            <FormLink link="/">Já tem um cadastro?</FormLink>
          </Form>
        </PagesContainer>
      </>
    );
  };
  
export default Register;