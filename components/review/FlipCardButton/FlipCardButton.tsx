import styled from "styled-components/native";

type onPressProps = {
    onPress: () => void;
};

const FlipCardButton = ({ onPress }: onPressProps) => {
    return (
        <FlipButtonCard onPress={() => onPress()}>
            <TextFlipCard>Retourner la carte</TextFlipCard>
        </FlipButtonCard>
    );
};

export default FlipCardButton;

const FlipButtonCard = styled.TouchableOpacity`
    margin-top: 10px;
    padding: 15px;
    background-color: #003049;
    border-radius: 10px;
    align-items: center;
`;

const TextFlipCard = styled.Text`
    font-size: 16px;
    color: #FFFFFF;
`;
