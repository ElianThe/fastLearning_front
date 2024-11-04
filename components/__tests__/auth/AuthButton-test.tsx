import { render, screen } from "@testing-library/react-native";
import { describe } from "@jest/globals";
import AuthButton from "@/components/auth/AuthButton";

describe("Auth Button", () => {
    test("text du composant", () => {
        render(
            <AuthButton isButtonEnabled={true} onPress={() => console.log("")}>
                auth button
            </AuthButton>,
        );
        const textButton = screen.getByText("auth button");
        expect(textButton).toBeTruthy();
    });
});
