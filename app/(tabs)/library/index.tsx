import {
    Text,
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Pressable,
    View,
    TouchableOpacity,
    Modal,
    TextInput
} from "react-native";
import React, {useCallback, useRef, useState} from "react";
import {API_URL} from "@env";
import axios from "axios";
import {router, useFocusEffect} from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import {BottomSheetModal} from "@gorhom/bottom-sheet";
import CustomBottomSheetModal from "@/components/CustomBottomSheetModal";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

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

    const handleUpdateFolder = (updatedFolder: FolderProps) => {
        setFolders(folders.map(folder => folder.id === updatedFolder.id ? updatedFolder : folder));
    }

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}/folders-of-user`);
            if (response.data.success) {
                setFolders(response.data.data);
            } else {
                throw new Error('Invalid data format');
            }
        } catch (e: any) {
            console.error(e.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [folders])
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff"/>;
    }

    return (
        <View style={{position: "relative", flex: 1}}>
            <FlatList
                data={folders}
                renderItem={({item}: { item: FolderProps }) => (
                    <Folder item={item} onDelete={handleDeleteFolder} />
                )}
                keyExtractor={item => item.id.toString()}
            />
            <TouchableOpacity onPress={(() => router.push('/library/createFolder'))}
                              style={{position: "absolute", bottom: 30, right: 30}}>
                <FontAwesome5 name="plus-circle" size={60} color="#003049"/>
            </TouchableOpacity>
        </View>
    );
};

export default Librairie;

const Folder = ({item, onDelete}: { item: FolderProps, onDelete: (folderId: number) => void}) => {

    const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);

    const bottomSheetRef = useRef<BottomSheetModal>(null);

    const handleOpen = () => {
        bottomSheetRef.current?.present();
    }

    const handleClose = () => {
        bottomSheetRef.current?.close();
    }

    const deleteFolder = async () => {
        try {
            const response = await axios.delete(`${API_URL}/folders/${item.id}`);
            if (response.data.success) {
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

    const handleModalUpdateVisible = () => {
        setIsModalUpdateVisible(false)
    };

    const data = [
        {
            key: "0",
            title: "Supprimer le dossier",
            callback: deleteFolder
        },
        {
            key: "1",
            title: "Modifier le dossier",
            callback: () => {
                handleClose();
                router.push({
                    pathname: "/library/updateFolder",
                    params: {id: item.id}
                });
            }
        },
        {
            key: "2",
            title: "Fermer",
            callback: handleClose
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
                ref={bottomSheetRef} data={data}/>
        </>
    );
}


const styles = StyleSheet.create({
    folder: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderBottomColor: '#ccc',
        marginTop: 5,
        backgroundColor: "#F2F2F2",
        borderRadius: 10
    },
});