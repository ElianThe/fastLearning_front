import React, {useEffect, useState} from "react";
import {View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard, Pressable} from "react-native";
import Label from "@/components/Label";
import axios from "axios";
import {API_URL} from "@env";
import {router, useLocalSearchParams} from "expo-router";

const UpdateFolder = () => {
    const {id} = useLocalSearchParams();
    const [name, setName] = useState('');


    const updateFolder = async () => {
        try {
            const response = await axios.patch(`${API_URL}/folders/${id}`, {
                name
            });
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
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
        getInfoFolder();
    }, []);

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Modifier le dossier {id}</Text>
                <Label text={'Nom du dossier'}/>
                <TextInput
                    style={styles.input}
                    placeholder="Nom du dossier"
                    placeholderTextColor={'gray'}
                    onChangeText={(text: string) => setName(text)}
                    value={name}
                    autoCapitalize="none"
                />
                <Pressable
                    style={styles.button}
                    onPress={() => {
                        updateFolder();
                        router.back();
                    }}
                >
                    <Text style={styles.button}>Modifier</Text>
                </Pressable>
            </View>
        </TouchableWithoutFeedback>
    );
}
export default UpdateFolder;

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