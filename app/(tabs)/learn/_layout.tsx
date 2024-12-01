import { Stack } from "expo-router";

const LearnStackLayout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="CardListScreen"
                options={{
                    headerTitle: "Apprendre",
                    headerTitleAlign: "center",
                }}
            />
            <Stack.Screen
                name="cardLearning/AutoEvaluationCardsScreen"
                options={{
                    headerTitle: "Apprendre",
                    headerTitleAlign: "center",
                }}
            />
        </Stack>
    );
};

export default LearnStackLayout;
