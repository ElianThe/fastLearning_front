import React, {useState} from "react";
import {View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard, Pressable} from "react-native";
import Label from "@/components/UI/Label";
import axios from "axios";
import {API_URL} from "@env";
import {router} from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Input from "@/components/UI/Input";
import Modal from "@/components/UI/Modal";

const CreateFolderScreen = () => {
    const [name, setName] = useState('');

    const createFolder = async () => {
        await axios.post(`${API_URL}/folders`, {
            name,
            content: "",
            "is_public": false,
            "parent_id": null
        });
        router.back();
    }
    return (
        <Modal onPress={createFolder} title={"Ajouter un nouveau dossier"}>
            <>
                <Label>Nom du dossier</Label>
                <Input placeholder="Les capitales" onChangeText={(text: string) => setName(text)} value={name}
                       autoCapitalize="none"/>
            </>
        </Modal>
    );
}

export default CreateFolderScreen