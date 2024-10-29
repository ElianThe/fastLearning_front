import {View, Text, FlatList, ActivityIndicator, StyleSheet, Pressable, TouchableOpacity} from "react-native";
import {router, useFocusEffect, useLocalSearchParams, useNavigation} from "expo-router";
import React, {useCallback, useRef, useState} from "react";
import axios from "axios";
import {API_URL} from "@env";
import Feather from "@expo/vector-icons/Feather";
import {BottomSheetModal} from "@gorhom/bottom-sheet";
import CustomBottomSheetModal from "@/components/UI/CustomBottomSheetModal";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

interface Card {
    id: number;
    title: string;
    content: string;
    folder_id: number;
}

const CardListScreen = () => {
    const {id, name} = useLocalSearchParams<{ id: string, name: string }>();
    const navigation = useNavigation();
    const [cards, setCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState(true);

    const handleDeleteCard = (cardId: number) => {
        const filterCards = cards.filter(card => card.id !== cardId);
        setCards(filterCards);
    }

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
                        throw new Error('Invalid data format');
                    }
                } catch (e: any) {
                    console.log(e.response.data.message);
                } finally {
                    setLoading(false);
                }
            }
            fetchCards();
        }, [id])
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff"/>;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={cards}
                renderItem={({item}: { item: Card }) => (
                    <Card item={item} onDelete={handleDeleteCard}/>
                )}
                keyExtractor={item => item.id.toString()}
            />
            <TouchableOpacity onPress={() => router.push({pathname: '/folders/folder/[id]/CreateCardScreen', params: {id}})}
                              style={{position: "absolute", bottom: 30, right: 30}}>
                <FontAwesome5 name="plus-circle" size={60} color="#003049"/>
            </TouchableOpacity>
        </View>
    );
}

const Card = ({item, onDelete}: { item: Card, onDelete: (cardId: number) => void }) => {

    const bottomSheetRef = useRef<BottomSheetModal>(null);

    const handleClose = () => {
        bottomSheetRef.current?.close();
    }

    const deleteCard = async () => {
        try {
            const response = await axios.delete(`${API_URL}/cards/${item.id}`);
            if (response.data.success) {
                alert('Supression de la carte réussit avec succès !');
                onDelete(item.id);
            } else {
                throw new Error('Error de la suppression');
            }
        } catch (err) {
            console.log(err);
        }
        handleClose();
    }

    const updateCard = () => {
        handleClose();
    }

    const data = [
        {
            key: "0",
            title: "Supprimer la carte",
            callback: deleteCard
        },
        {
            key: "2",
            title: "close",
            callback: handleClose
        }
    ];

    return (
        <>
            <Pressable style={styles.card}>
                <View>
                    <Text style={styles.title}>
                        {item.title}
                    </Text>
                    <Text style={styles.subTitle}>
                        {item.content}
                    </Text>
                </View>
                <Pressable onPress={() => bottomSheetRef.current?.present()}>
                    <Feather name="more-horizontal" size={24} color="black"/>
                </Pressable>
            </Pressable>
            <CustomBottomSheetModal ref={bottomSheetRef} data={data}/>
        </>
    );
}

export default CardListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    containerAddCard: {
        backgroundColor: '#fff',
        marginVertical: 10,
        marginHorizontal: 5,
        padding: 15,
    },
    titleAddCard: {
        textAlign: 'center',
        fontSize: 20,
        color: '#000',
    },
    card: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        color: '#000',
    },
    subTitle: {
        fontSize: 15,
        color: '#666',
    }
});