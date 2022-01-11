import styled from "styled-components";

export const Table = styled.table`
    border-collapse: collapse;
    padding: 1rem;

    > thead tr th, tbody tr td {
        text-align: center;
        font-weight: bold;
        padding: 7px;
        
        @media (max-width: 576px) {
            font-size: .7rem;
        }
    }

    > thead tr th {
        border-bottom: 2px solid #000;
    }

    > tbody tr {
        border: 2px solid #000;
    }

    > tbody tr:nth-child(even) {
        background-color: #fff;
    }

    > tbody tr:nth-child(odd) {
        background-color: #ebecf0;
    }
`;

export const UpdateButton = styled.button`
    cursor: pointer;
    padding: 10px;
    border: none;
    background-color: #228c22;
    color: #fff;
    font-weight: bold;

    @media (max-width: 576px) {
        font-size: .6rem;
        padding: 7px;
    }
`;

export const DeleteButton = styled.button`
    cursor: pointer;
    padding: 10px;
    border: none;
    background-color: #ae0700;
    color: #fff;
    font-weight: bold;

    @media (max-width: 576px) {
        font-size: .6rem;
        padding: 7px;
    }
`;