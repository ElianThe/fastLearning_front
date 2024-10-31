import ReviewDeck from "@/components/review/ReviewDeck";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

const AutoEvaluationCardsScreen = () => {
    const { cards } = useLocalSearchParams<{ cards: string }>();
    const parsedCards = cards ? JSON.parse(cards) : [];

    const [cardsToLearn, setCardsToLearn] = useState(parsedCards);

    useEffect(() => {
        if (cardsToLearn.length === 0) {
            router.back();
        }
    }, [cardsToLearn]);

    if (cardsToLearn.length === 0) {
        return null;
    }

    return <ReviewDeck cards={cardsToLearn} handleNoMoreCard={() => setCardsToLearn([])} />;
};

export default AutoEvaluationCardsScreen;
