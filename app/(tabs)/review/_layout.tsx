import {Stack} from "expo-router";

const ReviewStackLayout = () => {
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

export default ReviewStackLayout;