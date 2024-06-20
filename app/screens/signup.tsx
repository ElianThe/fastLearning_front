import {View, StyleSheet, TextInput, Text, TouchableOpacity} from "react-native";
import {Colors} from "@/constants/Colors";
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';
import {router} from "expo-router";


export default function SignUpScreen() {
    return (
        <View style={styles.container}>
            <Animated.Text style={styles.title}
                           entering={FadeInUp.duration(1000).springify()}>Sign Up</Animated.Text>

            <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} style={styles.viewInput}>
                <TextInput
                    style={styles.input}
                    placeholder="username"
                    placeholderTextColor={'gray'}
                    secureTextEntry
                />
            </Animated.View>

            <Animated.View entering={FadeInDown.duration(1000).springify()} style={styles.viewInput}>
                <TextInput
                    style={styles.input}
                    placeholder="email"
                    placeholderTextColor={'gray'}
                />
            </Animated.View>
            <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} style={styles.viewInput}>
                <TextInput
                    style={styles.input}
                    placeholder="username"
                    placeholderTextColor={'gray'}
                    secureTextEntry
                />
            </Animated.View>


            <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()}>
                <TouchableOpacity style={styles.buttonLogin}>
                    <Text style={styles.textLogin}>Sign Up</Text>
                </TouchableOpacity>
            </Animated.View>
            <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()}
                           style={styles.viewSignup}>
                <Text>Don't have an account ?</Text>
                <TouchableOpacity onPress={() => router.push('/screens/login')}>
                    <Text style={styles.textSignup}>Login</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
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
    viewInput : {
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
    }
});
