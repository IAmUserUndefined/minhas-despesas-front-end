import styled from "styled-components";

export const ContainerHeader = styled.header`
    background-color: #333;
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0;
    width: 100%;

    > div h1 {
        color: #fff;
        background-color: #000;
        width: 300px;
        padding: .8rem;
        font-size: 1.4rem;
        display: flex;
        justify-content: center;

        @media (max-width: 786px) {
            width: 230px;
        }
    }
`;

export const IconMenu = styled.div`
        display: none;
        cursor: pointer;
        padding: 7px;
        
        > svg {
            width: 40px;
            height: 40px;
            color: #fff;
        }
        
        @media (max-width: 768px) {
            display: block;

            > svg {
                width: 35px;
                height: 35px;
            }
        }
`;