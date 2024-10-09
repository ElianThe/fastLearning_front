import {Stack} from "expo-router";

const ScreensLayout = () => {
    return <Stack>
        <Stack.Screen name="Login" />
        <Stack.Screen name="Register" />
        <Stack.Screen name="onBoardingScreen" options={{
            headerShown: false
        }} />
        <Stack.Screen name="homeAuthentificate" options={{
            headerTitle: "Page connexion / inscription",
            headerTitleAlign: "center"
        }} />
    </Stack>
};

export default ScreensLayout