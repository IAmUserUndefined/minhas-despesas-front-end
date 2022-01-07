import styled from "styled-components";

const FormInputStyle = styled.input`
    width: 100%;
    padding: .5rem;
    font-size: 1.1rem;
    border: 2px solid #000;
    border-radius: 5px;

    &:focus{
        box-shadow: 0 0 0 0;
        border: 2px solid #000;
        outline: 0;
    }
`;

export default FormInputStyle;