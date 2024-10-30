import {Alert, Text, TouchableOpacity, View} from "react-native";
import {useAuth} from "@/context/AuthContext";

const ProfileScreen = () => {
    const {onLogout} = useAuth();
    const logout = async () => await onLogout!();

    return (
        <View>
            <TouchableOpacity onPress={logout} style={{ margin: 20 }}>
                <Text style={{ fontSize: 16, textDecorationLine: "underline" }}>
                    Se déconnecter
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default ProfileScreen;
