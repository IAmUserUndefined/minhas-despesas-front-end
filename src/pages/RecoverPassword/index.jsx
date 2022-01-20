import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import PagesContainer from "../../components/PagesContainer/index";
import Form from "../../styles/form";
import TitleForm from "../../components/FormTitle/index";
import FormInput from "../../components/FormInput/index";
import Button from "../../components/Button/index";
import LoadingGif from "../../components/LoadingGif/index";

import api from "../../services/api";

import isPasswordValid from "../../utils/isPasswordValid";

import { useModal } from "../../providers/ModalProvider";

const RecoverPassword = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const handleLink = (link) => navigate(link);
  const { handleShowModal } = useModal();
  const [formValues, setFormValues] = useState({});
  const [buttonChildren, setButtonChildren] = useState("Atualizar Senha");

  const handleRecoverPassword = async (e) => {
    e.preventDefault();

    const { password, passwordConfirm } = e.target;

    if (!password.value || !passwordConfirm.value)
      return handleShowModal("Preencha todos os campos");

    const { result, message } = isPasswordValid(password.value);

    if (!result) return handleShowModal(message);

    setButtonChildren(<LoadingGif />);

    await api
      .patch(`/user/password/password-recover${search}`, {
        password: password.value,
        passwordConfirm: passwordConfirm.value,
      })
      .then(({ data }) => {
        setFormValues({});
        handleShowModal(data.response);
        handleLink("/");
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
  
export default RecoverPassword;