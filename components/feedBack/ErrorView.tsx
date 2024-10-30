import {View, Text, Pressable, StyleSheet} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import React from "react";
import {Colors} from "@/constants/Colors";

const ErrorView = ({text, onPress}: { text: string, onPress: () => void }) => {
    return (
        <View>
            <View style={{
                borderWidth: 1,
                borderRadius: 5,
                flexDirection: "row",
                marginBottom: 20,
                borderColor: "#f2f2f2"
            }}>
                <View style={{
                    borderLeftWidth: 15,
                    borderColor: "red",
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5
                }}/>
                <View style={{flexDirection: "row", alignItems: "center", margin: 10, justifyContent: "space-around"}}>
                    <MaterialIcons name={'error'} size={24} color={'red'}/>
                    <View style={{flexDirection: "column", marginHorizontal: 15}}>
                        <Text>{text}</Text>
                        <>
                            <View style={styles.viewSignup}>
                                <Text>Vous n'avez pas de compte ? </Text>
                                <Pressable onPress={onPress}>
                                    <Text style={styles.textSignup}>S'inscrire</Text>
                                </Pressable>
                            </View>
                        </>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default ErrorView;

const styles = StyleSheet.create({
    viewSignup: {
        flexDirection: 'row',
    },
    textSignup: {
        color: 'blue'
    },
});