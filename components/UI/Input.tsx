import { TextInput } from "react-native";
import React, { forwardRef } from "react";
import { Colors } from "@/constants/Colors";

type InputProps = {
    onChangeText: (text: string) => void;
    onPress?: () => void;
    secureTextEntry?: boolean;
    value: string;
    style?: {};
    onFocus?: () => void;
    onBlur?: () => void;
    placeholder?: string;
    autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
    multiline? : boolean;
};

const Input = forwardRef<TextInput, InputProps>(
    (
        {
            onChangeText,
            value,
            onPress,
            secureTextEntry = false,
            style,
            onBlur,
            onFocus,
            placeholder,
            autoCapitalize,
            multiline
        },
        ref
    ) => {
        return (
            <TextInput
                style={[
                    style
                        ? style
                        : {
                            paddingHorizontal: 10,
                            paddingVertical: 10,
                            borderRadius: 5,
                            color: "black",
                            backgroundColor: Colors.light.inputColor,
                        }
                ]}
                onChangeText={(text) => onChangeText(text)}
                onPress={onPress}
                value={value}
                secureTextEntry={secureTextEntry}
                ref={ref}
                onFocus={onFocus}
                onBlur={onBlur}
                placeholder={placeholder}
                autoCapitalize={autoCapitalize}
                placeholderTextColor={"gray"}
                multiline={multiline}
            />
        );
    }
);

Input.displayName = "Input";
export default Input;
