import { Stack } from "expo-router";

const ReviewStackLayout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="ReviewFlashCardScreen"
                options={{
                    headerTitle: "Réviser",
                    headerTitleAlign: "center",
                }}
            />
        </Stack>
    );
};

export default ReviewStackLayout;
