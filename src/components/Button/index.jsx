import React from "react";

import ButtonStyle from "./styles";

const Button = ({ children, onClick, type }) => {
  return (
    <div>
        <ButtonStyle onClick={onClick} type={type || "button"}>
          {children}
        </ButtonStyle>
    </div>
  );
};

export default Button;