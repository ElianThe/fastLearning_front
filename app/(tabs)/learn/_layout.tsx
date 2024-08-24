import {Stack} from "expo-router";

export default function Layout(){
    return (
        <Stack>
            <Stack.Screen
                name='index'
                options={{
                    headerTitle: 'Apprendre',
                    headerTitleAlign: 'center'
                }}
            />
            <Stack.Screen
                name='apprendre/index'
                options={{
                    headerTitle: 'Apprendre',
                    headerTitleAlign: 'center'
                }}
            />
        </Stack>
    );
}