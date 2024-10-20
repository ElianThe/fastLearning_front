import {Stack} from "expo-router";

const ScreensLayout = () => {
    return <Stack>
        <Stack.Screen name="login" options={{
            headerTitle: "Se connecter",
            headerTitleAlign: "center",
            headerBackTitleVisible: false,
            headerTintColor: 'black',

        }} />
        <Stack.Screen name="register" options={{
            headerTitle: "Inscription",
            headerTitleAlign: "center",
            headerBackTitleVisible: false,
            headerTintColor: 'black',
        }} />
        <Stack.Screen name="onBoardingScreen" options={{
            headerShown: false
        }} />
        <Stack.Screen name="homeAuthentificate" options={{
            headerShown: false
        }} />
    </Stack>
};

export default ScreensLayout