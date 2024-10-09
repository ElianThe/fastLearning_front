import {Stack} from "expo-router";

const StackLayout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerTitle: 'Réviser',
                    headerTitleAlign: 'center',
                }}
            />
        </Stack>
    );
}

export default StackLayout;