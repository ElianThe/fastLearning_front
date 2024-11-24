import ErrorView from "@/components/feedBack/ErrorView/ErrorView";
import { Pressable, Text } from "react-native";
import React from "react";
import { ViewError } from "@/components/feedBack/ErrorView/ErrorView-styles";
import TextLink from "@/components/UI/TextLink";

type TypeErrorViewAuth = {
    error: string;
    text: string;
    routerLink: () => void;
    textLink : string;
};

const ErrorViewAuth = ({error, text, routerLink, textLink}: TypeErrorViewAuth) => {
    return (
        <ErrorView>
            <>
                <Text>{error}</Text>
                <ViewError>
                    <Text>{text} </Text>
                    <Pressable onPress={routerLink}>
                        <TextLink>{textLink}</TextLink>
                    </Pressable>
                </ViewError>
            </>
        </ErrorView>
    );
};

export default ErrorViewAuth;
