import React, { useCallback, useState } from "react";
import { API_URL } from "@env";
import axios from "axios";
import ReviewDeck from "@/components/review/ReviewDeck";
import { useFocusEffect } from "expo-router";
import ActivityIndicator from "@/components/UI/ActivityIndicator";
import {
    TextNoCards,
    ViewContainer,
    ViewNoCards,
} from "@/app/(tabs)/review/ReviewFlashCardScreen-styles";

export type FlashCardType = {
    id: number;
    title: string;
    content: string;
    image_url: string;
};

const ReviewFlashCardScreen = () => {
    const [cards, setCards] = useState<FlashCardType[]>([]);
    const [loading, setLoading] = useState(false);

    useFocusEffect(
        useCallback(() => {
            const controller = new AbortController();
            const fetchCards = async () => {
                try {
                    setLoading(true);
                    const response = await axios.get(`${API_URL}/cards-to-review`, {
                        signal: controller.signal,
                    });
                    if (response.data.success) {
                        setCards(response.data.data);
                    } else {
                        throw new Error(response.data.message);
                    }
                } catch (e: any) {
                    setCards([]);
                    console.error(e.response.data.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchCards();

            return () => controller.abort();
        }, []),
    );

    if (loading) {
        return <ActivityIndicator />;
    }

    return (
        <ViewContainer>
            {cards.length > 0 ? (
                <ReviewDeck cards={cards} handleNoMoreCard={() => setCards([])} />
            ) : (
                <ViewNoCards>
                    <TextNoCards>Pas de carte à réviser !</TextNoCards>
                </ViewNoCards>
            )}
        </ViewContainer>
    );
};

export default ReviewFlashCardScreen;
