import {
    View,
    StyleSheet,
    TextInput,
    Text,
    TouchableOpacity,
    Alert,
    TouchableWithoutFeedback,
    Keyboard
} from "react-native";
import {Colors} from "@/constants/Colors";
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';
import {router} from "expo-router";
import React, {useState} from "react";
import {useAuth} from "@/app/context/AuthContext";
import {MaterialIcons} from "@expo/vector-icons";


export default function SignUpScreen() {

    // etats locaux pour stocker les valeurs des champs de saisie
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const {onRegister} = useAuth();

    //
    const [error, setError] = useState<string | null>(null);

    const register = async () => {
        const result = await onRegister!(email, password ,username);
        if (result && result.error) {

            // Récupérer la première clé de l'objet 'details'
            const firstKey = Object.keys(result.details)[0];
            // Récupérer le premier message d'erreur pour cette clé
            const firstErrorMessage = result.details[firstKey][0];
            setError(firstErrorMessage);
        } else {
            router.push('/screens/login');
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.container}>
                {/* title */}
                <Animated.Text style={styles.title}
                               entering={FadeInUp.duration(1000).springify()}>S'inscrire</Animated.Text>

                {/* email */}
                <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} style={styles.viewInput}>
                    <TextInput
                        style={styles.input}
                        placeholder="E-mail"
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        placeholderTextColor={'gray'}
                    />
                </Animated.View>

                {/* username */}
                <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} style={styles.viewInput}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nom d'utilisateur"
                        onChangeText={(text) => setUsername(text)}
                        value={username}
                        placeholderTextColor={'gray'}
                    />
                </Animated.View>

                {/* password */}
                <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} style={styles.viewInput}>
                    <TextInput
                        style={styles.input}
                        placeholder="Mot de passe"
                        placeholderTextColor={'gray'}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        secureTextEntry
                    />
                </Animated.View>

                {/* error */}
                {error &&
                    <View style={styles.error}>
                        <MaterialIcons name={'error'} size={24} color={'red'}/>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                }

                {/* button sign up */}
                <Animated.View entering={FadeInDown.delay(800).duration(1000).springify()}>
                    <TouchableOpacity style={styles.buttonLogin} onPress={register}>
                        <Text style={styles.textLogin}>S'inscrire</Text>
                    </TouchableOpacity>
                </Animated.View>

                {/* sign up redirection */}
                <Animated.View entering={FadeInDown.delay(1000).duration(1000).springify()}
                               style={styles.viewSignup}>
                    <Text>Vous avez déjà un compte ? </Text>
                    <TouchableOpacity onPress={() => router.push('/screens/login')}>
                        <Text style={styles.textSignup}>Se connecter</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>

    );
}

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
    viewInput: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        paddingLeft: 20,
        height: 50,
        borderRadius: 15,
        color: 'black',
        backgroundColor: Colors.light.gray
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
