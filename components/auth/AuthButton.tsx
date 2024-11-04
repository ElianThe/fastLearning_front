import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { PropsWithChildren } from "react";

type AuthButtonType = PropsWithChildren<{
    isButtonDisabled: boolean;
    onPress: () => void;
    styleText?: {};
}>;

const AuthButton = ({ isButtonDisabled, onPress, children, styleText }: AuthButtonType) => {
    return (
        <TouchableOpacity
            accessibilityRole={"button"}
            disabled={isButtonDisabled}
            style={ isButtonDisabled ? styles.buttonAuthDisabled : styles.buttonAuthEnabled }
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
