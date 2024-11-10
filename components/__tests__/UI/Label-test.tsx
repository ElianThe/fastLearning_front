import { describe } from "@jest/globals";
import { render, screen } from "@testing-library/react-native";
import Label from "@/components/UI/Label";

describe("Label", () => {
    test("Le texte s'affiche", () => {
        // access render UI
        render(<Label>Text Label</Label>);
        const textLabel = screen.getByRole("text", {
            name: "Text Label",
        });

        // assert
        expect(textLabel).toBeOnTheScreen();
    });
});
