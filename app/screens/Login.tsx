import {
    View,
    StyleSheet,
    TextInput,
    Text,
    Pressable,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity
} from "react-native";
import {Colors} from "@/constants/Colors";
import React, {useRef, useState} from "react";
import {useAuth} from "@/app/context/AuthContext";
import {useRouter} from "expo-router";
import {MaterialIcons} from "@expo/vector-icons";
import useFocusInputWithTime from "@/hooks/useFocusInputWithTime";
import useToggle from "@/hooks/useToggle";
import Icon from "@expo/vector-icons/FontAwesome";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState<string>('');

    const userRef = useFocusInputWithTime();
    const passwordRef = useRef<TextInput>(null);

    let isButtonEnabled = email && password;

    const [showPassword, togglePasswordVisibility] = useToggle(false);

    const [error, setError] = useState<string | null>(null);

    const {onLogin} = useAuth();
    // Fonction de connexion
    const login = async () => {
        const result = await onLogin!(email, password);
        if (result && result.error) {
            setError("L'email ou le mot de passe est incorrect. Veuillez réessayer.");
        }
    }

    // Hook de routage pour la navigation
    const router = useRouter();

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.container}>
                <Text style={styles.title}>Connectez-vous</Text>

                <View style={styles.viewInput}>
                    <Text style={styles.label}>E-mail</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => {
                            setEmail(text);
                        }}
                        value={email}
                        ref={userRef}
                    />
                </View>

                <View style={styles.viewInput}>

                    <Text style={styles.label}>Mot de passe</Text>
                    <TouchableOpacity
                        style={styles.passwordContainer}
                        onPress={() => {
                            passwordRef.current && passwordRef.current.focus();
                        }}
                    >
                        <TextInput
                            style={styles.inputPassword}
                            onChangeText={(text) => {
                                setPassword(text);
                            }}
                            value={password}
                            secureTextEntry={!showPassword}
                            ref={passwordRef}
                        />
                        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
                            <Icon
                                name={showPassword ? 'eye-slash' : 'eye'} // Change l'icône en fonction de l'état
                                size={20}
                                color="#000" // Couleur de l'icône
                            />
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>

                {error &&
                    <View style={styles.error}>
                        <MaterialIcons name={'error'} size={24} color={'red'}/>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                }

                {/* button login */}
                <TouchableOpacity
                    disabled={!isButtonEnabled}
                    style={isButtonEnabled ? styles.buttonLogin : styles.buttonRegisterDisabled}
                    onPress={login}
                >
                    <Text style={styles.textLogin}>Se connecter</Text>
                </TouchableOpacity>

                <View style={styles.viewSignup}>
                    <Text>Vous n'avez pas de compte ? </Text>
                    <Pressable onPress={() => {
                        router.push('/screens/Register');
                    }}>
                        <Text style={styles.textSignup}>S'inscrire</Text>
                    </Pressable>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light.background,
        display: 'flex',
        justifyContent: 'center',
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
    viewInput: {
        width: '100%',
        marginBottom: 20,
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
        borderRadius: 15
    },
    textLogin: {
        textAlign: 'center',
        color: 'white',
    },
    viewSignup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    textSignup: {
        color: 'blue'
    },
    error: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    errorText: {
        paddingLeft: 10,
        color: 'red'
    },
    buttonRegisterDisabled: {
        backgroundColor: 'gray',
        padding: 15,
        borderRadius: 5
    },
});
