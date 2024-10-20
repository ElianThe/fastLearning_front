import {
    View,
    StyleSheet,
    TextInput,
    Text,
    TouchableOpacity
} from "react-native";
import {Colors} from "@/constants/Colors";
import React, {useRef, useState} from "react";
import {useAuth} from "@/app/context/AuthContext";
import {router, useRouter} from "expo-router";
import useFocusInputWithTime from "@/hooks/useFocusInputWithTime";
import useToggle from "@/hooks/useToggle";
import Icon from "@expo/vector-icons/FontAwesome";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import ErrorView from "@/components/ErrorView";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState<string>('');

    const userRef = useFocusInputWithTime();
    const passwordRef = useRef<TextInput>(null);

    let isButtonEnabled = email && password;

    const [showPassword, togglePasswordVisibility] = useToggle(false);

    const [error, setError] = useState<string | null>(null);

    const {onLogin} = useAuth();
    const login = async () => {
        const result = await onLogin!(email, password);
        if (result && result.error) {
            setError("L'email ou le mot de passe est incorrect. Veuillez réessayer.");
        }
    }

    return (
        <View>
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps="handled"
                style={styles.container}
                contentContainerStyle={{flex: 1, justifyContent: "center"}}
            >
                {error && <ErrorView text={error} onPress={() => router.push('/screens/Register')}/>}
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
                    <View style={[styles.inputPassword, styles.input]}>
                        <TextInput
                            style={{flex: 1, paddingVertical: 10, fontSize: 16, color: 'black'}}
                            onChangeText={(text) => {
                                setPassword(text);
                            }}
                            onPress={() => passwordRef.current && passwordRef.current.focus()}
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
                    </View>
                </View>

                {/* button login */}
                <TouchableOpacity
                    disabled={!isButtonEnabled}
                    style={isButtonEnabled ? styles.buttonLogin : styles.buttonRegisterDisabled}
                    onPress={login}
                >
                    <Text style={styles.textLogin}>Se connecter</Text>
                </TouchableOpacity>


            </KeyboardAwareScrollView>
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light.background,
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
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10,
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
    buttonRegisterDisabled: {
        backgroundColor: 'gray',
        padding: 15,
        borderRadius: 5
    },
});
