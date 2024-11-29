import styled from "styled-components/native";
import { Colors } from "@/constants/Colors";

export const ViewInput = styled.View`
    width: 100%;
    margin-bottom: 20px;
`;

export const ViewInputPassword = styled.View`
    flex-direction: row;
    align-items: center;
    border-radius: 5px;
    background-color: ${Colors.light.inputColor};
    padding-right: 10px;
`;

export const EyeSlashStyled = styled.TouchableOpacity`
    padding: 0 10px; 
`;