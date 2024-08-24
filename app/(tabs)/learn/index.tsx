import {View, Text, ActivityIndicator, FlatList, StyleSheet, Button, Pressable, RefreshControl} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import {API_URL} from "@env";
import axios from "axios";
import {router, useFocusEffect} from "expo-router";
import Card from "@/components/Card";

interface Cards {
    id: number,
    title: string,
    content: string
}

export default function Learn() {
    const [cards, setCards] = useState<Cards[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
        setRefreshing(false);
    }

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}/learn-new-cards`)
            if (response.data.success) {
                setCards(response.data.data);
            } else {
                throw new Error('Invalid data format')
            }
        } catch (e: any) {
            console.log(e.response.data.message);
            setCards([])
        } finally {
            setLoading(false);
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff"/>;
    }

    return (
        <View style={style.container}>
            <FlatList
                refreshing={refreshing}
                onRefresh={onRefresh}
                data={cards}
                renderItem={({item}: { item: Cards }) => (
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
            <Pressable style={style.button} onPress={
                () => router.push({
                    pathname: '/learn/apprendre',
                    params: {cards: JSON.stringify(cards)}

                })
            }>
                <Text style={style.buttonText}>Apprendre</Text>
            </Pressable>
        </View>
    )
}

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