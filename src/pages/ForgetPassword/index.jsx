import Header from "../../components/Header/index"
import PagesContainer from "../../components/PagesContainer/index";
import Form from "../../styles/form";
import TitleForm from "../../components/FormTitle/index";
import FormInput from "../../components/FormInput/index";
import FormLink from "../../components/FormLink/index";
import Button from "../../components/Button/index";

const ForgetPassword = () => {
  
    return (
      <>
        <Header />
        <PagesContainer>
          <Form name="forgetPassword">
            <TitleForm>
                Esqueci Minha Senha
            </TitleForm>
  
            <FormInput type="email" name="email" placeholder="Email" />
  
            <Button>
              Enviar
            </Button>
  
            <FormLink link="/">Lembrou sua senha?</FormLink>
          </Form>
        </PagesContainer>
      </>
    );
  };
  
export default ForgetPassword;