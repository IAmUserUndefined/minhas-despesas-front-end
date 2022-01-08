import styled from "styled-components";

const ContainerMainStyle = styled.main`
    width: calc(100% - 300px);
    padding: 1rem;
    margin: 3rem 0 0 300px;
    display: flex;
    justify-content: center;
    flex-direction: column;

    @media(max-width: 786px) {
        width: 100%;
        margin-left: 0;
    }
`;

export default ContainerMainStyle;