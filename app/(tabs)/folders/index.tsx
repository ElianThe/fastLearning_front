import {
    ActivityIndicator,
    FlatList,
    View,
    TouchableOpacity,
} from "react-native";
import React, {useCallback, useState} from "react";
import {API_URL} from "@env";
import axios from "axios";
import {router, useFocusEffect} from "expo-router";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FolderItem from "@/components/folders/FolderItem";

type FolderProps = {
    id: number;
    name: string;
};

const FolderListScreen = () => {
    const [folders, setFolders] = useState<FolderProps[]>([]);
    const [loading, setLoading] = useState(true);

    const handleDeleteFolder = (folderId: number) => {
        const updatedFolders = folders.filter(folder => folder.id !== folderId);
        setFolders(updatedFolders);
    };

    const fetchData = async () => {
        try {
            console.log("Fetch list Folder fetch Data");
            const response = await axios.get(`${API_URL}/folders-of-user`);
            if (response.data.success) {
                setFolders(response.data.data);
            } else {
                throw new Error('Invalid data format');
            }
        } catch (e: any) {
            console.error(e.response.data.message);
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
        <View style={{position: "relative", flex: 1}}>
            <FlatList
                data={folders}
                renderItem={({item}: { item: FolderProps }) => (
                    <FolderItem item={item} onDelete={handleDeleteFolder} />
                )}
                keyExtractor={item => item.id.toString()}
            />
            <TouchableOpacity onPress={(() => router.push('/folders/CreateFolderScreen'))}
                              style={{position: "absolute", bottom: 30, right: 30}}>
                <FontAwesome5 name="plus-circle" size={60} color="#003049"/>
            </TouchableOpacity>
        </View>
    );
};

export default FolderListScreen;