import { fireEvent, render, screen } from "@testing-library/react-native";
import { describe } from "@jest/globals";
import AuthButton from "@/components/auth/AuthButton";
import "@testing-library/react-native/extend-expect";

describe("Auth Button", () => {
    test("le texte est correctement affiché", () => {
        // access render UI
        render(
            <AuthButton isButtonDisabled={false} onPress={() => {}}>
                auth button
            </AuthButton>,
        );
        const textButton = screen.getByRole("button", {
            name: "auth button",
        });

        // assertions
        expect(textButton).toBeOnTheScreen();
    });

    test("le bouton est pressable et bleu quand isButtonDisabled est false", () => {
        // setup
        const mockOnPress = jest.fn();

        // access render UI
        render(
            <AuthButton isButtonDisabled={false} onPress={mockOnPress}>
                auth button
            </AuthButton>,
        );
        const button = screen.getByRole("button", {
            name: "auth button",
        });

        // action
        fireEvent.press(button);

        // assertions
        expect(mockOnPress).toHaveBeenCalled();
        expect(button).toHaveStyle({ backgroundColor: "#003049" });
    });

    test("le bouton n'est pas pressable et gris quand isButtonDisabled est true", () => {
        // setup
        const mockOnPress = jest.fn();

        // access render UI
        render(
            <AuthButton isButtonDisabled={true} onPress={mockOnPress}>
                auth button
            </AuthButton>,
        );
        const button = screen.getByRole("button", {
            name: "auth button",
        });

        // action
        fireEvent.press(button);

        // assertions
        expect(mockOnPress).not.toHaveBeenCalled();
        expect(button).toHaveStyle({ backgroundColor: "gray" });
    });

    // verifier que le style personnalise est present
});
