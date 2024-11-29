import { Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { API_URL } from "@env";
import { Ionicons } from "@expo/vector-icons";
import Input from "@/components/UI/Input";
import Label from "@/components/UI/Label";
import Modal from "@/components/UI/Modal/Modal";
import ErrorView from "@/components/feedBack/ErrorView/ErrorView";
import styled from "styled-components/native";

const CreateCardScreen = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleImagePickerPress = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleCreateCard = async () => {
        try {
            let formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);
            formData.append("folder_id", `${id}`);
            if (image !== "") {
                const imageFile = {
                    uri: image,
                    type: "image/jpeg", // Le type MIME doit correspondre au type de fichier
                    name: "image.jpeg", // Un nom de fichier valide
                };

                formData.append("image_path", imageFile as unknown as Blob);
            }

            // Envoyer la requête POST avec le FormData
            const response = await axios.post(`${API_URL}/cards`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.data.success) {
                router.back();
            } else {
                console.log(response.data.message);
            }
        } catch (err: any) {
            setError(err.response.data.message);
            console.error(err.response.data);
        }
    };

    return (
        <Modal onPress={handleCreateCard} title={"Nouvelle carte"}>
            {error && (
                <ErrorView>
                    <Text>{error}</Text>
                </ErrorView>
            )}
            <ViewInput>
                <Label>Recto de la carte</Label>
                <Input placeholder="France" onChangeText={(text) => setTitle(text)} value={title} />
            </ViewInput>
            <ViewInput>
                <Label>Verso de la carte</Label>
                <Input
                    onChangeText={(content) => setContent(content)}
                    placeholder="Paris"
                    value={content}
                    multiline={true}
                />
            </ViewInput>
            {!image ? (
                <ViewInput>
                    <Label>Image de la carte</Label>
                    <PressablePickImage onPress={handleImagePickerPress}>
                        <TextImage>Choisir une image</TextImage>
                    </PressablePickImage>
                </ViewInput>
            ) : (
                <ViewImage>
                    <ImageCard source={{ uri: image }} />
                    <CloseCircle onPress={() => setImage("")}>
                        <Ionicons name="close-circle" size={30} color="white" />
                    </CloseCircle>
                </ViewImage>
            )}
        </Modal>
    );
};

export default CreateCardScreen;

const ViewInput = styled.View`
    margin-top: 20px;
`;

const ViewImage = styled.View`
    align-items: center;
    margin-top: 40px;
`;

const PressablePickImage = styled.TouchableOpacity`
    padding: 30px 0;
    border-width: 1px;
    border-style: dashed;
    border-radius: 10px;
    margin: 10px 0;
`;

const TextImage = styled.Text`
    text-align: center;
`;

const ImageCard = styled.Image`
    width: 300px;
    height: 300px;
`;

const CloseCircle = styled.Pressable`
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 1;
`;
