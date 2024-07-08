import {AuthProvider, useAuth} from "@/app/context/AuthContext";
import React, {useEffect} from 'react';
import {Slot, useRouter} from "expo-router";
import {useFonts} from "expo-font";
import * as SplashScreen from 'expo-splash-screen';

export function RootLayout() {
    const {authState} = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (!authState?.authenticated) {
            router.push('/screens/login');
        } else {
            router.push('/');
        }
    }, [authState?.authenticated]);

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

    if (!fontsLoaded) {
        return undefined;
    } else {
        SplashScreen.hideAsync();
    }

    return (
        <AuthProvider>
            <RootLayout/>
        </AuthProvider>
    );
};

export default App;