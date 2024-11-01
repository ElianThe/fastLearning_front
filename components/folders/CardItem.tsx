import React, { useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import axios from "axios";
import { API_URL } from "@env";
import { Pressable, Text, View, StyleSheet } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import CustomBottomSheetModal from "@/components/UI/CustomBottomSheetModal";

interface Card {
    id: number;
    title: string;
    content: string;
    folder_id: number;
}

type ActionsType = {
    key: string;
    title: string;
    callback: () => void;
};

const CardItem = ({ item, onDelete }: { item: Card; onDelete: (cardId: number) => void }) => {
    const bottomSheetRef = useRef<BottomSheetModal>(null);

    const handleClose = () => {
        bottomSheetRef.current?.close();
    };

    const deleteCard = async () => {
        try {
            const response = await axios.delete(`${API_URL}/cards/${item.id}`);
            if (response.data.success) {
                alert("Supression de la carte réussit avec succès !");
                onDelete(item.id);
            } else {
                throw new Error("Error de la suppression");
            }
        } catch (err) {
            console.log(err);
        }
        handleClose();
    };

    const actionsBottomModal: ActionsType[] = [
        {
            key: "0",
            title: "Supprimer la carte",
            callback: deleteCard,
        },
        {
            key: "2",
            title: "Annuler",
            callback: handleClose,
        },
    ];

    return (
        <>
            <Pressable style={styles.card}>
                <View>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.subTitle}>{item.content}</Text>
                </View>
                <Pressable onPress={() => bottomSheetRef.current?.present()}>
                    <Feather name="more-horizontal" size={24} color="black" />
                </Pressable>
            </Pressable>
            <CustomBottomSheetModal ref={bottomSheetRef} actions={actionsBottomModal} />
        </>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        borderBottomColor: "#ccc",
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 20,
        color: "#000",
    },
    subTitle: {
        fontSize: 15,
        color: "#666",
    },
});

export default CardItem;
