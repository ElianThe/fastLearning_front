import {Stack} from "expo-router";

const LearnStackLayout = () => {
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
                name='cardLearning/index'
                options={{
                    headerTitle: 'Apprendre',
                    headerTitleAlign: 'center'
                }}
            />
        </Stack>
    );
}

export default LearnStackLayout;