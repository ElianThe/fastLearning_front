import { FlatList, View, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import { API_URL } from "@env";
import axios from "axios";
import { router, useFocusEffect } from "expo-router";
import FolderItem from "@/components/folders/FolderItem";
import ActivityIndicator from "@/components/UI/ActivityIndicator";
import { IconCirclePlus } from "@/components/UI/Icons/CirclePlus";
import styled from "styled-components/native";

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
        <ContainerView>
            <FlatList
                data={folders}
                renderItem={({ item }: { item: FolderProps }) => (
                    <FolderItem item={item} onDelete={handleDeleteFolder} />
                )}
                keyExtractor={(item) => item.id.toString()}
            />
            <IconTouchableOpacity onPress={() => router.push("/folders/CreateFolderScreen")}>
                <IconCirclePlus />
            </IconTouchableOpacity>
        </ContainerView>
    );
};

export default FolderListScreen;

const ContainerView = styled.View`
    flex: 1;
`;

const IconTouchableOpacity = styled.TouchableOpacity`
    position: absolute;
    bottom: 30px;
    right: 30px;
`;
