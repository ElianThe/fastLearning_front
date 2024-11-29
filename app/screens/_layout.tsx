import { Stack } from "expo-router";

const ScreensLayout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="auth/login/LoginScreen"
                options={{
                    headerTitle: "Se connecter",
                    headerTitleAlign: "center",
                    headerBackTitleVisible: false,
                    headerTintColor: "black",
                }}
            />
            <Stack.Screen
                name="auth/register/RegisterScreen"
                options={{
                    headerTitle: "Inscription",
                    headerTitleAlign: "center",
                    headerBackTitleVisible: false,
                    headerTintColor: "black",
                }}
            />
            <Stack.Screen
                name="onBoardingScreen"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="auth/HomeAuth/HomeAuthScreen"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
};

export default ScreensLayout;
