import React from "react";
import { CgClose } from "react-icons/cg";

import { ModalContainer, ModalStyle } from "./styles";

import { useModal } from "../../providers/ModalProvider";

const Modal = () => {
  const { message, display, handleCloseModal } = useModal();

  return (
    <ModalContainer onClick={handleCloseModal} display={display}>
      <ModalStyle id="modal">
        <button onClick={handleCloseModal}>
          <CgClose />
        </button>
        <h3 id="message">{message}</h3>
      </ModalStyle>
    </ModalContainer>
  );
};

export default Modal;