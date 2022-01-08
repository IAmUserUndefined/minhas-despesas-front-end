import styled from "styled-components";

const LoadingBigGifStyle = styled.div`
  @keyframes loading {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  display: flex;
  justify-content: center;
  border: 1.5rem solid #000;
  border-top-color: rgba(0, 0, 0, 0.2);
  border-radius: 100px;
  height: 200px;
  width: 200px;
  animation: loading 2s linear infinite;

  @media (max-width: 576px) {
    border: 1.2rem solid #000;
    border-top-color: rgba(0, 0, 0, 0.2);
    height: 150px;
    width: 150px;
  }
`;

export default LoadingBigGifStyle;
