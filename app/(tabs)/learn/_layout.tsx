import {Stack} from "expo-router";

const StackLayout = () => {
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

export default StackLayout;