import {View, StyleSheet, TextInput, Text, Alert, Pressable, TouchableWithoutFeedback, Keyboard} from "react-native";
import {Colors} from "@/constants/Colors";
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';
import {useState} from "react";
import {useAuth} from "@/app/context/AuthContext";
import {useRouter} from "expo-router";
import {MaterialIcons} from "@expo/vector-icons";

export default function Login() {
    // etats locaux pour stocker les valeurs des champs de saisie
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Fonction de connexion de l'utilisateur
    const {onLogin} = useAuth();
    const [error, setError] = useState<string | null>(null);

    // Hook de routage pour la navigation
    const router = useRouter();

    const login = async () => {
        const result = await onLogin!(email, password);
        if (result && result.error) {
            console.log(result);
            setError("Adresse email ou mot de passe invalide");
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.container}>
                <Animated.Text style={styles.title}
                               entering={FadeInUp.duration(1000).springify()}>Connectez-vous</Animated.Text>

                <Animated.View entering={FadeInDown.duration(1000).springify()}>
                    <TextInput
                        style={styles.input}
                        placeholder="E-mail"
                        placeholderTextColor={'gray'}
                        onChangeText={(text: string) => setEmail(text)}
                        value={email}
                        autoCapitalize="none"
                    />
                </Animated.View>
                <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()}>
                    <TextInput
                        style={styles.input}
                        placeholder="Mot de passe"
                        placeholderTextColor={'gray'}
                        secureTextEntry
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        autoCapitalize="none"
                    />
                </Animated.View>
                {error &&
                    <View style={styles.error}>
                        <MaterialIcons name={'error'} size={24} color={'red'}/>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                }

                <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()}>
                    <Pressable style={styles.buttonLogin} onPress={login}>
                        <Text style={styles.textLogin}>Se connecter</Text>
                    </Pressable>
                </Animated.View>
                <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()}
                               style={styles.viewSignup}>
                    <Text>Vous n'avez pas de compte ? </Text>
                    <Pressable onPress={() => {
                        router.push('/screens/signup')
                    }}>
                        <Text style={styles.textSignup}>S'inscrire</Text>
                    </Pressable>
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>

    )
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
    input: {
        paddingLeft: 20,
        height: 50,
        borderRadius: 15,
        color: 'black',
        backgroundColor: Colors.light.gray,
        marginBottom: 20
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
    }
});
