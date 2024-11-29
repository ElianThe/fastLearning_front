import React from "react";
import { Animated } from "react-native";
import {
    AnimatedViewStyled,
    ImageCard,
    LinearGradientStyled,
    TextCard,
    ViewContainer,
} from "@/components/review/FlashCard/FlashCard-styles";

type CardProps = {
    rotateAnim: Animated.Value;
    title: string;
    description: string;
    image: string;
};

const FlashCard = ({ rotateAnim, title, description, image }: CardProps) => {
    const rotateFront = rotateAnim.interpolate({
        inputRange: [0, 180],
        outputRange: ["0deg", "180deg"],
    });

    const rotateBack = rotateAnim.interpolate({
        inputRange: [0, 180],
        outputRange: ["180deg", "360deg"],
    });

    return (
        <ViewContainer>
            <AnimatedViewStyled style={{ transform: [{ rotateY: rotateFront }] }}>
                <LinearGradientStyled image={image !== null} colors={["#136B8A", "#051C24"]}>
                    <TextCard image={image !== null}>{title}</TextCard>
                    {image && <ImageCard source={{ uri: image }} />}
                </LinearGradientStyled>
            </AnimatedViewStyled>
            <AnimatedViewStyled style={{ transform: [{ rotateY: rotateBack }] }}>
                <LinearGradientStyled colors={["#136B8A", "#051C24"]}>
                    <TextCard>{description}</TextCard>
                </LinearGradientStyled>
            </AnimatedViewStyled>
        </ViewContainer>
    );
};

export default FlashCard;
