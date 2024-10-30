import React, {useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "@env";
import {router, useLocalSearchParams} from "expo-router";
import Modal from "@/components/UI/Modal";
import Input from "@/components/UI/Input";
import Label from "@/components/UI/Label";
import ErrorView from "@/components/feedBack/ErrorView";
import {Text} from "react-native";
import errorView from "@/components/feedBack/ErrorView";

const FolderEditScreen = () => {
    const {id} = useLocalSearchParams();
    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);

    const updateFolder = async () => {
        try {
            await axios.patch(`${API_URL}/folders/${id}`, {
                name
            });
            router.back();
        } catch (err: any) {
            setError(err.response.data.message);
            console.error(err.response.data.message);
        }
    }

    const getInfoFolder = async () => {
        try {
            const response = await axios.get(`${API_URL}/folders/${id}`)
            if (response.data.success) {
                setName(response.data.data.name);
            } else {
                throw new Error("erreur survenue");
            }
        } catch (err: any) {
            console.error(err);
        }
    }

    useEffect(() => {
        getInfoFolder();
    }, []);

    return (
        <Modal onPress={updateFolder} title={"Modifier le dossier"}>
            {error !== null && <ErrorView><Text>{error}</Text></ErrorView> }
            <Label>Nom du dossier</Label>
            <Input placeholder="Les capitales" onChangeText={(text: string) => setName(text)} value={name}
                   autoCapitalize="none"/>
        </Modal>
    );
}

export default FolderEditScreen;
