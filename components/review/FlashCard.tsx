import React from "react";
import { View, Text, StyleSheet, Animated, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

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
        <View
            style={{
                flex: 1,
                borderRadius: 20,
            }}
        >
            <Animated.View style={[styles.card, { transform: [{ rotateY: rotateFront }] }]}>
                <LinearGradient
                    colors={["#136B8A", "#051C24"]}
                    style={[
                        {
                            borderRadius: 20,
                            width: "100%",
                            height: "100%",
                        },
                        image === null && { justifyContent: "center" },
                    ]}
                >
                    <Text style={[styles.cardText, image !== null && { paddingTop: 20 }]}>
                        {title}
                    </Text>
                    {image && <Image style={styles.image} source={{ uri: image }} />}
                </LinearGradient>
            </Animated.View>
            <Animated.View style={[styles.card, { transform: [{ rotateY: rotateBack }] }]}>
                <LinearGradient
                    colors={["#136B8A", "#051C24"]}
                    style={{
                        borderRadius: 20,
                        width: "100%",
                        height: "100%",
                        justifyContent: "center",
                    }}
                >
                    <Text style={[styles.cardText, image !== null && { paddingTop: 20 }]}>
                        {description}
                    </Text>
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
        textAlign: "center",
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    image: {
        marginTop: 80,
        width: "70%",
        aspectRatio: 1,
        alignSelf: "center",
    },
});

export default FlashCard;
