import { View, Text, Pressable, TouchableOpacity, StyleSheet, Image } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { API_URL } from "@env";
import { Ionicons } from "@expo/vector-icons";
import Input from "@/components/UI/Input";
import Label from "@/components/UI/Label";
import Modal from "@/components/UI/Modal";
import ErrorView from "@/components/feedBack/ErrorView";

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
            <>
                <Label>Recto de la carte</Label>
                <Input placeholder="France" onChangeText={(text) => setTitle(text)} value={title} />
            </>
            <View style={{ marginTop: 20 }}>
                <Label>Verso de la carte</Label>
                <Input
                    onChangeText={(content) => setContent(content)}
                    placeholder="Paris"
                    value={content}
                    multiline={true}
                />
            </View>
            {image ? (
                <View style={{ alignItems: "center", marginTop: 40 }}>
                    <View>
                        <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />
                        <Pressable
                            style={{
                                position: "absolute",
                                top: 5,
                                right: 5,
                                zIndex: 1,
                            }}
                            onPress={() => setImage("")}
                        >
                            <Ionicons name="close-circle" size={30} color="white" />
                        </Pressable>
                    </View>
                </View>
            ) : (
                <View style={{ marginTop: 20 }}>
                    <Label>Image de la carte</Label>
                    <TouchableOpacity
                        style={[styles.image]}
                        activeOpacity={0.8}
                        onPress={handleImagePickerPress}
                    >
                        <Text style={styles.imageText}>Choisir une image</Text>
                    </TouchableOpacity>
                </View>
            )}
        </Modal>
    );
};

export default CreateCardScreen;

const styles = StyleSheet.create({
    image: {
        paddingVertical: 30,
        borderWidth: 1,
        borderStyle: "dashed",
        borderRadius: 10,
        marginVertical: 10,
    },
    imageText: {
        textAlign: "center",
    },
});
