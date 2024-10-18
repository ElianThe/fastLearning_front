import React from 'react';
import {View, Text, StyleSheet, Animated, Image} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";

interface CardProps {
    flipped: boolean;
    rotateAnim: Animated.Value;
    title: string;
    description: string;
    image: string;
    colorCard: string;
}

const Card = ({flipped, rotateAnim, title, description, image, colorCard}: CardProps) => {

    const rotateInterpolated = rotateAnim.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg'],
    });

    const opacityBack = rotateAnim.interpolate({
        inputRange: [90, 180],
        outputRange: [0, 1], // Devient visible après 90 degrés
    });

    const textRotation = rotateAnim.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '-180deg'], // Inverser le texte
    });

    return (
        <Animated.View style={[{transform: [{rotateY: rotateInterpolated}]}, styles.card]}>
            <LinearGradient colors={[colorCard, '#FFFFFF']} style={{borderRadius: 20}}>
                {!flipped ?
                    <View>
                        {/* image url in source */}
                        <Text style={styles.cardText}>{title}</Text>
                        <Image style={styles.image} source={{uri: image}}/>
                    </View>
                    :
                    <Animated.View>
                        <Animated.Text
                            style={[styles.cardText, {opacity: opacityBack}, {transform: [{rotateY: textRotation}]}]}>
                            {description}
                        </Animated.Text>
                    </Animated.View>
                }
            </LinearGradient>
        </Animated.View>

    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
        backgroundColor: "white",
        flex: 1,
        shadowColor: "black",
        shadowRadius: 1,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.5,
        elevation: 4
    },
    cardText: {
        paddingTop: 20,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
    },
    image: {
        marginTop: 80,
        width: "70%",
        aspectRatio: 1,
        alignSelf: "center"
    }
});

export default Card;
