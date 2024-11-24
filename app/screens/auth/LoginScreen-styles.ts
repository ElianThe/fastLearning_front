import styled from "styled-components/native";
import { Colors } from "@/constants/Colors";

export const KeyboardAvoidingViewContainer = styled.KeyboardAvoidingView`
    flex: 1;
    justify-content: center;
    background-color: ${Colors.light.background};
    padding: 15px;
    height: 100%;
    width: 100%;
`;

export const ViewInput = styled.View`
    width: 100%;
    margin-bottom: 20px;
`;

export const ViewInputPassword = styled.View`
    flex-direction: row;
    align-items: center;
    border-radius: 5px;
    background-color: ${Colors.light.inputColor};
`;

export const TouchableOpacityStyled = styled.TouchableOpacity`
    padding: 0 10px; 
`;