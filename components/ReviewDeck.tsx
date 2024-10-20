import React, {useState} from "react";
import {Animated, StyleSheet, Text, View} from "react-native";
import ButtonCard from "@/components/ButtonCard";
import RatingButtons from "@/components/RatingButtons";
import Card from "@/components/Card";
import {router} from "expo-router";

const colorsCardRandom = [
    '#D8E5F7',
    '#C1E7E3',
    '#DCFFFB',
    '#FEDCDB',
    '#FDF1C9',
    '#F2D9EF',
    '#D8EEDF'
];

const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colorsCardRandom.length);
    return colorsCardRandom[randomIndex];
};

const ReviewDeck = ({cards, routerBack}: any) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const rotateAnim = useState(new Animated.Value(0))[0];
    const [flipped, setFlipped] = useState(false);
    const [backgroundColorCard, setBackgroundColorCard] = useState(getRandomColor());

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
            setBackgroundColorCard(getRandomColor());
            rotateAnim.setValue(0);
        }
    };

    const currentCard = cards[currentIndex];

    return (
        <View style={styles.container}>
            {currentIndex < cards.length ? (
                <>
                    <Card title={currentCard.title} image={currentCard.image_url}
                          description={currentCard.content}
                          randomColor={backgroundColorCard} rotateAnim={rotateAnim} />
                    {!flipped ?
                        <ButtonCard onPress={flipCard}/> :
                        <RatingButtons onPress={nextCard} id={currentCard.id}/>
                    }
                </>
            ) : (
                <View style={styles.containerText}>
                    <Text style={styles.text}>Pas de carte à réviser</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
    containerText: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 20,
    }
});

export default ReviewDeck