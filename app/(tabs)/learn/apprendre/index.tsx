import ReviewDeck from "@/components/ReviewDeck";
import {useLocalSearchParams} from "expo-router";

const AutoEvaluation = () => {
    const {cards} = useLocalSearchParams<{ cards: string }>();
    const parsedCards = cards ? JSON.parse(cards) : [];
    return (
        <ReviewDeck cards={parsedCards} routerBack />
    );
}

export default AutoEvaluation;