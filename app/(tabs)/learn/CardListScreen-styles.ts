import styled from "styled-components/native";

export const ViewContainer = styled.View`
    background-color: white;
    flex: 1;
`;

export const ViewCardList = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: space-around;
    background-color: #f2f2f2;
    margin: 10px;
    border-radius: 10px;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
    elevation: 3;
`;

export const ViewCard = styled.View`
    flex: 1;
    background-color: white;
    margin: 10px 10px 0;
    border-radius: 5px;
    padding: 10px;
`;

export const TitleCard = styled.Text`
    font-size: 20px;
`;

export const ButtonLearn = styled.Pressable`
    margin: 10px;
    padding: 15px;
    border-radius: 10px;
    background-color: #003049;
`;

export const TextLearn = styled.Text`
    text-align: center;
    color: #ffffff;
    font-size: 16px;
`;

export const ViewNoCards = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const TextNoCards = styled.Text`
    font-size: 20px;
`;
