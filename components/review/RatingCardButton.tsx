import { StyleSheet, Text, TouchableOpacity } from "react-native";
import axios from "axios";
import { API_URL } from "@env";
import { PropsWithChildren } from "react";

type RatingCardButtonProps = PropsWithChildren<{
    onPress: () => void;
    id: number;
    rating: number;
    backgroundColor: string;
}>;

const RatingCardButton = ({
    onPress,
    id,
    rating,
    backgroundColor,
    children,
}: RatingCardButtonProps) => {
    const postRating = async (rating: number) => {
        try {
            const response = await axios.post(`${API_URL}/updateDateReview`, {
                id: id,
                score: rating,
            });
            if (!response.data.success) {
                throw new Error("Invalid data format");
            }
        } catch (e: any) {
            console.error(e.response.data.message);
        }
    };

    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: backgroundColor }]}
            onPress={() => {
                postRating(rating);
                onPress();
            }}
        >
            <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
    );
};

export default RatingCardButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: "lightgray",
        paddingVertical: 10,
        width: 85,
        alignItems: "center",
        borderRadius: 10,
    },
    text: { color: "white" },
});
