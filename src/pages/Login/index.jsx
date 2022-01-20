import React from "react";

import PagesContainer from "../../components/PagesContainer/index";
import Form from "../../styles/form";
import TitleForm from "../../components/FormTitle/index";
import FormInput from "../../components/FormInput/index";
import FormLink from "../../components/FormLink/index";
import Button from "../../components/Button/index";

import { useAuth } from "../../providers/AuthProvider";

const Login = () => {

  const { handleLogin, buttonChildren, formValues, setFormValues } = useAuth();

  return (
    <>
      <PagesContainer>
        <Form onSubmit={handleLogin}>
          
          <TitleForm>
            Login
          </TitleForm>

          <FormInput type="email" name="email" placeholder="Email" formValues={formValues} setFormValues={setFormValues} />

          <FormInput type="password" name="password" placeholder="Senha" formValues={formValues} setFormValues={setFormValues} />

          <Button type="submit">
            {buttonChildren}
          </Button>

          <FormLink link="/register">Ainda não tem um cadastro?</FormLink>
          <FormLink link="/forget-password">Esqueceu sua senha?</FormLink>
        </Form>
      </PagesContainer>
    </>
  );
};

export default Login;