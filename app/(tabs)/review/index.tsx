import {ActivityIndicator} from "react-native";
import React, {useCallback, useState} from "react";
import Card from "@/components/review/Card";
import {API_URL} from "@env";
import axios from "axios";
import ReviewDeck from "@/components/review/ReviewDeck";
import {useFocusEffect} from "expo-router";

interface Card {
    title: string;
    content: string;
    image_url: string;
}

const HomeScreen = () => {
    const [data, setData] = useState<Card[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}/cards-to-review`);
            // Vérifie le format de la réponse
            if (response.data.success) {
                setData(response.data.data);
            } else {
                throw new Error('Invalid data format');
            }
        } catch (e: any) {
            console.log(e.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch the cards to review
    useFocusEffect(
        useCallback(()=> {
            fetchData();
        }, [])
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff"/>;
    }

    return (
        <ReviewDeck cards={data} />
    )
}

export default HomeScreen;