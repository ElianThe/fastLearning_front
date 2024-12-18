import React, { useState } from "react";
import { Text } from "react-native";
import Label from "@/components/UI/Label";
import axios from "axios";
import { API_URL } from "@env";
import { router } from "expo-router";
import Input from "@/components/UI/Input";
import Modal from "@/components/UI/Modal/Modal";
import ErrorView from "@/components/feedBack/ErrorView/ErrorView";
import styled from "styled-components/native";

const CreateFolderScreen = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState<null | string>(null);

    const createFolder = async () => {
        try {
            await axios.post(`${API_URL}/folders`, {
                name,
                content: "",
                is_public: false,
                parent_id: null,
            });
            router.back();
        } catch (err: any) {
            setError(err.response.data.message);
            console.error(err.response.data.message);
        }
    };
    return (
        <Modal onPress={createFolder} title={"Nouveau dossier"}>
            {error !== null && (
                <ErrorView>
                    <Text>{error}</Text>
                </ErrorView>
            )}
            <ViewInput>
                <Label>Nom du dossier</Label>
                <Input
                    placeholder="Les capitales"
                    onChangeText={(text: string) => setName(text)}
                    value={name}
                />
            </ViewInput>
        </Modal>
    );
};

export default CreateFolderScreen;

const ViewInput = styled.View`
    margin-top: 20px;
`;
