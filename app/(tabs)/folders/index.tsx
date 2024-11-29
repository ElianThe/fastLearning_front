import { FlatList, View, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import { API_URL } from "@env";
import axios from "axios";
import { router, useFocusEffect } from "expo-router";
import FolderItem from "@/components/folders/FolderItem";
import { Colors } from "@/constants/Colors";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import ActivityIndicator from "@/components/UI/ActivityIndicator";

type FolderProps = {
    id: number;
    name: string;
};

const FolderListScreen = () => {
    const [folders, setFolders] = useState<FolderProps[]>([]);
    const [loading, setLoading] = useState(false);

    const handleDeleteFolder = (folderId: number) => {
        const updatedFolders = folders.filter((folder) => folder.id !== folderId);
        setFolders(updatedFolders);
    };

    useFocusEffect(
        useCallback(() => {
            const controller = new AbortController();
            const fetchFolderList = async () => {
                try {
                    setLoading(true);
                    const response = await axios.get(`${API_URL}/folders-of-user`, {
                        signal: controller.signal,
                    });
                    if (response.data.success) {
                        setFolders(response.data.data);
                    } else {
                        throw new Error(response.data.message);
                    }
                } catch (e: any) {
                    console.error(e.response.data.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchFolderList();
            return () => controller.abort();
        }, []),
    );

    if (loading) {
        return <ActivityIndicator />;
    }

    return (
        <View style={{ position: "relative", flex: 1 }}>
            <FlatList
                data={folders}
                renderItem={({ item }: { item: FolderProps }) => (
                    <FolderItem item={item} onDelete={handleDeleteFolder} />
                )}
                keyExtractor={(item) => item.id.toString()}
            />
            <TouchableOpacity
                onPress={() => router.push("/folders/CreateFolderScreen")}
                style={{ position: "absolute", bottom: 30, right: 30 }}
            >
                <FontAwesome6 name="circle-plus" size={50} color={Colors.light.icon} />
            </TouchableOpacity>
        </View>
    );
};

export default FolderListScreen;
