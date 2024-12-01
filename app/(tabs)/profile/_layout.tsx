import { Stack } from "expo-router";

const ProfileStackLayout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="ProfileScreen"
                options={{
                    headerTitle: "Profile",
                    headerTitleAlign: "center",
                }}
            />
        </Stack>
    );
};

export default ProfileStackLayout;
