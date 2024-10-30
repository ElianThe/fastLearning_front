import React, {useState} from "react";
import {View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard, Pressable} from "react-native";
import Label from "@/components/UI/Label";
import axios from "axios";
import {API_URL} from "@env";
import {router} from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Input from "@/components/UI/Input";
import Modal from "@/components/UI/Modal";
import ErrorView from "@/components/feedBack/ErrorView";

const CreateFolderScreen = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState<null | string>(null);

    const createFolder = async () => {
        try {
            await axios.post(`${API_URL}/folders`, {
                name,
                content: "",
                "is_public": false,
                "parent_id": null
            });
            router.back();
        } catch (err: any) {
            setError(err.response.data.message);
            console.error(err.response.data.message);
        }
    }
    return (
        <Modal onPress={createFolder} title={"Ajouter un nouveau dossier"}>
            {error !== null && <ErrorView><Text>{error}</Text></ErrorView>}
            <Label>Nom du dossier</Label>
            <Input placeholder="Les capitales" onChangeText={(text: string) => setName(text)} value={name}
                   autoCapitalize="none"/>
        </Modal>
    );
}

export default CreateFolderScreen