import styled from "styled-components/native";
import { Colors } from "@/constants/Colors";

export const KeyboardAvoidingViewContainer = styled.KeyboardAvoidingView.attrs({
    behavior: "padding",
})`
    flex: 1;
    justify-content: center;
    background-color: ${Colors.light.background};
    padding: 15px;
    height: 100%;
    width: 100%;
`;
