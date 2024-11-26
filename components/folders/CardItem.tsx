import React, { useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import axios from "axios";
import { API_URL } from "@env";
import { Pressable, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import CustomBottomSheetModal from "@/components/UI/BottomSheetModal/CustomBottomSheetModal";
import styled from "styled-components/native";

type Card = {
    id: number;
    title: string;
    content: string;
    folder_id: number;
};

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
            <CardItemUpdate>
                <View>
                    <Title>{item.title}</Title>
                    <SubTitle numberOfLines={1}>{item.content}</SubTitle>
                </View>
                <Pressable onPress={() => bottomSheetRef.current?.present()}>
                    <Feather name="more-horizontal" size={24} color="black" />
                </Pressable>
            </CardItemUpdate>
            <CustomBottomSheetModal ref={bottomSheetRef} actions={actionsBottomModal} />
        </>
    );
};

export default CardItem;

const CardItemUpdate = styled.Pressable`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    margin: 10px 0;
    border-radius: 5px;
    border-bottom-color: #ccc;
    background-color: #fff;
`;

const Title = styled.Text`
    font-size: 20px;
    color: #000;
`;

const SubTitle = styled.Text`
    font-size: 15px;
    color: #666;
`;
