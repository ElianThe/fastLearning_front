import React, {useState} from "react";
import {Animated, StyleSheet, Text, View} from "react-native";
import ButtonCard from "@/components/ButtonCard";
import RatingButtons from "@/components/RatingButtons";
import Card from "@/components/Card";
import {router} from "expo-router";

const ReviewDeck = ({cards, routerBack}: any) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const rotateAnim = useState(new Animated.Value(0))[0];
    const [flipped, setFlipped] = useState(false);

    const flipCard = () => {
        Animated.timing(rotateAnim, {
            toValue: 180,
            duration: 500,
            useNativeDriver: true,
        }).start();
        setFlipped(true);
    };

    const nextCard = () => {
        const nextIndex = currentIndex + 1;
        if (nextIndex === cards.length && routerBack) {
            router.back();
        } else {
            setCurrentIndex(nextIndex);
            setFlipped(false);
            rotateAnim.setValue(0);
        }
    };

    const currentCard = cards[currentIndex];

    return (
        <View style={styles.container}>
            {currentIndex < cards.length ? (
                <>
                    <Card flipped={flipped} rotateAnim={rotateAnim} title={currentCard.title} description={currentCard.content} image={currentCard.image_url} />
                    {!flipped ?
                        <ButtonCard onPress={flipCard}/> :
                        <RatingButtons onPress={nextCard} id={currentCard.id} />
                    }
                </>
            ) : (
                /* s'il n'y a plus de carte à réviser */
                <Text style={styles.text}>Pas de carte à réviser</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
    }
});

export default ReviewDeck