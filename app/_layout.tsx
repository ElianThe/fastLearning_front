import {AuthProvider, useAuth} from "@/context/AuthContext";
import React, {useEffect, useState} from 'react';
import {Slot, useRouter} from "expo-router";
import {useFonts} from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import {ActivityIndicator} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {GestureHandlerRootView} from "react-native-gesture-handler";

/*
     const clearAsyncStorage = async () => {
        try {
            await AsyncStorage.clear();
            console.log('AsyncStorage has been cleared.');
        } catch (error) {
            console.error('Failed to clear AsyncStorage:', error);
        }
    };
        clearAsyncStorage();
*/

const RootLayout = () => {
    const {authState} = useAuth();
    const [isAppFirstLaunched, setIsAppFirstLaunched] = useState<boolean | null>(null);
    const router = useRouter();

    const checkFirstLaunch = async () => {
        const appData = await AsyncStorage.getItem('isAppFirstLaunched');
        if (appData === null) {
            setIsAppFirstLaunched(true);
            AsyncStorage.setItem('isAppFirstLaunched', 'false');
        } else {
            setIsAppFirstLaunched(false);
        }
    };

    useEffect(() => {
        const handleNavigation = () => {
            if (isAppFirstLaunched === null) {
                return;
            }

            if (isAppFirstLaunched) {
                router.replace('/screens/onBoardingScreen');
            } else if (authState?.authenticated) {
                router.replace('/learn');
            } else {
                router.replace('/screens/auth/HomeAuthScreen');
            }
        };

        checkFirstLaunch().then(handleNavigation);

    }, [authState, isAppFirstLaunched]);

    if (isAppFirstLaunched === null) {
        return <ActivityIndicator size="large" color="#0000ff"
                                  style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}/>;
    }

    return (
        <Slot/>
    );
};

const App = () => {
    return (
        <GestureHandlerRootView>
            <BottomSheetModalProvider>
                <AuthProvider>
                    <RootLayout/>
                </AuthProvider>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}

export default App;

/*
SEE LATER : useFonts
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
}*/
