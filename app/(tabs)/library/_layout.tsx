import {Stack} from "expo-router";

const StackLayout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerTitle: 'Librairie',
                    headerTitleAlign: 'center',
                }}
            />
             <Stack.Screen
                name="updateFolder"
                options={{
                    headerShown: false,
                    presentation: "modal"
                }}
            />
            <Stack.Screen
                name="createFolder"
                options={{
                    headerShown: false,
                    presentation: "modal"
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
                    headerShown: false,
                    presentation: "modal",
                }}
            />
        </Stack>
    );
}

export default StackLayout;