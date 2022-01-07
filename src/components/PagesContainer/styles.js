import styled from "styled-components";

const PagesContainerStyle = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    height: 90vh;

    > div {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        > img {
            width: 67%;
        }
    }
    
    > div + div {
        @media(max-width: 992px) {
            display: none;
        }
    }
`;

export default PagesContainerStyle;