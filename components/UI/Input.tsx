import { Colors } from "@/constants/Colors";
import styled from "styled-components/native";
import { Ref } from "react";
import { TextInput } from "react-native";

type TypeInput = {
    passwordStyle?: boolean;
    ref?: Ref<TextInput>;
};

const Input = styled.TextInput<TypeInput>`
    padding: 10px 10px;
    border-radius: 5px;
    color: black;
    background-color: ${Colors.light.inputColor};
    font-size: 14px;
    ${(props) => (props.passwordStyle ? "flex : 1;" : "")};
`;

export default Input;
