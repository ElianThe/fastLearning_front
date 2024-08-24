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
import Label from "@/components/Label";
import {useState} from "react";
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import {API_URL} from "@env";

export default function createCard() {
    const {id} = useLocalSearchParams<{ id: string }>();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');

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
            const imageFile = {
                uri: image,
                type: 'image/jpeg', // Le type MIME doit correspondre au type de fichier
                name: 'image.jpeg', // Un nom de fichier valide
            };

            formData.append('image_path', imageFile as any);

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
        } catch (e: any) {
            console.log(e.response.data);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={style.container}>
                <View>
                    <Label text={"Nom de la carte"}/>
                    <TextInput
                        style={style.input}
                        placeholder="France"
                        onChangeText={text => setTitle(text)}
                        value={title}
                    />
                    <Label text={"Contenu de la carte"}/>
                    <TextInput
                        style={style.input}
                        placeholder="Paris"
                        onChangeText={content => setContent(content)}
                        value={content}
                    />
                    <Label text={"Image de la carte"}/>
                    <TouchableOpacity style={style.image} activeOpacity={0.8} onPress={handleImagePickerPress}>
                        <Text style={style.imageText}>Choisir une image</Text>
                    </TouchableOpacity>
                    {image && <Image source={{uri: image}} style={{width: 200, height: 200}}/>}
                </View>
                <Pressable
                    style={style.button}
                    onPress={() => {
                        handleCreateCard()
                    }}
                >
                    <Text>Enregistrer la carte</Text>
                </Pressable>
            </View>
        </TouchableWithoutFeedback>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        flexDirection: "column",
        justifyContent: "space-between"
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderStyle: "solid",
        borderColor: "black"
    },
    image: {
        padding: "auto",
        paddingVertical: 30,
        borderWidth: 1,
        borderStyle: "dashed",
        borderRadius: 10
    },
    imageText: {
        textAlign: "center"
    },
    button: {
        marginBottom: 10,
        paddingVertical: 15,
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10,
    }
});