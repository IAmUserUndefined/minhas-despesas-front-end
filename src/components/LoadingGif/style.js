import styled from "styled-components";

const LoadigGifStyle = styled.div`
    @keyframes loading {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    margin: 0 auto;
    border: 3px solid #fff;
    border-radius: 50%;
    border-top-color: #777;
    height: 22px;
    width: 22px;
    animation: loading 2s linear infinite;
`;

export default LoadigGifStyle;