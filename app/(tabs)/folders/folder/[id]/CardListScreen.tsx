import { FlatList } from "react-native";
import { router, useFocusEffect, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useCallback, useState } from "react";
import axios from "axios";
import { API_URL } from "@env";
import CardItem from "@/components/folders/CardItem";
import ActivityIndicator from "@/components/UI/ActivityIndicator";
import { IconCirclePlus } from "@/components/UI/Icons/CirclePlus";
import { ButtonCirclePlus, ViewContainer } from "@/app/(tabs)/folders/folder/[id]/CreateListScreen-styles";

type Card = {
    id: number;
    title: string;
    content: string;
    folder_id: number;
};

const CardListScreen = () => {
    const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
    const navigation = useNavigation();
    const [cards, setCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState(true);

    const handleDeleteCard = (cardId: number) => {
        const filterCards = cards.filter((card) => card.id !== cardId);
        setCards(filterCards);
    };

    useFocusEffect(
        useCallback(() => {
            navigation.setOptions({
                headerTitle: `${name}`,
            });
            const fetchCards = async () => {
                try {
                    const response = await axios.get(`${API_URL}/folders/${id}/cards`);
                    if (response.data.success) {
                        setCards(response.data.data);
                    } else {
                        throw new Error("Invalid data format");
                    }
                } catch (e: any) {
                    console.log(e.response.data.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchCards();
        }, [id, name, navigation]),
    );

    if (loading) {
        return <ActivityIndicator />;
    }
    return (
        <ViewContainer>
            <FlatList
                data={cards}
                renderItem={({ item }: { item: Card }) => (
                    <CardItem item={item} onDelete={handleDeleteCard} />
                )}
                keyExtractor={(item) => item.id.toString()}
            />
            <ButtonCirclePlus
                onPress={() =>
                    router.push({
                        pathname: "/folders/folder/[id]/CreateCardScreen",
                        params: { id },
                    })
                }
            >
                <IconCirclePlus />
            </ButtonCirclePlus>
        </ViewContainer>
    );
};

export default CardListScreen;
