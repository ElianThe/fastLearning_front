import React, { PropsWithChildren } from "react";
import {
    Keyboard,
    TouchableWithoutFeedback,
    Pressable,
} from "react-native";
import { router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants/Colors";
import { TitleModal, ViewHeader, ViewModalContainer } from "@/components/UI/Modal-styles";

type ModalType = PropsWithChildren<{
    onPress: () => void;
    title: string;
}>;

const Modal = ({ children, onPress, title }: ModalType) => {
    return (
        <TouchableWithoutFeedback accessibilityLabel={"Modal"} onPress={() => Keyboard.dismiss()}>
            <ViewModalContainer>
                <ViewHeader>
                    <Pressable accessibilityLabel={"closebutton"} onPress={() => router.back()} accessibilityRole={"button"}>
                        <AntDesign name="closecircle" size={40} color={Colors.light.iconAlert} />
                    </Pressable>
                    <TitleModal accessibilityRole={"text"}>
                        {title}
                    </TitleModal>
                    <Pressable accessibilityLabel={"checkbutton"} onPress={() => onPress()}>
                        <AntDesign name="checkcircle" size={40} color={Colors.light.icon} />
                    </Pressable>
                </ViewHeader>
                {children}
            </ViewModalContainer>
        </TouchableWithoutFeedback>
    );
};

export default Modal;
