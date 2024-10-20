import {Stack} from "expo-router";
import {useAuth} from "@/app/context/AuthContext";
import {Alert, Button} from "react-native";

const StackLayout = () => {


    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerTitle: 'Profile',
                    headerTitleAlign: 'center',
                }}
            />
        </Stack>
    );
}

export default StackLayout;