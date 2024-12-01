import { Stack } from "expo-router";

const FoldersStackLayout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="FolderListScreen"
                options={{
                    headerTitle: "Librairie",
                    headerTitleAlign: "center",
                }}
            />
            <Stack.Screen
                name="FolderEditScreen"
                options={{
                    headerShown: false,
                    presentation: "modal",
                }}
            />
            <Stack.Screen
                name="CreateFolderScreen"
                options={{
                    headerShown: false,
                    presentation: "modal",
                }}
            />
            <Stack.Screen
                name="folder/[id]/CardListScreen"
                options={{
                    headerTitleAlign: "center",
                }}
            />
            <Stack.Screen
                name="folder/[id]/CreateCardScreen"
                options={{
                    headerShown: false,
                    presentation: "modal",
                }}
            />
        </Stack>
    );
};

export default FoldersStackLayout;
