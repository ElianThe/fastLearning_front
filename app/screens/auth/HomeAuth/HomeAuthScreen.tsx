import { View } from "react-native";
import { router } from "expo-router";
import AuthButton from "@/components/auth/AuthButton";
import { ViewContainer } from "@/app/screens/auth/HomeAuth/HomeAuth-styles";

const HomeAuthScreen = () => {
    return (
        <ViewContainer>
            <AuthButton
                isButtonDisabled={false}
                onPress={() => router.push("screens/auth/login/LoginScreen")}
            >
                Se connecter
            </AuthButton>
            <View style={{ marginBottom: 20 }} />
            <AuthButton
                isButtonDisabled={false}
                onPress={() => router.push("screens/auth/register/RegisterScreen")}
            >
                S'inscrire
            </AuthButton>
        </ViewContainer>
    );
};

export default HomeAuthScreen;
