import styled from "styled-components/native";

export const ViewContainer = styled.View`
    border-width: 1px;
    border-radius: 5px;
    flex-direction: row;
    margin-bottom: 20px;
    border-color: #f2f2f2;
`;

export const ViewBorderLeftRed= styled.View`
    border-left-width: 15px;
    border-color: red;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
`;

export const ViewRight = styled.View`
    flex-direction: row;
    align-items: center;
    margin: 10px;
    justify-content: space-around;
`;

export const ViewContent = styled.View`
    flex-direction: column;
    margin: 0 15px
`;

export const ViewError = styled.View`
    flex-direction: row;
`;
