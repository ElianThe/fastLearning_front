import { Stack, useLocalSearchParams } from "expo-router";
import {View, Text} from "react-native";

export default function DetailsPage () {
    const { id } = useLocalSearchParams();
    return (
        <View>
            <Stack.Screen options={{headerTitle: `Details #${id}`}}/>
            <Text>My details for: {id}</Text>
        </View>
    );
}