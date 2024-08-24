import {Stack} from "expo-router";
import {useAuth} from "@/app/context/AuthContext";
import {Alert, Button} from "react-native";

export default function StackLayout () {
    const {onLogout} = useAuth();

    const logout = async () => {
        const result = await onLogout!();
        if (result && result.error) {
            Alert.alert('Error', result.msg);
        }
    }

    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerTitle: 'Paramètres',
                    headerTitleAlign: 'center',
                    headerRight: () => {
                        return (
                            <Button
                                title="déconnexion"
                                onPress={logout}
                            />
                        );
                    }
                }}
            />
        </Stack>
    );
}