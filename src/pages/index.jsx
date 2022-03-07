import React from "react";

import Header from "../components/Header";
import PagesContainer from "../components/PagesContainer";
import TitleForm from "../components/FormTitle";
import FormInput from "../components/FormInput";
import FormLink from "../components/FormLink";
import Button from "../components/Button";

import { useAuth } from "../providers/AuthProvider";

import Form from "../styles/form";

import redirect from "../services/redirect";

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

export const getServerSideProps = (context) => redirect(context);

export default Login;