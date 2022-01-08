import styled from "styled-components";

const VerifyEmailTitleContainer = styled.div`
    max-width: 600px;
    margin: 2rem auto 0 auto;
    padding: 2rem;
    background-color: #fff;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;

    > div h1 {
        font-size: 2.5rem;
        font-weight: bold;
    }

    > div + div {
        margin: 3rem auto 0 auto;
    }

`;

export default VerifyEmailTitleContainer;