import React, { useState } from "react";
import { Animated } from "react-native";
import FlipCardButton from "@/components/review/FlipCardButton/FlipCardButton";
import RatingCardButtons from "@/components/review/RatingCardButtons/RatingCardButtons";
import FlashCard from "@/components/review/FlashCard/FlashCard";
import { FlashCardType } from "@/app/(tabs)/review";
import styled from "styled-components/native";

type ReviewDeskProps = {
    cards: FlashCardType[];
    handleNoMoreCard: () => void;
};

const ReviewDeck = ({ cards, handleNoMoreCard }: ReviewDeskProps) => {
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
        if (nextIndex === cards.length) {
            handleNoMoreCard();
        } else {
            setCurrentIndex(nextIndex);
            setFlipped(false);
            rotateAnim.setValue(0);
        }
    };

    const currentCard = cards[currentIndex];

    return (
        <ViewContainer>
            <FlashCard
                title={currentCard.title}
                image={currentCard.image_url}
                description={currentCard.content}
                rotateAnim={rotateAnim}
            />
            {!flipped ? (
                <FlipCardButton onPress={flipCard} />
            ) : (
                <RatingCardButtons onPress={nextCard} id={currentCard.id} />
            )}
        </ViewContainer>
    );
};

export default ReviewDeck;

const ViewContainer = styled.View`
    flex: 1;
    padding: 20px;
    background-color: white;
`;
