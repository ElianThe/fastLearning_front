import {View} from "react-native";
import {router} from "expo-router";
import AuthButton from "@/components/auth/AuthButton";

const HomeAuthScreen = () => {
    return (
        <View style={{
            backgroundColor: "white", flex: 1, justifyContent: "flex-end", paddingVertical: 20,
            paddingHorizontal: 10
        }}>
            <AuthButton isButtonEnabled={true} onPress={() => router.push('screens/auth/LoginScreen')}
                        styleText={{fontSize: 16}}>Se connecter</AuthButton>
            <View style={{marginBottom: 20}}/>
            <AuthButton isButtonEnabled={true} onPress={() => router.push('screens/auth/RegisterScreen')}
                        styleText={{fontSize: 16}}>S'inscrire</AuthButton>
        </View>
    );
}

export default HomeAuthScreen;