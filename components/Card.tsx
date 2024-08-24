import React from 'react';
import {View, Text, StyleSheet, Animated, Image} from 'react-native';

interface CardProps {
    flipped: boolean;
    rotateAnim: Animated.Value;
    title: string;
    description: string;
    image: string;
}

const Card = ({flipped, rotateAnim, title, description, image}: CardProps) => {

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
        <Animated.View style={[styles.card, {transform: [{rotateY: rotateInterpolated}]}]}>
            {!flipped ?
                <View>
                    {/* image url in source */}
                    <Text style={styles.cardText}>{title}</Text>
                    <Image style={styles.image} source={{ uri: image }} />
                </View> :
                <Animated.View style={{transform: [{rotateY: textRotation}]}}>
                    <Animated.Text style={[styles.cardText, {opacity: opacityBack}]}>
                        {description}
                    </Animated.Text>
                </Animated.View>
            }
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: 'lightgray',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 20,
    },
    cardText: {
        paddingTop: 20,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
    },
    image : {
        width: '70%',
        height: '70%',
        alignSelf: 'center',
        marginTop: 80,

    }
});

export default Card;
