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
import {router} from "expo-router";
import useFocusInputWithTime from "@/hooks/useFocusInputWithTime";
import useToggle from "@/hooks/useToggle";
import Icon from "@expo/vector-icons/FontAwesome";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import ErrorView from "@/components/FeedBack/ErrorView";
import Input from "@/components/UI/Input";
import Label from "@/components/UI/Label";
import AuthButton from "@/components/auth/AuthButton";

const LoginScreen = () => {

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const passwordRef = useRef<TextInput>(null);
    const [showPassword, togglePasswordVisibility] = useToggle(false);

    const userRef = useFocusInputWithTime();

    const [error, setError] = useState<string | null>(null);

    const {onLogin} = useAuth();

    let isButtonEnabled = email !== "" && password !== "";

    const login = async () => {
        const result = await onLogin!(email, password);
        if (result && result.error) {
            setError("L'email ou le mot de passe est incorrect. Veuillez réessayer.");
        }
    }

    return (
        <View>
            <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" style={styles.container}
                                     contentContainerStyle={{flex: 1, justifyContent: "center"}}>

                {error && <ErrorView text={error} onPress={() => router.push('/screens/Register')}/>}
                <View style={styles.viewInput}>
                    <Label>E-mail</Label>
                    <Input onChangeText={(text) => setEmail(text)} value={email} ref={userRef}/>
                </View>

                <View style={styles.viewInput}>
                    <Label>Mot de passe</Label>
                    <View style={styles.inputPassword}>
                        <Input onChangeText={(text) => setPassword(text)} value={password}
                               onPress={() => passwordRef.current && passwordRef.current.focus()}
                               secureTextEntry={!showPassword} ref={passwordRef}
                               style={{flex: 1, paddingVertical: 10, fontSize: 16, color: 'black'}}/>

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
                <AuthButton isButtonEnabled={isButtonEnabled} onPress={login}>Se connecter</AuthButton>
            </KeyboardAwareScrollView>
        </View>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light.background,
        padding: 15,
        height: '100%',
        width: '100%'
    },
    viewInput: {
        width: '100%',
        marginBottom: 20,
    },
    inputPassword: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10,
        paddingLeft: 10,
        height: 40,
        borderRadius: 5,
        color: 'black',
        backgroundColor: Colors.light.inputColor
    },
    iconContainer: {
        paddingHorizontal: 10,
    },
});
