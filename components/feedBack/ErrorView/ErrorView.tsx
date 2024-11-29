import { MaterialIcons } from "@expo/vector-icons";
import React, { PropsWithChildren } from "react";
import {
    ViewBorderLeftRed,
    ViewContainer,
    ViewContent,
    ViewRight,
} from "@/components/feedBack/ErrorView/ErrorView-styles";

type ErrorViewProps = PropsWithChildren<{}>;

const ErrorView = ({ children }: ErrorViewProps) => {
    return (
        <ViewContainer>
            <ViewBorderLeftRed />
            <ViewRight>
                <MaterialIcons name={"error"} size={24} color={"red"} />
                <ViewContent>{children}</ViewContent>
            </ViewRight>
        </ViewContainer>
    );
};

export default ErrorView;
