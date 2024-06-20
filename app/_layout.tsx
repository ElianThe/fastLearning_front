import {AuthProvider, useAuth} from "@/app/context/AuthContext";
import React, {useEffect} from 'react';
import {Slot, useRouter} from "expo-router";

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
    return (
        <AuthProvider>
            <RootLayout/>
        </AuthProvider>
    );
};

export default App;