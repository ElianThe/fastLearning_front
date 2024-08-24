import ReviewDeck from "@/components/ReviewDeck";
import {useLocalSearchParams} from "expo-router";
import card from "@/components/Card";

export default function AutoEvaluation() {
    const {cards} = useLocalSearchParams<{ cards: string }>();
    const parsedCards = cards ? JSON.parse(cards) : [];
    return (
        <ReviewDeck data={parsedCards}/>
    );
}