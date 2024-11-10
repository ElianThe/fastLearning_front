import { describe } from "@jest/globals";
import { render, screen } from "@testing-library/react-native";
import ErrorView from "@/components/feedBack/ErrorView";
import { Text } from "react-native";

describe("ErrorView", () => {
    test("le texte est correctement affiché", () => {
        // access render UI
        render(
            <ErrorView>
                <Text accessibilityRole={"text"}>Error Text</Text>
            </ErrorView>,
        );
        const textError = screen.getByRole("text", {
            name: "Error Text",
        });
        expect(textError).toBeOnTheScreen();
    });
});
