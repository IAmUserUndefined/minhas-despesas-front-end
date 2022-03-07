import React, { useState } from "react";
import { useRouter } from "next/router";

import PagesContainer from "../components/PagesContainer/index";
import TitleForm from "../components/FormTitle/index";
import FormInput from "../components/FormInput/index";
import Button from "../components/Button/index";
import LoadingGif from "../components/LoadingGif/index";

import Form from "../styles/form";

import api from "../services/api/clientApi";

import isPasswordValid from "../utils/isPasswordValid";

import { useModal } from "../providers/ModalProvider";

import redirect from "../services/redirect";

const RecoverPassword = () => {
  const { handleShowModal } = useModal();
  const [formValues, setFormValues] = useState({});
  const [buttonChildren, setButtonChildren] = useState("Atualizar Senha");
  const router = useRouter();
  const [, query] = router.asPath.split("?");

  const handleRecoverPassword = async (e) => {
    e.preventDefault();

    const { password, passwordConfirm } = e.target;

    if (!password.value || !passwordConfirm.value)
      return handleShowModal("Preencha todos os campos");

    const { result, message } = isPasswordValid(password.value);

    if (!result) return handleShowModal(message);

    setButtonChildren(<LoadingGif />);

    await api
      .patch(`/user/password/password-recover?${query}`, {
        password: password.value,
        passwordConfirm: passwordConfirm.value,
      })
      .then(({ data }) => {
        setFormValues({});
        handleShowModal(data.response);
        router.push("/");
      })
      .catch(({ response }) =>
        response
          ? handleShowModal(response.data.response)
          : handleShowModal("Erro no Servidor")
      );

    setButtonChildren("Atualizar Senha");
  };
  
    return (
      <>
        <PagesContainer>
          <Form onSubmit={handleRecoverPassword}>

            <TitleForm>
                Recuperação de Senha
            </TitleForm>

              <FormInput
                  type="password"
                  placeholder="Nova Senha"
                  name="password"
                  formValues={formValues}
                  setFormValues={setFormValues}
              />
  
              <FormInput
                type="password"
                placeholder="Confirmação de Nova Senha"
                name="passwordConfirm"
                formValues={formValues}
                setFormValues={setFormValues}
              />
  
            <Button type="submit">
              {buttonChildren}
            </Button>
  
          </Form>
        </PagesContainer>
      </>
    );
  };

export const getServerSideProps = (context) => redirect(context);
  
export default RecoverPassword;