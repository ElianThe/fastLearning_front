import {View, StyleSheet, TextInput, Text, Alert, Pressable} from "react-native";
import {Colors} from "@/constants/Colors";
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';
import {useEffect, useState} from "react";
import { useAuth} from "@/app/context/AuthContext";
import axios from "axios";
// @ts-ignore
import { API_URL } from '@env';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { onLogin, onRegister } = useAuth();

    useEffect(() => {
        const testCall = async () => {
            const result = await axios.get(`${API_URL}/login`);
            console.log('result ', result);
        }
        testCall();
    }, []);
    const login = async () => {
        const result = await onLogin! (email, password);
        if (result && result.error) {
            Alert.alert('Error', result.msg);
        }
    }

    const register = async () => {
        const result = await onRegister! (email, password);
        if (result && result.error) {
            Alert.alert('Error', result.msg);
        } else {
            login();
        }
    }

    return (
        <View style={styles.container}>
            <Animated.Text style={styles.title}
                           entering={FadeInUp.duration(1000).springify()}>Login</Animated.Text>

            <Animated.View entering={FadeInDown.duration(1000).springify()}>
                <TextInput
                    style={styles.input}
                    placeholder="email - username"
                    placeholderTextColor={'gray'}
                    onChangeText={(text: string) => setEmail(text)}
                    value={email}
                    autoCapitalize="none"
                />
            </Animated.View>
            <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()}>
                <TextInput
                    style={styles.input}
                    placeholder="password"
                    placeholderTextColor={'gray'}
                    secureTextEntry
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    autoCapitalize="none"
                />
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()}>
                <Pressable style={styles.buttonLogin} onPress={login}>
                    <Text style={styles.textLogin}>Login</Text>
                </Pressable>
            </Animated.View>
            <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()}
                           style={styles.viewSignup}>
                <Text>Don't have an account ?</Text>
                <Pressable onPress={register}>
                    <Text style={styles.textSignup}>Sign up</Text>
                </Pressable>
            </Animated.View>
        </View>
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
    }
});
