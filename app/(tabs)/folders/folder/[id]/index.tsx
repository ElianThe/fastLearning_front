import { View, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { router, useFocusEffect, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useCallback, useState } from "react";
import axios from "axios";
import { API_URL } from "@env";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import CardItem from "@/components/folders/CardItem";
import { Colors } from "@/constants/Colors";

interface Card {
    id: number;
    title: string;
    content: string;
    folder_id: number;
}

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
        }, []),
    );

    if (loading) {
        return <ActivityIndicator size="large" color={Colors.light.activityIndicator} />;
    }
    return (
        <View style={{ flex: 1, padding: 10, backgroundColor: "#f0f0f0" }}>
            <FlatList
                data={cards}
                renderItem={({ item }: { item: Card }) => (
                    <CardItem item={item} onDelete={handleDeleteCard} />
                )}
                keyExtractor={(item) => item.id.toString()}
            />
            <TouchableOpacity
                onPress={() =>
                    router.push({
                        pathname: "/folders/folder/[id]/CreateCardScreen",
                        params: { id },
                    })
                }
                style={{ position: "absolute", bottom: 30, right: 30 }}
            >
                <FontAwesome5 name="plus-circle" size={60} color={Colors.light.icon} />
            </TouchableOpacity>
        </View>
    );
};

export default CardListScreen;
