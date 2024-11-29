import { TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import React, { useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import useFocusInputWithTime from "@/hooks/useFocusInputWithTime";
import useToggle from "@/hooks/useToggle";
import Icon from "@expo/vector-icons/FontAwesome";
import Input from "@/components/UI/Input";
import Label from "@/components/UI/Label";
import AuthButton from "@/components/auth/AuthButton";
import { KeyboardAvoidingViewContainer } from "@/app/screens/auth/login/LoginScreen-styles";
import { EyeSlashStyled, ViewInput, ViewInputPassword } from "@/app/screens/auth/Auth-styles";
import ErrorViewAuth from "@/components/feedBack/ErrorView/ErrorViewAuth";

const LoginScreen = () => {
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    const passwordRef = useRef<TextInput>(null);
    const [showPassword, togglePasswordVisibility] = useToggle(false);

    const userRef = useFocusInputWithTime();

    const [error, setError] = useState<string | null>(null);

    const { onLogin } = useAuth();

    let isButtonDisabled = email !== "" && password !== "";

    const login = async () => {
        try {
            await onLogin!(email, password);
        } catch (err: any) {
            setError("L'email ou le mot de passe est incorrect. Veuillez réessayer.");
            console.error(err.response.data.message);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingViewContainer behavior={"padding"}>
                {error && (
                    <ErrorViewAuth
                        error={error}
                        text={"Vous n'avez pas de compte ?"}
                        routerLink={() => router.push("/screens/auth/register/RegisterScreen")}
                        textLink={"S'inscrire"}
                    />
                )}
                <ViewInput>
                    <Label>E-mail</Label>
                    <Input onChangeText={(text) => setEmail(text)} value={email} ref={userRef} />
                </ViewInput>

                <ViewInput>
                    <Label>Mot de passe</Label>
                    <ViewInputPassword>
                        <Input
                            passwordStyle
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                            onPress={() => passwordRef.current && passwordRef.current.focus()}
                            secureTextEntry={!showPassword}
                            ref={passwordRef}
                        />

                        <EyeSlashStyled onPress={togglePasswordVisibility}>
                            <Icon
                                name={showPassword ? "eye-slash" : "eye"}
                                size={20}
                                color="#000"
                            />
                        </EyeSlashStyled>
                    </ViewInputPassword>
                </ViewInput>

                {/* button login */}
                <AuthButton isButtonDisabled={!isButtonDisabled} onPress={login}>
                    Se connecter
                </AuthButton>
            </KeyboardAvoidingViewContainer>
        </TouchableWithoutFeedback>
    );
};

export default LoginScreen;
