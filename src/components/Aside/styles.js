import styled from "styled-components";

const ContainerAside = styled.aside`
    background-color: #f0f0f5;
    font-weight: 800;
    position: fixed;
    top: 53px;
    left: 0;
    width: 300px;
    height: 100vh;
    padding: 1rem;

    @media (max-width: 786px) {
        width: 100%;
        left: ${({ left }) => `${left}`};
        transition: all 0.7s;
    }

    > ul {
        margin-top: 1rem;
    }

    > ul li {
        cursor: pointer;
        list-style: none;
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;
        font-size: 1.1rem;

        > a {
            color: #000;
            text-decoration: none;
        }
    }

    > ul li svg {
        width: 22px;
        height: 22px;
        margin-right: 10px;
    }
`;

export default ContainerAside;