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
            <TouchableOpacity style={styles.button} onPress={
                () => {
                    postRating(-2);
                    onPress();
                }}>
                <Text>difficile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={
                () => {
                    postRating(-1);
                    onPress();
                }}>
                <Text>moyen</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={
                () => {
                    postRating(0);
                    onPress();
            }}>
                <Text>facile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {
                postRating(1);
                onPress();
            }}>
                <Text>très facile</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        backgroundColor: 'lightgray',
        paddingVertical: 10,
        width: 85,
        alignItems: 'center',
        borderRadius: 10,
    }
});