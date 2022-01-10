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

import { useModal } from "../../providers/ModalProvider";

const ForgetPassword = () => {

  const [buttonChildren, setButtonChildren] = useState("Enviar Email");
  const { handleShowModal } = useModal();

  const handleForgetPassword = async () => {
    setButtonChildren(<LoadingGif />);

    const form = document.forms.forgetPassword;

    let { email } = form;

    if (!email.value) {
      setButtonChildren("Enviar Email");
      return handleShowModal("Preencha o campo de email");
    }

    if (!isEmailValid(email.value)) {
      setButtonChildren("Enviar Email");
      email.value = "";
      return handleShowModal("Coloque um email válido");
    }

    await api
      .post("/user/password/send-token-password-recover", {
        email: email.value,
      })
      .then(({ data }) => {
        handleShowModal(data.response);
      })
      .catch(({ response }) =>
        response
          ? handleShowModal(response.data.response)
          : handleShowModal("Erro no Servidor")
      );

    email.value = "";

    setButtonChildren("Enviar Email");
  };
  
    return (
      <>
        <PagesContainer>
          <Form name="forgetPassword">
            <TitleForm>
                Esqueci Minha Senha
            </TitleForm>
  
            <FormInput type="email" name="email" placeholder="Email" />
  
            <Button onClick={() => handleForgetPassword()}>
              {buttonChildren}
            </Button>
  
            <FormLink link="/">Lembrou sua senha?</FormLink>
          </Form>
        </PagesContainer>
      </>
    );
  };
  
export default ForgetPassword;