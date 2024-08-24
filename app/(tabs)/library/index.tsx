import {Text, ActivityIndicator, FlatList, StyleSheet, Pressable} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import {API_URL} from "@env";
import axios from "axios";
import {router, useFocusEffect} from "expo-router";

type Folder = {
    id: number;
    name: string;
};

export default function index() {
    const [folders, setFolders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}/folders-of-user`);
            if (response.data.success) {
                setFolders(response.data.data);
            } else {
                throw new Error('Invalid data format');
            }
        } catch (e: any) {
            console.log(e.response.data.message);
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
        <FlatList
            data={folders}
            renderItem={({item}: { item: Folder }) => (
                <Pressable
                    style={styles.folder}
                    onPress={() =>
                        router.push({
                            pathname:'/library/folder/[id]',
                            params: {id: item.id, name: item.name}
                        })
                    }
                >
                    <Text>{item.name}</Text>
                </Pressable>
            )}
            keyExtractor={item => item.id.toString()}
        />
    );
};

const styles = StyleSheet.create({
    folder: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});