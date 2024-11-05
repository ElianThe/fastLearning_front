import { describe } from "@jest/globals";
import { render, screen } from "@testing-library/react-native";
import ErrorView from "@/components/feedBack/ErrorView";
import { Text } from "react-native";

describe("ErrorView", () => {
    test("affiche le texte correctement", () => {
        render(<ErrorView><Text>Error Text</Text></ErrorView>);
        const textError = screen.getByText("Error Text");
        expect(textError).toBeTruthy();
    });
});
