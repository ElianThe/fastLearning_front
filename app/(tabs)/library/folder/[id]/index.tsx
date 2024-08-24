import {View, Text, FlatList, ActivityIndicator, StyleSheet, Pressable} from "react-native";
import {router, useFocusEffect, useLocalSearchParams, useNavigation} from "expo-router";
import {useCallback, useState} from "react";
import axios from "axios";
import {API_URL} from "@env";
import {AntDesign} from "@expo/vector-icons";

interface Card {
    id: number;
    title: string;
    content: string;
    folder_id: number;
}

export default function folder() {
    const {id, name} = useLocalSearchParams<{ id: string, name: string }>();
    const navigation = useNavigation();
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);

    // recharger les cartes à chaque fois que l'écran est affiché
    // pour éviter de recharger les cartes à chaque fois que l'écran est affiché
    useFocusEffect(
        // on utilise useCallback pour éviter de recharger les cartes à chaque fois que l'écran est affiché
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
            // Cette fonction sera appelée chaque fois que l'écran devient actif
            fetchCards();
        }, [id])
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff"/>;
    }

    return (
        <View style={styles.container}>
            <View>
                <Pressable
                    style={styles.containerAddCard}
                    onPress={() => router.push({
                        pathname : '/library/folder/[id]/createCard',
                        params: {id}
                    })}
                >
                    <Text style={styles.titleAddCard}>
                        Ajouter une carte
                    </Text>
                </Pressable>
            </View>
            {/* pour chaque carte, afficher le titre et le contenu */}
            <FlatList
                data={cards}
                renderItem={({item}: { item: Card }) => (
                    <Pressable style={styles.card}>
                        <View>
                            <Text style={styles.title}>
                                {item.title}
                            </Text>
                            <Text style={styles.subTitle}>
                                {item.content}
                            </Text>
                        </View>
                        <AntDesign name="pluscircle" size={24} color="black"/>
                    </Pressable>
                )}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
}

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