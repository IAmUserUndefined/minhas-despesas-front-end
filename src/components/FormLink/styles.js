import styled from "styled-components";

const FormLinkStyle = styled.div`
    > a {
        font-weight: bold;
        font-size: 1.2rem;
        cursor: pointer;
        color: #000;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
`;

export default FormLinkStyle;