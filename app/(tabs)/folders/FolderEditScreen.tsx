import React, {useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "@env";
import {router, useLocalSearchParams} from "expo-router";
import Modal from "@/components/UI/Modal";
import Input from "@/components/UI/Input";
import Label from "@/components/UI/Label";

const FolderEditScreen = () => {
    const {id} = useLocalSearchParams();
    const [name, setName] = useState('');

    const updateFolder = async () => {
        try {
            const response = await axios.patch(`${API_URL}/folders/${id}`, {
                name
            });
            router.back();
        } catch (err) {
            console.error(err);
        }
    }

    const getInfoFolder = async () => {
        try {
            const response = await axios.get(`${API_URL}/folders/${id}`)
            if (response.data.success) {
                setName(response.data.data.name);
            } else {
                throw new Error("erreur survenue")
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getInfoFolder();
    }, []);

    return (
        <Modal onPress={updateFolder} title={"Modifier le dossier"}>
            <Label>Nom du dossier</Label>
            <Input placeholder="Les capitales" onChangeText={(text: string) => setName(text)} value={name}
                   autoCapitalize="none"/>
        </Modal>
    );
}

export default FolderEditScreen;
