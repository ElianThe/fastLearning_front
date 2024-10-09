import {router, Stack} from "expo-router";
import Feather from "@expo/vector-icons/Feather";

const StackLayout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerTitle: 'Librairie',
                    headerTitleAlign: 'center',
                    headerRight: () => (
                        <Feather name="plus" size={24} color="black" onPress={() => (
                            router.push('/library/createFolder')
                        )} />
                    ),
                }}
            />
            <Stack.Screen
                name="createFolder"
                options={{
                    headerTitle: 'Créer un dossier',
                    headerTitleAlign: 'center',
                }}
            />
            <Stack.Screen
                name="updateFolder"
                options={{
                    headerTitle: 'modifier le dossier',
                    headerTitleAlign: 'center',
                }}
            />

            <Stack.Screen
                name="folder/[id]/index"
                options={{
                    headerTitleAlign: 'center',
                }}
            />
            <Stack.Screen
                name="folder/[id]/createCard"
                options={{
                    headerTitle: 'Créer une carte',
                    headerTitleAlign: 'center',
                }}
            />
        </Stack>
    );
}

export default StackLayout;