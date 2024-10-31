import React, { PropsWithChildren } from "react";
import {
    Keyboard,
    TouchableWithoutFeedback,
    View,
    StyleSheet,
    Pressable,
    Text,
} from "react-native";
import { router } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Colors } from "@/constants/Colors";

type ModalType = PropsWithChildren<{
    onPress: () => void;
    title: string;
}>;

const Modal = ({ children, onPress, title }: ModalType) => {
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
            <View style={styles.container}>
                <View
                    style={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row",
                        marginBottom: 20,
                    }}
                >
                    <Pressable onPress={() => router.back()}>
                        <FontAwesome
                            name="times-circle"
                            size={40}
                            color={Colors.light.iconAlert}
                        />
                    </Pressable>
                    <Text
                        style={{
                            textAlign: "center",
                            fontSize: 20,
                            fontWeight: "bold",
                        }}
                    >
                        {title}
                    </Text>
                    <Pressable
                        onPress={() => {
                            onPress();
                        }}
                    >
                        <FontAwesome
                            name="check-circle"
                            size={40}
                            color={Colors.light.icon}
                        />
                    </Pressable>
                </View>
                {children}
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Modal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingVertical: 30,
        backgroundColor: "#FFFFFF",
    },
});
