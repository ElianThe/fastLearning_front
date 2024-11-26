import { Text, View } from "react-native";
import styled from "styled-components/native";

export type ActionsType = {
    key?: string;
    title: string;
    callback: () => void;
};

const ActionBottomSheet = ({ title, callback }: ActionsType) => {
    return (
        <View style={{ backgroundColor: "#DDDDDD" }}>
            <TouchableOpacityContainerAction onPress={callback}>
                <Text>{title}</Text>
            </TouchableOpacityContainerAction>
        </View>
    );
};

export default ActionBottomSheet;

const TouchableOpacityContainerAction = styled.TouchableOpacity`
    flex: 1;
    padding: 20px;
    align-items: center;
    background-color: white;
    border-top-width: 1px;
    border-top-color: #ccc;
`;