import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { PropsWithChildren } from "react";

type AuthButtonType = PropsWithChildren<{
    isButtonEnabled: boolean;
    onPress: () => void;
    styleText?: {};
}>;

const AuthButton = ({ isButtonEnabled, onPress, children, styleText }: AuthButtonType) => {
    return (
        <TouchableOpacity
            disabled={!isButtonEnabled}
            style={isButtonEnabled ? styles.buttonAuthEnabled : styles.buttonAuthDisabled}
            onPress={onPress}
        >
            <Text style={[styles.textLogin, styleText && styleText]}>{children}</Text>
        </TouchableOpacity>
    );
};
export default AuthButton;

const styles = StyleSheet.create({
    buttonAuthEnabled: {
        backgroundColor: "#003049",
        padding: 15,
        borderRadius: 5,
    },

    buttonAuthDisabled: {
        backgroundColor: "gray",
        padding: 15,
        borderRadius: 5,
    },

    textLogin: {
        textAlign: "center",
        color: "white",
    },
});
