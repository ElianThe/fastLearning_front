import React, {useState} from "react";
import {View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard, Pressable} from "react-native";
import Label from "@/components/Label";
import axios from "axios";
import {API_URL} from "@env";
import {router} from "expo-router";

export default function createFolder () {
    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    const createFolder = async () => {
        await axios.post(`${API_URL}/folders`, {
            name,
            content,
            "is_public": false,
            "parent_id": null
        });
    }
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Créer un dossier</Text>
                <Label text={'Nom du dossier'}/>
                <TextInput
                    style={styles.input}
                    placeholder="Nom du dossier"
                    placeholderTextColor={'gray'}
                    onChangeText={(text: string) => setName(text)}
                    value={name}
                    autoCapitalize="none"
                />
                <Label text={'Contenu du dossier'} />
                <TextInput
                    style={styles.input}
                    placeholder="Contenu du dossier"
                    placeholderTextColor={'gray'}
                    onChangeText={(text: string) => setContent(text)}
                    value={content}
                    autoCapitalize="none"
                />
                <Pressable
                    style={styles.button}
                    onPress={() => {
                        createFolder();
                        router.back();
                    }}
                >
                    <Text style={styles.button}>Créer</Text>
                </Pressable>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 20,
    },
    button: {
        padding: 10,
        backgroundColor: 'blue',
        color: 'white',
        textAlign: 'center',
        borderRadius: 5,
    }
});