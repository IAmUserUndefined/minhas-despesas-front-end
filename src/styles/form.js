import styled from "styled-components";

const Form = styled.form`
    width: 100%;
    padding: 1rem;
    text-align: center;

    > h2 {
        font-size: 2.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;

        > div {
            margin-left: 10px;
        }
    }

    > div, h2 {
        margin-bottom: 1.5rem;
    }
`;

export default Form;