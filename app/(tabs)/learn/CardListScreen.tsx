import { Text, FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import { API_URL } from "@env";
import axios from "axios";
import { router, useFocusEffect } from "expo-router";
import ActivityIndicator from "@/components/UI/ActivityIndicator";
import {
    ButtonLearn,
    TextLearn, TextNoCards,
    TitleCard,
    ViewCard,
    ViewCardList,
    ViewContainer,
    ViewNoCards
} from "@/app/(tabs)/learn/CardListScreen-styles";

type TypeCard = {
    id: number;
    title: string;
    content: string;
    folder_id: string;
    image_url: string;
};

const CardListScreen = () => {
    const [cards, setCards] = useState<TypeCard[]>([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            const controller = new AbortController();
            const fetchLearnNewCards = async () => {
                try {
                    setLoading(true);
                    const response = await axios.get(`${API_URL}/learn-new-cards`, {
                        signal: controller.signal,
                    });
                    if (response.data.success) {
                        setCards(response.data.data);
                    } else {
                        throw new Error(response.data.message);
                    }
                } catch (e: any) {
                    console.error(e.response.data.message);
                    setCards([]);
                } finally {
                    setLoading(false);
                }
            };
            fetchLearnNewCards();

            return () => controller.abort();
        }, []),
    );

    if (loading) {
        return <ActivityIndicator />;
    }

    return (
        <ViewContainer>
            {cards.length > 0 ? (
                <ViewCardList>
                    <FlatList
                        data={cards}
                        renderItem={({ item }: { item: TypeCard }) => (
                            <ViewCard>
                                <TitleCard>{item.title}</TitleCard>
                                <Text>{item.content}</Text>
                            </ViewCard>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
                    <ButtonLearn
                        onPress={() =>
                            router.push({
                                pathname: "/learn/cardLearning/AutoEvaluationCardsScreen",
                                params: { cards: JSON.stringify(cards) },
                            })
                        }
                    >
                        <TextLearn>Apprendre</TextLearn>
                    </ButtonLearn>
                </ViewCardList>
            ) : (
                <ViewNoCards>
                    <TextNoCards>Pas de carte à apprendre</TextNoCards>
                </ViewNoCards>
            )}
        </ViewContainer>
    );
};

export default CardListScreen;
