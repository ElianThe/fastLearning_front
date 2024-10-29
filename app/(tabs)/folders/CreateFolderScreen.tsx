import React, {useState} from "react";
import {View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard, Pressable} from "react-native";
import Label from "@/components/UI/Label";
import axios from "axios";
import {API_URL} from "@env";
import {router} from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

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
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
            <View style={styles.container}>
                <View style={{justifyContent: "space-between", alignItems: "center", flexDirection: "row"}}>
                    <Pressable onPress={() => router.back()}>
                        <FontAwesome name="times-circle" size={40} color="#780000"/>
                    </Pressable>
                    <Text style={{textAlign: "center", fontSize: 20, fontWeight: "bold"}}>
                        Ajouter un nouveau dossier
                    </Text>
                    <Pressable onPress={() => {
                        createFolder();
                    }}>
                        <FontAwesome name="check-circle" size={40} color="#003049"/>
                    </Pressable>
                </View>
                <Text style={{ marginVertical: 10,  }}>
                    Nom du dossier
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Les capitales"
                    placeholderTextColor={'gray'}
                    onChangeText={(text: string) => setName(text)}
                    value={name}
                    autoCapitalize="none"
                />
            </View>
        </TouchableWithoutFeedback>
    );
}

export default CreateFolderScreen;

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    container: {
        flex: 1,
        padding: 20,
        marginVertical: 30,
        backgroundColor: "#FFFFFF"
    },
    input: {
        padding: 10,
        backgroundColor: "#F2F2F2",
        borderRadius: 5,

    },
    button: {
        padding: 10,
        backgroundColor: 'blue',
        color: 'white',
        textAlign: 'center',
        borderRadius: 5,
    }
});