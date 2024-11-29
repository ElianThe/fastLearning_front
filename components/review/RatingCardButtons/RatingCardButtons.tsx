import RatingCardButton from "@/components/review/RatingCardButtons/RatingCardButton/RatingCardButton";
import styled from "styled-components/native";

type RatingCardButtonsProps = {
    onPress: () => void;
    id: number;
};

const RatingCardButtons = ({ onPress, id }: RatingCardButtonsProps) => {
    return (
        <ViewContainerRatingCards>
            <RatingCardButton rating={-1} onPress={onPress} id={id} backgroundColor={"#0594D0"}>
                difficile
            </RatingCardButton>

            <RatingCardButton rating={0} onPress={onPress} id={id} backgroundColor={"#003C57"}>
                moyen
            </RatingCardButton>

            <RatingCardButton rating={1} onPress={onPress} id={id} backgroundColor={"#051C24"}>
                très facile
            </RatingCardButton>
        </ViewContainerRatingCards>
    );
};

export default RatingCardButtons;

const ViewContainerRatingCards = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
`;
