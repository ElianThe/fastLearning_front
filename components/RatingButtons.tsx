import {View, StyleSheet, TouchableOpacity, Text} from "react-native";
import {API_URL} from "@env";
import axios from "axios";

interface RatingButtonsProps {
    onPress: () => void;
    id : number;

}

export default function RatingButtons ({onPress, id}: RatingButtonsProps)  {

    const postRating = async (rating: number) => {
        try {
            const response = await axios.post(`${API_URL}/updateDateReview`, {
                id: id,
                score: rating,
            });
            if (!response.data.success) {
                throw new Error('Invalid data format');
            }
        } catch (e: any) {
            console.log(e.response.data.message);
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.button, {backgroundColor: "#0594D0"}]} onPress={
                () => {
                    postRating(-1);
                    onPress();
                }}>
                <Text style={styles.text}>difficile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: "#003C57"}]} onPress={
                () => {
                    postRating(0);
                    onPress();
                }}>
                <Text style={styles.text}>moyen</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: "#051C24"}]} onPress={() => {
                postRating(1);
                onPress();
            }}>
                <Text style={styles.text}>très facile</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        backgroundColor: 'lightgray',
        paddingVertical: 10,
        width: 85,
        alignItems: 'center',
        borderRadius: 10,
    },
    text: { color: "white" }
});