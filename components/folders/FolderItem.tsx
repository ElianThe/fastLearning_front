import React, { useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import axios from "axios";
import { API_URL } from "@env";
import { router } from "expo-router";
import { Pressable, Text } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import CustomBottomSheetModal from "@/components/UI/BottomSheetModal/CustomBottomSheetModal";
import styled from "styled-components/native";

type FolderProps = {
    id: number;
    name: string;
};

type FolderItemProps = {
    item: FolderProps;
    onDelete: (folderId: number) => void;
};

const FolderItem = ({ item, onDelete }: FolderItemProps) => {
    const bottomSheetRef = useRef<BottomSheetModal>(null);

    const handleOpen = () => {
        bottomSheetRef.current?.present();
    };

    const handleClose = () => {
        bottomSheetRef.current?.close();
    };

    const deleteFolder = async () => {
        try {
            const response = await axios.delete(`${API_URL}/folders/${item.id}`);
            if (response.data.success) {
                alert("suppression du dossier");
                onDelete(item.id);
            } else {
                alert("ça n'a pas fonctionné");
            }
        } catch (err) {
            console.error(err);
        }
        handleClose();
    };

    const actionsBottomModal = [
        {
            key: "0",
            title: "Supprimer le dossier",
            callback: deleteFolder,
        },
        {
            key: "1",
            title: "Modifier le dossier",
            callback: () => {
                handleClose();
                router.push({
                    pathname: "/folders/FolderEditScreen",
                    params: { id: item.id },
                });
            },
        },
        {
            key: "2",
            title: "Annuler",
            callback: handleClose,
        },
    ];

    return (
        <>
            <FolderItemPressable
                onPress={() =>
                    router.push({
                        pathname: "/folders/folder/[id]/CardListScreen",
                        params: { id: item.id, name: item.name },
                    })
                }
            >
                <Text>{item.name}</Text>
                <Pressable accessibilityLabel={"More options"} onPress={handleOpen}>
                    <Feather name="more-horizontal" size={24} color="black" />
                </Pressable>
            </FolderItemPressable>

            <CustomBottomSheetModal ref={bottomSheetRef} actions={actionsBottomModal} />
        </>
    );
};

export default FolderItem;

const FolderItemPressable = styled.Pressable`
    padding: 20px;
    border-bottom-width: 1px;
    border-bottom-color: #ccc;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
