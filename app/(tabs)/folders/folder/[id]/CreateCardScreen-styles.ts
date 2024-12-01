import styled from "styled-components/native";

export const ViewInput = styled.View`
    margin-top: 20px;
`;

export const ViewImage = styled.View`
    align-items: center;
    margin-top: 40px;
`;

export const PressablePickImage = styled.TouchableOpacity`
    padding: 30px 0;
    border-width: 1px;
    border-style: dashed;
    border-radius: 10px;
    margin: 10px 0;
`;

export const TextImage = styled.Text`
    text-align: center;
`;

export const ImageCard = styled.Image`
    width: 300px;
    height: 300px;
`;

export const CloseCircle = styled.Pressable`
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 1;
`;
