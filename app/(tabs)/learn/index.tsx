import { Text, FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import { API_URL } from "@env";
import axios from "axios";
import { router, useFocusEffect } from "expo-router";
import ActivityIndicator from "@/components/UI/ActivityIndicator";
import styled from "styled-components/native";

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
                        signal: controller.signal
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
        }, [])
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
                                pathname: "/learn/cardLearning",
                                params: { cards: JSON.stringify(cards) }
                            })
                        }
                    >
                        <TextLearn>Apprendre</TextLearn>
                    </ButtonLearn>
                </ViewCardList>
            ) : (
                <ViewNoCard>
                    <TextNoCard>Pas de carte à apprendre</TextNoCard>
                </ViewNoCard>
            )}
        </ViewContainer>
    );
};

export default CardListScreen;

const ViewContainer = styled.View`
    background-color: white;
    flex: 1;
`;

const ViewCardList = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: space-around;
    background-color: #F2F2F2;
    margin: 10px;
    border-radius: 10px;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
    elevation: 3;
`;

const ViewCard = styled.View`
    flex: 1;
    background-color: white;
    margin: 10px 10px 0;
    border-radius: 5px;
    padding: 10px;
`;

const TitleCard = styled.Text`
    font-size: 20px;
`;

const ViewNoCard = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const TextNoCard = styled.Text`
    font-size: 20px;
`;

const ButtonLearn = styled.Pressable`
    margin: 10px;
    padding: 15px;
    border-radius: 10px;
    background-color: #003049;
`;

const TextLearn = styled.Text`
    text-align: center;
    color: #FFFFFF;
    font-size: 16px;
`;
