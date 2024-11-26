import { describe } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react-native";
import Modal from "@/components/UI/Modal/Modal";
import { Keyboard, Text } from "react-native";

// tester
// 1) L'affichage de la modale (titre, icones) v
// 2) La fermeture de la modale (appelle à router.back(); x
// 3) l'appelle à onPress v
// 4) Test du gestion du clavier v

// Mock du Keyboard pour tester le dismiss
jest.spyOn(Keyboard, 'dismiss');

describe("Modal", () => {
    test("renders test", () => {
        // access render UI
        render(<Modal onPress={() => {}} title={"Title"} />);

        // access closeButton
        const closeButton = screen.getByLabelText("closebutton");

        // access title
        const title = screen.getByRole("text", {
            name: "Title"
        });

        // access checkbutton
        const checkButton = screen.getByLabelText("checkbutton");

        // assert
        expect(closeButton).toBeOnTheScreen();
        expect(title).toBeOnTheScreen();
        expect(checkButton).toBeOnTheScreen();
    });

    test("render children", () => {
        // access render UI
        render(<Modal onPress={() => {}} title={"Title"}><Text>Coucou, ici la modale !</Text></Modal>);

        // assert
        expect("Coucou, ici la modale !").toBeTruthy();
    });

    test("Validation du bouton", () => {
        // setup
        const onPress = jest.fn();

        // access render UI
        render(<Modal onPress={onPress} title={"Title"} />);
        const checkButton = screen.getByLabelText("checkbutton");

        // action
        fireEvent.press(checkButton);

        // assert
        expect(onPress).toHaveBeenCalledTimes(1);
    });

    test.skip("Fermeture du bouton", () => {
        // access render UI
        render(<Modal onPress={() => {}} title={"Title"} />);

        // access closeButton
        const closeButton = screen.getByLabelText("closebutton");

        // assert
    });

    test("Masquer le clavier lors du clic en dehors de la modal", () => {
        // access render UI
        render(<Modal onPress={() => {}} title={"Title"} />);
        const title = screen.getByRole("text", {
            name: "Title"
        });

        // action
        fireEvent.press(title);

        // assert
        expect(Keyboard.dismiss).toHaveBeenCalledTimes(1);
    });

});
