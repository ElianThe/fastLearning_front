import {
    View,
    StyleSheet,
    TextInput,
    Text,
    TouchableOpacity,
} from "react-native";
import {Colors} from "@/constants/Colors";
import React, {useRef, useState} from "react";
import {useAuth} from "@/app/context/AuthContext";
import useFocusInputWithTime from "@/hooks/useFocusInputWithTime";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Icon from '@expo/vector-icons/FontAwesome';
import useToggle from "@/hooks/useToggle";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import ErrorView from "@/components/ErrorView";
import {router} from "expo-router";

const USER_REGEX = /^[a-zA-Z0-9._-]{3,20}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z\d]{8,24}$/;

const Register = () => {

    // etats locaux pour stocker les valeurs des champs de saisie
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [username, setUsername] = useState('');
    const [usernameValid, setUsernameValid] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const passwordRef = useRef<TextInput>(null);

    const [showPassword, togglePasswordVisibility] = useToggle(false);

    let isButtonEnabled = emailValid && usernameValid && passwordValid;

    const {onRegister, onLogin} = useAuth();

    const [error, setError] = useState<string | null>(null);

    const userRef = useFocusInputWithTime();

    const register = async () => {
        const result = await onRegister!(email, password, username);
        if (result && result.error) {
            // Récupérer la première clé de l'objet 'details'
            const firstKey = Object.keys(result.details)[0];
            // Récupérer le premier message d'erreur pour cette clé
            const firstErrorMessage = result.details[firstKey][0];
            setError(firstErrorMessage);
        } else {
            const result = await onLogin!(email, password);
            if (result && result.error) {
                setError(result.msg);
            }
        }
    }

    return (
        <KeyboardAwareScrollView
            style={styles.container}
            contentContainerStyle={{flex: 1, justifyContent: "center"}}
            keyboardShouldPersistTaps="handled"
        >
            {/* error */}
            {error &&
                <ErrorView text={error} onPress={() => router.push('screens/login')}/>
            }

            {/* email */}
            <View style={styles.viewInput}>
                <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={styles.label}>E-mail</Text>
                    {(emailValid && email) && <FontAwesome name="check" size={20} color="black"/>}
                    {(!emailValid && email) && <FontAwesome5 name="times" size={20} color="black"/>}
                </View>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => {
                        setEmail(text);
                        setEmailValid(EMAIL_REGEX.test(text));
                    }}
                    value={email}
                    ref={userRef}
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                />

                {(emailFocus && !emailValid) &&
                    <Text>Veuillez entrer une adresse email valide.</Text>
                }
            </View>

            {/* username */}
            <View style={styles.viewInput}>
                <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={styles.label}>Nom d'utilisateur</Text>
                    {(usernameValid && username) && <FontAwesome name="check" size={20} color="black"/>}
                    {(!usernameValid && username) && <FontAwesome5 name="times" size={20} color="black"/>}
                </View>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => {
                        setUsername(text);
                        setUsernameValid(USER_REGEX.test(text))
                    }}
                    value={username}
                    onFocus={() => setUsernameFocus(true)}
                    onBlur={() => setUsernameFocus(false)}
                />
                {(usernameFocus && !usernameValid) &&
                    <Text>Le nom d'utilisateur doit comporter entre 3 et 20 caractères.</Text>
                }
            </View>

            {/* password */}
            <View style={styles.viewInput}>
                <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={styles.label}>Mot de passe</Text>
                    {(passwordValid && password) && <FontAwesome name="check" size={20} color="black"/>}
                    {(!passwordValid && password) && <FontAwesome5 name="times" size={20} color="black"/>}
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 5,
                    backgroundColor: Colors.light.gray,
                    paddingRight: 10,
                    paddingLeft: 20,
                    height: 40
                }}>
                    <TextInput
                        style={{flex: 1, paddingVertical: 10, fontSize: 16, color: 'black'}}
                        onChangeText={(text) => {
                            setPassword(text);
                            setPasswordValid(PASSWORD_REGEX.test(text));
                        }}
                        onPress={() => passwordRef.current && passwordRef.current.focus()}
                        value={password}
                        secureTextEntry={!showPassword}
                        ref={passwordRef}
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                    />
                    <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
                        <Icon
                            name={showPassword ? 'eye-slash' : 'eye'} // Change l'icône en fonction de l'état
                            size={20}
                            color="#000" // Couleur de l'icône
                        />
                    </TouchableOpacity>
                </View>
                {(!passwordValid && passwordFocus) &&
                    <Text>
                        Le mot de passe doit comporter entre 8 et 24 caractères et doit inclure au moins une
                        majuscule, une minuscule et un chiffre.
                    </Text>
                }
            </View>

            {/* button sign up */}
            <TouchableOpacity
                disabled={!isButtonEnabled}
                style={isButtonEnabled ? styles.buttonLogin : styles.buttonRegisterDisabled}
                onPress={register}
            >
                <Text style={styles.textLogin}>S'inscrire</Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
    );
}

export default Register;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light.background,
        display: 'flex',
        padding: 15,
        height: '100%',
        width: '100%'
    },
    title: {
        textAlign: 'center',
        color: 'black',
        fontSize: 30,
        marginBottom: 20

    },
    viewInput: {
        width: '100%',
        marginBottom: 20,
    },
    label: {
        marginBottom: 5
    },
    input: {
        paddingLeft: 20,
        height: 40,
        borderRadius: 5,
        color: 'black',
        backgroundColor: Colors.light.gray
    },
    inputPassword: {
        color: 'black',
        width: 100
    },
    passwordContainer: {
        borderRadius: 5,
        flexDirection: 'row',
        paddingLeft: 20,
        height: 40,
        width: '100%',
        alignItems: 'center',
        justifyContent: "space-between",
        backgroundColor: Colors.light.gray,
    },
    iconContainer: {
        paddingHorizontal: 10, // Espacement autour de l'icône
    },
    buttonLogin: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 5
    },

    buttonRegisterDisabled: {
        backgroundColor: 'gray',
        padding: 15,
        borderRadius: 5
    },
    textLogin: {
        textAlign: 'center',
        color: 'white',
    },
    error: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 15,
        marginBottom: 20
    },
    errorText: {
        color: 'red',
        marginLeft: 10
    }
});
