import React, { useState } from "react";

import PagesContainer from "../components/PagesContainer";
import TitleForm from "../components/FormTitle";
import FormInput from "../components/FormInput";
import FormLink from "../components/FormLink";
import Button from "../components/Button";
import LoadingGif from "../components/LoadingGif";

import Form from "../styles/form";

import api from "../services/api/clientApi";

import isEmailValid from "../utils/isEmailValid";

import { useModal } from "../providers/ModalProvider";

import redirect from "../services/redirect";

const ForgetPassword = () => {

  const [formValues, setFormValues] = useState({});
  const [buttonChildren, setButtonChildren] = useState("Enviar Email");
  const { handleShowModal } = useModal();

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    
    const { email } = e.target;

    if (!email.value) {
      return handleShowModal("Preencha o campo de email");
    }

    if (!isEmailValid(email.value)) {
      return handleShowModal("Coloque um email válido");
    }

    setButtonChildren(<LoadingGif />);

    await api
      .post("/user/password/send-token-password-recover", {
        email: email.value,
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

    setButtonChildren("Enviar Email");
  };
  
    return (
      <>
        <PagesContainer>
          <Form onSubmit={handleForgetPassword}>
            <TitleForm>
                Esqueci Minha Senha
            </TitleForm>
  
            <FormInput type="email" name="email" placeholder="Email" formValues={formValues} setFormValues={setFormValues} />
  
            <Button type="submit">
              {buttonChildren}
            </Button>
  
            <FormLink link="/">Lembrou sua senha?</FormLink>
          </Form>
        </PagesContainer>
      </>
    );
  };
  
export const getServerSideProps = (context) => redirect(context);

export default ForgetPassword;