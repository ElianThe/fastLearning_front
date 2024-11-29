import styled from "styled-components/native";
import { Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export const ViewContainer = styled.View`
    flex: 1;
    border-radius: 20px;
`;

export const AnimatedViewStyled = styled(Animated.View)`
    flex: 1;
    align-items: center;
    justify-content: center;
    position: absolute;
    backface-visibility: hidden;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    elevation: 4;
`;

type TypeLinearGradientFront = {
    image?: boolean;
};

export const LinearGradientStyled = styled(LinearGradient)<TypeLinearGradientFront>`
    justify-content: ${({ image }) => (image ? "start" : "center")};
    border-radius: 20px;
    width: 100%;
    height: 100%;
`;

type TypeTextCard = {
    image?: boolean;
};

export const TextCard = styled.Text<TypeTextCard>`
    padding: ${({ image }) => (image ? "30px" : "0")};
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: #ffffff;
`;

export const ImageCard = styled.Image`
    margin-top: 80px;
    width: 70%;
    aspect-ratio: 1;
    align-self: center;
`;
