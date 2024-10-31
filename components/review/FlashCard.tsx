import React from "react";
import { View, Text, StyleSheet, Animated, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface CardProps {
    rotateAnim: Animated.Value;
    title: string;
    description: string;
    image: string;
    randomColor: string;
}

const FlashCard = ({
    rotateAnim,
    title,
    description,
    image,
    randomColor,
}: CardProps) => {
    const rotateFront = rotateAnim.interpolate({
        inputRange: [0, 180],
        outputRange: ["0deg", "180deg"],
    });

    const rotateBack = rotateAnim.interpolate({
        inputRange: [0, 180],
        outputRange: ["180deg", "360deg"],
    });

    return (
        <View
            style={{
                flex: 1,
                borderRadius: 20,
            }}
        >
            <Animated.View
                style={[styles.card, { transform: [{ rotateY: rotateFront }] }]}
            >
                <LinearGradient
                    colors={[randomColor, "#FFFFFF"]}
                    style={{
                        borderRadius: 20,
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <Text style={styles.cardText}>{title}</Text>
                    <Image style={styles.image} source={{ uri: image }} />
                </LinearGradient>
            </Animated.View>
            <Animated.View
                style={[styles.card, { transform: [{ rotateY: rotateBack }] }]}
            >
                <LinearGradient
                    colors={[randomColor, "#FFFFFF"]}
                    style={{
                        borderRadius: 20,
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <Text style={styles.cardText}>{description}</Text>
                </LinearGradient>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        backfaceVisibility: "hidden",
        width: "100%",
        height: "100%",
        borderRadius: 20,
        shadowColor: "black",
        shadowRadius: 1,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        elevation: 4,
    },
    cardText: {
        paddingTop: 20,
        textAlign: "center",
        fontSize: 24,
        fontWeight: "bold",
    },
    image: {
        marginTop: 80,
        width: "70%",
        aspectRatio: 1,
        alignSelf: "center",
    },
});

export default FlashCard;
