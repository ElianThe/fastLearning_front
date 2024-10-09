import {Text, ActivityIndicator, FlatList, StyleSheet, Pressable} from "react-native";
import React, {useCallback, useRef, useState} from "react";
import {API_URL} from "@env";
import axios from "axios";
import {router, useFocusEffect} from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import {BottomSheetModal} from "@gorhom/bottom-sheet";
import CustomBottomSheetModal from "@/components/CustomBottomSheetModal";

type FolderProps = {
    id: number;
    name: string;
};

const Librairie = () => {
    const [folders, setFolders] = useState<FolderProps[]>([]);
    const [loading, setLoading] = useState(true);

    const handleDeleteFolder = (folderId: number) => {
        const updatedFolders = folders.filter(folder => folder.id !== folderId);
        setFolders(updatedFolders);
    };


    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}/folders-of-user`);
            if (response.data.success) {
                setFolders(response.data.data);
            } else {
                throw new Error('Invalid data format');
            }
        } catch (e: any) {
            console.log(e.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff"/>;
    }

    return (
        <FlatList
            data={folders}
            renderItem={({item}: { item: FolderProps }) => (
                <Folder item={item} onDelete={handleDeleteFolder}/>
            )}
            keyExtractor={item => item.id.toString()}
        />
    );
};

const Folder = ({item, onDelete}: { item: FolderProps, onDelete : any }) => {

    const bottomSheetRef = useRef<BottomSheetModal>(null);

    const handleOpen = () => {
        bottomSheetRef.current?.present();
    }

    const handleClose = () => {
        bottomSheetRef.current?.close();
    }

    const deleteFolder = async () => {
        try {
            const response = await axios.delete( `${API_URL}/folders/${item.id}`);
            if(response.data.success) {
                alert("suppression du dossier");
                onDelete(item.id);
            } else {
                alert("ça n'a pas fonctionné");
            }
        } catch (err) {
            console.error(err)
        }
        handleClose();
    }

    const data = [
        {
            key: "0",
            title: "Supprimer le dossier",
            callback : deleteFolder
        },
        {
            key: "1",
            title: "Modifier le dossier",
            callback : () => {
                router.push({
                    pathname: '/library/updateFolder',
                    params: {id: item.id}
                })
                handleClose()
            }
        },
        {
            key: "2",
            title: "Fermer",
            callback : handleClose
        },
    ];

    return (
        <>
            <Pressable
                style={styles.folder}
                onPress={() =>
                    router.push({
                        pathname: '/library/folder/[id]',
                        params: {id: item.id, name: item.name}
                    })
                }
            >
                <Text>{item.name}</Text>
                <Pressable onPress={handleOpen}>
                    <Feather name="more-horizontal" size={24} color="black"/>
                </Pressable>
            </Pressable>
            <CustomBottomSheetModal
                ref={bottomSheetRef} data={data} />
        </>
    );
}

export default Librairie;

const styles = StyleSheet.create({
    folder: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
});