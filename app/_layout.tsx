import {AuthProvider, useAuth} from "@/app/context/AuthContext";
import React, {useCallback, useEffect} from 'react';
import {Slot, useRouter} from "expo-router";
import {useFonts} from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import {ActivityIndicator, View} from "react-native";

export function RootLayout() {
    const {authState} = useAuth();
    const router = useRouter();

    // fonction pour rediriger l'utilisateur en fonction de son état d'authentification
    const handleAuthRedirect = useCallback(() => {
        if (authState?.authenticated) {
            router.push('/home');
        } else {
            router.push('/screens/login');
        }
    }, [authState?.authenticated, router]);

    useEffect(() => {
        handleAuthRedirect();
    }, [handleAuthRedirect]);

    return (
        <Slot />
    );
}

const App = () => {
    const [fontsLoaded] = useFonts({
        'mon-b': require('../assets/fonts/Montserrat-Bold.ttf'),
        'mon-r': require('../assets/fonts/Montserrat-Regular.ttf'),
        'mon-sb': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    });

    useEffect(() => {
        async function prepare () {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    }, []);

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <AuthProvider>
            <RootLayout/>
        </AuthProvider>
    );
};

export default App;
