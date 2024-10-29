import ReviewDeck from "@/components/review/ReviewDeck";
import {useLocalSearchParams} from "expo-router";

const AutoEvaluationScreen = () => {
    const {cards} = useLocalSearchParams<{ cards: string }>();
    const parsedCards = cards ? JSON.parse(cards) : [];
    return (
        <ReviewDeck cards={parsedCards} routerBack />
    );
}

export default AutoEvaluationScreen;