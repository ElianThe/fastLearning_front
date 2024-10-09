import {View, Text, Pressable, SafeAreaView} from "react-native";
import {router} from "expo-router";

const HomeAuthentificate = () => {
    return (
        <SafeAreaView style={{ flex: 1, flexDirection: "row" ,justifyContent: "center", alignItems: "center"}}>
            <Pressable style={{ paddingHorizontal: 5, paddingVertical: 10, backgroundColor: "yellow", borderWidth: 2, borderRadius: 5 }} onPress={() => router.push('screens/Login')}>
                <Text>
                    Sign In
                </Text>
            </Pressable>
            <View style={{ margin: 20 }} />
            <Pressable style={{ paddingHorizontal: 5, paddingVertical: 10, backgroundColor: "yellow", borderWidth: 2, borderRadius: 5 }} onPress={() => router.push('screens/Register')}>
                <Text>
                    Register
                </Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default HomeAuthentificate