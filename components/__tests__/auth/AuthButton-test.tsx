import { fireEvent, render, screen } from "@testing-library/react-native";
import { describe } from "@jest/globals";
import AuthButton from "@/components/auth/AuthButton";

describe("Auth Button", () => {
    test("affiche le texte correctement", () => {
        render(
            <AuthButton isButtonDisabled={false} onPress={() => {}}>
                auth button
            </AuthButton>,
        );
        const textButton = screen.getByText("auth button");
        expect(textButton).toBeTruthy();
    });

    test("le bouton est cliquable quand isButtonDisabled est false", () => {
        const mockOnPress = jest.fn();
        render(<AuthButton isButtonDisabled={false} onPress={mockOnPress}>auth button</AuthButton>);
        const button = screen.getByRole("button");
        fireEvent.press(button);
        expect(mockOnPress).toHaveBeenCalled();
    });

    test("le bouton n'est pas cliquable quand isButtonDisabled est true", () => {
        const mockOnPress = jest.fn();
        render(<AuthButton isButtonDisabled={true} onPress={mockOnPress}>auth button</AuthButton>);
        const button = screen.getByRole("button");
        fireEvent.press(button);
        expect(mockOnPress).not.toHaveBeenCalled();
    });

});
