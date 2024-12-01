import { View } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { TextLogOut, TouchableOpacityLogOut } from "@/app/(tabs)/profile/ProfilScreen-styles";

const ProfileScreen = () => {
    const { onLogout } = useAuth();
    const logout = async () => await onLogout!();

    return (
        <View>
            <TouchableOpacityLogOut onPress={logout}>
                <TextLogOut>Se déconnecter</TextLogOut>
            </TouchableOpacityLogOut>
        </View>
    );
}

export default ProfileScreen;
