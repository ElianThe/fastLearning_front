import {View, Text, ActivityIndicator, FlatList, StyleSheet, Pressable} from "react-native";
import React, {useCallback, useState} from "react";
import {API_URL} from "@env";
import axios from "axios";
import {router, useFocusEffect} from "expo-router";
import {Colors} from "@/constants/Colors";

type TypeCard = {
    id: number,
    title: string,
    content: string,
    folder_id: string,
    image_url: string
}

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
                    })
                    if (response.data.success) {
                        setCards(response.data.data);
                    } else {
                        throw new Error(response.data.message)
                    }
                } catch (e: any) {
                    console.error(e.response.data.message);
                    setCards([]);
                } finally {
                    setLoading(false);
                }
            }
            fetchLearnNewCards();

            return () => controller.abort();
        }, [])
    );

    if (loading) {
        return <ActivityIndicator size="large" color={Colors.light.activityIndicator} /> ;
    }

    return (
        <View style={{ backgroundColor: "white", flex: 1 }}>
            {cards.length > 0 ?
                <View style={style.container}>
                    <FlatList
                        data={cards}
                        renderItem={({item}: { item: TypeCard }) => (
                            <View style={style.cardContainer}>
                                <Text style={style.title}>
                                    {item.title}
                                </Text>
                                <Text style={style.content}>
                                    {item.content}
                                </Text>
                            </View>
                        )}
                        keyExtractor={item => item.id.toString()}
                    />
                    <Pressable style={style.button} onPress={() =>
                        router.push({
                            pathname: '/learn/cardLearning',
                            params: {cards: JSON.stringify(cards)}
                        })
                    }>
                        <Text style={style.buttonText}>Apprendre</Text>
                    </Pressable>
                </View> :
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 20 }}>Pas de carte à apprendre</Text>
                </View>
            }
        </View>
    );
}

export default CardListScreen;

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        backgroundColor: '#F2F2F2',
        margin: 10,
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
    },
    cardContainer: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 10,
        marginHorizontal: 10,
        borderRadius: 5
    },
    title: {
        fontSize: 20,
        paddingTop: 10,
        paddingLeft: 10
    },
    content: {
        paddingLeft: 10,
        paddingBottom: 10,
    },
    button: {
        margin: 10,
        padding: 15,
        borderRadius: 10,
        backgroundColor: "#003049"
    },
    buttonText: {
        textAlign: "center",
        color: "#FFFFFF",
        fontSize: 16,
    }
});