import {Alert, Text, TouchableOpacity, View} from "react-native";
import {useAuth} from "@/app/context/AuthContext";

const Plus = () => {
    const {onLogout} = useAuth();
    const logout = async () => {
        const result = await onLogout!();
        if (result && result.error) {
            Alert.alert('Error', result.msg);
        }
    }
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

export default Plus;

