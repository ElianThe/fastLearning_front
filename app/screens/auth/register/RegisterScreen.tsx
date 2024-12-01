import { TextInput, Text } from "react-native";
import React, { useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import useFocusInputWithTime from "@/hooks/useFocusInputWithTime";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Icon from "@expo/vector-icons/FontAwesome";
import useToggle from "@/hooks/useToggle";
import { router } from "expo-router";
import Input from "@/components/UI/Input";
import AuthButton from "@/components/auth/AuthButton";
import Label from "@/components/UI/Label";
import {
    StyledKeyboardAwareScrollView,
    ViewLabelWithIcon,
} from "@/app/screens/auth/register/RegisterScreen-styles";
import ErrorViewAuth from "@/components/feedBack/ErrorView/ErrorViewAuth";
import { EyeSlashStyled, ViewInput, ViewInputPassword } from "@/app/screens/auth/Auth-styles";

const USER_REGEX = /^[a-zA-Z0-9._-]{3,20}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;

const RegisterScreen = () => {
    // etats locaux pour stocker les valeurs des champs de saisie
    const [email, setEmail] = useState("");
    const [emailValid, setEmailValid] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [username, setUsername] = useState("");
    const [usernameValid, setUsernameValid] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [password, setPassword] = useState("");
    const [passwordValid, setPasswordValid] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const passwordRef = useRef<TextInput>(null);

    const [showPassword, togglePasswordVisibility] = useToggle(false);

    let isButtonDisabled = !emailValid || !usernameValid || !passwordValid;

    const { onRegister, onLogin } = useAuth();

    const [error, setError] = useState<string | null>(null);

    const userRef = useFocusInputWithTime();

    const register = async () => {
        try {
            const result = await onRegister!(email, password, username);
            if (result) {
                await onLogin!(email, password);
            }
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <StyledKeyboardAwareScrollView>
            {/* error */}
            {error && (
                <ErrorViewAuth
                    error={error}
                    text={"Vous avez déjà un compte ?"}
                    routerLink={() => router.push("screens/auth/login/LoginScreen")}
                    textLink={"Se connecter"}
                />
            )}

            {/* email */}
            <ViewInput>
                <ViewLabelWithIcon>
                    <Label>E-mail</Label>
                    {emailValid && email && <FontAwesome name="check" size={20} color="black" />}
                    {!emailValid && email && <FontAwesome5 name="times" size={20} color="black" />}
                </ViewLabelWithIcon>
                <Input
                    onChangeText={(text) => {
                        setEmail(text);
                        setEmailValid(EMAIL_REGEX.test(text));
                    }}
                    value={email}
                    ref={userRef}
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                />
                {emailFocus && !emailValid && (
                    <Text>Veuillez entrer une adresse email valide.</Text>
                )}
            </ViewInput>

            {/* username */}
            <ViewInput>
                <ViewLabelWithIcon>
                    <Label>Nom d'utilisateur</Label>
                    {usernameValid && username && (
                        <FontAwesome name="check" size={20} color="black" />
                    )}
                    {!usernameValid && username && (
                        <FontAwesome5 name="times" size={20} color="black" />
                    )}
                </ViewLabelWithIcon>
                <Input
                    onChangeText={(text) => {
                        setUsername(text);
                        setUsernameValid(USER_REGEX.test(text));
                    }}
                    value={username}
                    onFocus={() => setUsernameFocus(true)}
                    onBlur={() => setUsernameFocus(false)}
                />
                {usernameFocus && !usernameValid && (
                    <Text>Le nom d'utilisateur doit comporter entre 3 et 20 caractères.</Text>
                )}
            </ViewInput>

            {/* password */}
            <ViewInput>
                <ViewLabelWithIcon>
                    <Label>Mot de passe</Label>
                    {passwordValid && password && (
                        <FontAwesome name="check" size={20} color="black" />
                    )}
                    {!passwordValid && password && (
                        <FontAwesome5 name="times" size={20} color="black" />
                    )}
                </ViewLabelWithIcon>
                <ViewInputPassword>
                    <Input
                        passwordStyle
                        onChangeText={(text) => {
                            setPassword(text);
                            setPasswordValid(PASSWORD_REGEX.test(text));
                        }}
                        value={password}
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                        onPress={() => passwordRef.current && passwordRef.current.focus()}
                        secureTextEntry={!showPassword}
                        ref={passwordRef}
                    />
                    <EyeSlashStyled onPress={togglePasswordVisibility}>
                        <Icon
                            name={showPassword ? "eye-slash" : "eye"}
                            size={20}
                            color="#000" // Couleur de l'icône
                        />
                    </EyeSlashStyled>
                </ViewInputPassword>
                {!passwordValid && passwordFocus && (
                    <Text>
                        Le mot de passe doit comporter entre 8 et 24 caractères et doit inclure au
                        moins une majuscule, une minuscule et un chiffre.
                    </Text>
                )}
            </ViewInput>

            {/* button sign up */}
            <AuthButton isButtonDisabled={isButtonDisabled} onPress={register}>
                S'inscrire
            </AuthButton>
        </StyledKeyboardAwareScrollView>
    );
};

export default RegisterScreen;
