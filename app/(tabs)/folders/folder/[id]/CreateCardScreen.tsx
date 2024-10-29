import {
    View,
    Text,
    TextInput,
    Pressable,
    TouchableOpacity,
    StyleSheet,
    Image,
    TouchableWithoutFeedback, Keyboard
} from "react-native";
import {router, useLocalSearchParams} from "expo-router";
import Label from "@/components/UI/Label";
import React, {useState} from "react";
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import {API_URL} from "@env";
import {Ionicons} from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const CreateCardScreen = () => {
    const {id} = useLocalSearchParams<{ id: string }>();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

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
            formData.append('title', title);
            formData.append('content', content);
            formData.append('folder_id', `${id}`);
            if (image !== '') {
                const imageFile = {
                    uri: image,
                    type: 'image/jpeg', // Le type MIME doit correspondre au type de fichier
                    name: 'image.jpeg', // Un nom de fichier valide
                };

                formData.append('image_path', imageFile as any);
            }

            // Envoyer la requête POST avec le FormData
            const response = await axios.post(`${API_URL}/cards`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.success) {
                router.back();
            } else {
                console.log(response.data.message);
            }
        } catch (err: any) {
            console.error(err.response.data);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Pressable onPress={() => router.back()}>
                        <FontAwesome name="times-circle" size={40} color="#780000"/>
                    </Pressable>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Créer une carte</Text>
                    <Pressable onPress={handleCreateCard}>
                        <FontAwesome name="check-circle" size={40} color="#003049"/>
                    </Pressable>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text>
                        Recto de la carte
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="France"
                        onChangeText={text => setTitle(text)}
                        value={title}
                    />
                    <Text>
                        Verso de la carte
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Paris"
                        onChangeText={content => setContent(content)}
                        value={content}
                    />
                    {image ?
                        <View style={{alignItems: "center", marginTop: 40}}>
                            <View>
                                <Image source={{uri: image}} style={{width: 300, height: 300}}/>
                                <Pressable style={{position: 'absolute', top: 5, right: 5, zIndex: 1}}
                                           onPress={() => setImage('')}>
                                    <Ionicons name="close-circle" size={30} color="white"/>
                                </Pressable>
                            </View>
                        </View> :
                        <>
                            <Text>
                                Image de la carte
                            </Text>
                            <TouchableOpacity style={[styles.image]} activeOpacity={0.8} onPress={handleImagePickerPress}>
                                <Text style={styles.imageText}>Choisir une image</Text>
                            </TouchableOpacity>
                        </>
                    }
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default CreateCardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 30,
        padding: 10,
        flexDirection: "column",
        backgroundColor: "#FFFFFF"
    },
    input: {
        marginVertical: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#f2f2f2',
        borderStyle: "solid",
    },
    image: {
        paddingVertical: 30,
        borderWidth: 1,
        borderStyle: "dashed",
        borderRadius: 10,
        marginVertical: 10,
    },
    imageText: {
        textAlign: "center"
    },
});