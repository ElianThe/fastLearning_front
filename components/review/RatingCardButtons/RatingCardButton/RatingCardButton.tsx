import axios from "axios";
import { API_URL } from "@env";
import { PropsWithChildren } from "react";
import styled from "styled-components/native";

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
        <RatingButtonCard
            backgroundColor={backgroundColor}
            onPress={() => {
                postRating(rating);
                onPress();
            }}
        >
            <TextRatingButtonCard>{children}</TextRatingButtonCard>
        </RatingButtonCard>
    );
};

export default RatingCardButton;

const RatingButtonCard = styled.TouchableOpacity<{ backgroundColor: string }>`
    background-color: ${({ backgroundColor }) => backgroundColor};
    padding: 10px;
    width: 85px;
    align-items: center;
    border-radius: 10px;
`;

const TextRatingButtonCard = styled.Text`
    color: white;
`;
