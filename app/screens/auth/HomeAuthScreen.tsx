import { View } from "react-native";
import { router } from "expo-router";
import AuthButton from "@/components/auth/AuthButton";

const HomeAuthScreen = () => {
    return (
        <View
            style={{
                backgroundColor: "white",
                flex: 1,
                justifyContent: "flex-end",
                paddingVertical: 50,
                paddingHorizontal: 10,
            }}
        >
            <AuthButton
                isButtonDisabled={false}
                onPress={() => router.push("screens/auth/LoginScreen")}
            >
                Se connecter
            </AuthButton>
            <View style={{ marginBottom: 20 }} />
            <AuthButton
                isButtonDisabled={false}
                onPress={() => router.push("screens/auth/RegisterScreen")}
            >
                S'inscrire
            </AuthButton>
        </View>
    );
};

export default HomeAuthScreen;
