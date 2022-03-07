import React, { useEffect } from "react";
import { useRouter } from 'next/router';

import VerifyEmailTitle from "../components/VerifyEmailTitle/index";

import api from "../services/api/clientApi";

import { useModal } from "../providers/ModalProvider";

import redirect from "../services/redirect";

const VerifyEmail = () => {
  const { handleShowModal } = useModal();
  const router = useRouter();
  const [, query] = router.asPath.split("?");

  useEffect(() => {
    const handleVerifyEmail = async () => {
      await api
        .post(`/verify-email?${query}`)
        .then(({ data }) => handleShowModal(data.response))
        .catch(({ response }) =>
          response
            ? handleShowModal(response.data.response)
            : handleShowModal("Erro no Servidor")
        );
    };
    handleVerifyEmail();
    router.push("/");
  });

    return ( 
        <>
            <VerifyEmailTitle />
        </>
     );
}
 
export const getServerSideProps = (context) => redirect(context);

export default VerifyEmail;