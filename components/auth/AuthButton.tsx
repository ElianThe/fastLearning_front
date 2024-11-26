import React, { PropsWithChildren } from "react";
import styled from "styled-components/native";

type AuthButtonType = PropsWithChildren<{
    isButtonDisabled: boolean;
    onPress: () => void;
}>;

const AuthButton = ({ isButtonDisabled, onPress, children }: AuthButtonType) => {
    return (
        <ButtonAuth
            backgroundColor={isButtonDisabled ? "gray" : "#003049"}
            accessibilityRole={"button"}
            disabled={isButtonDisabled}
            onPress={onPress}
        >
            <TextLogin>{children}</TextLogin>
        </ButtonAuth>
    );
};

export default AuthButton;

const ButtonAuth = styled.TouchableOpacity<{ backgroundColor: string }>`
    padding: 15px;
    border-radius: 5px;
    background-color: ${({backgroundColor}) => backgroundColor};
`;

const TextLogin = styled.Text<{ inAuthPage?: boolean }>`
    text-align: center;
    color: white;
    font-size: 16px;
`;
