import React, {useEffect, useState} from "react";
import {View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard, Pressable} from "react-native";
import Label from "@/components/UI/Label";
import axios from "axios";
import {API_URL} from "@env";
import {router, useLocalSearchParams} from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

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
                <View style={{justifyContent: "space-between", alignItems: "center", flexDirection: "row"}}>
                    <Pressable onPress={() => router.back()}>
                        <FontAwesome name="times-circle" size={40} color="#780000"/>
                    </Pressable>
                    <Text style={{textAlign: "center", fontSize: 20, fontWeight: "bold"}}>
                        Modifier ce dossier
                    </Text>
                    <Pressable onPress={() => {
                        updateFolder();
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
export default FolderEditScreen;

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