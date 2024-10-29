import {View, Text, Pressable, SafeAreaView} from "react-native";
import {router} from "expo-router";

const HomeScreen = () => {
    return (
        <SafeAreaView style={{ backgroundColor: "white", flex: 1, justifyContent: "flex-end", paddingVertical: 20, paddingHorizontal: 10 }}>
            <View style={{ margin: 10 }}>
                <Pressable style={{
                    paddingVertical: 15,
                    backgroundColor: "#003049",
                    borderRadius: 5,
                    marginVertical: 20
                }}
                           onPress={() => router.push('screens/auth/LoginScreen')}
                >
                    <Text style={{ textAlign: "center", color: "white", fontSize: 16 }}>
                        Se connecter
                    </Text>
                </Pressable>
                <Pressable style={{
                    paddingVertical: 15,
                    backgroundColor: "#003049",
                    borderRadius: 5
                }}
                           onPress={() => router.push('screens/auth/RegisterScreen')}
                >
                    <Text style={{ textAlign: "center", color: "white", fontSize: 16 }}>
                        S'inscrire
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

export default HomeScreen;