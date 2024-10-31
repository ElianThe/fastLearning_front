import { View } from "react-native";
import RatingCardButton from "@/components/review/RatingCardButton";

interface RatingCardButtonsProps {
    onPress: () => void;
    id: number;
}

export default function RatingCardButtons({
    onPress,
    id,
}: RatingCardButtonsProps) {
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
            }}
        >
            <RatingCardButton
                rating={-1}
                onPress={onPress}
                id={id}
                backgroundColor={"#0594D0"}
            >
                difficile
            </RatingCardButton>

            <RatingCardButton
                rating={0}
                onPress={onPress}
                id={id}
                backgroundColor={"#003C57"}
            >
                moyen
            </RatingCardButton>

            <RatingCardButton
                rating={1}
                onPress={onPress}
                id={id}
                backgroundColor={"#051C24"}
            >
                très facile
            </RatingCardButton>
        </View>
    );
}
