import {View, Text, ActivityIndicator, FlatList, StyleSheet, Button, Pressable, RefreshControl} from "react-native";
import React, {useCallback, useState} from "react";
import {API_URL} from "@env";
import axios from "axios";
import {router, useFocusEffect} from "expo-router";

export type TypeCard = {
    id: number,
    title: string,
    content: string,
    folder_id: string,
    image_url: string
}

const Learn = () => {
    const [cards, setCards] = useState<TypeCard[]>([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            const controller = new AbortController();
            const fetchData = async () => {
                try {
                    setLoading(true);
                    const response = await axios.get(`${API_URL}/learn-new-cards`, {
                        signal: controller.signal
                    })
                    if (response.data.success) {
                        setCards(response.data.data);
                    } else {
                        throw new Error('Invalid data format')
                    }
                } catch (e: any) {
                    console.error(e.response.data.message);
                    setCards([])
                } finally {
                    setLoading(false);
                }
            }
            fetchData();

            return () => {
                controller.abort();
            }
        }, [])
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff"/>;
    }

    return (
        <>
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
                            pathname: '/learn/apprendre',
                            params: {cards: JSON.stringify(cards)}
                        })
                    }>
                        <Text style={style.buttonText}>Apprendre</Text>
                    </Pressable>
                </View> :
                <Text>Pas de carte à apprendre</Text>
            }
        </>
    )
}

export default Learn;

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        backgroundColor: '#ccc',
        margin: 10,
        borderRadius: 10
    },
    cardContainer: {
        flex: 1,
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 5
    },
    title: {
        fontSize: 20,
        paddingTop: 10,
        paddingLeft: 10
    },
    content: {
        paddingLeft: 10,
        paddingBottom: 10
    },
    button: {
        marginHorizontal: 10,
        marginBottom: 10,
        padding: 20,
        borderRadius: 10,
        backgroundColor: "white"
    },
    buttonText: {
        textAlign: "center"
    }
});