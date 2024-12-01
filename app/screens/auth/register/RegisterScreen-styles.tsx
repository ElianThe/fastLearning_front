import styled from "styled-components/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Colors } from "@/constants/Colors";

export const ViewLabelWithIcon = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const StyledKeyboardAwareScrollView = styled(KeyboardAwareScrollView).attrs({
    contentContainerStyle: {
        flex: 1,
        justifyContent: "center"
    },
    keyboardShouldPersistTaps: "handled"
})`
    background-color: ${Colors.light.background};
    display: flex;
    padding: 15px;
    height: 100%;
    width: 100%;
`;
