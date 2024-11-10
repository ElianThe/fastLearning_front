import { describe } from "@jest/globals";
import { act, fireEvent, render, screen, userEvent } from "@testing-library/react-native";
import "@testing-library/react-native/extend-expect";

import Input from "@/components/UI/Input";

describe("Input", () => {
    test("Rendu du composant avec un placeholder", async () => {
        // access render UI
        render(
            <Input onChangeText={() => {}} value={"text input"} placeholder={"PlaceHolder Text"} />,
        );
        const textBox = screen.getByPlaceholderText("PlaceHolder Text");

        // assert
        expect(textBox).toBeOnTheScreen();
    });

    test("Saisie de texte met à jour la valeur", async () => {
        // setup
        const onChangeText = jest.fn();

        // access render UI
        render(
            <Input
                onChangeText={onChangeText}
                value={"Text Value"}
                placeholder={"PlaceHolder Text"}
            />,
        );
        const textBox = screen.getByPlaceholderText("PlaceHolder Text");

        // actions
        await act(async () => fireEvent.changeText(textBox, "Update Text"));

        // assert
        expect(onChangeText).toHaveBeenCalledWith("Update Text");
    });

    test("secureTextEntry rend le texte caché", () => {
        // access render UI
        render(
            <Input
                onChangeText={() => {}}
                value={"Text Value"}
                placeholder={"PlaceHolder Text"}
                secureTextEntry={true}
            />,
        );
        const textBox = screen.getByPlaceholderText("PlaceHolder Text");

        // assert
        expect(textBox).toHaveProp("secureTextEntry", true);

        screen.rerender(
            <Input onChangeText={() => {}} value={"Text Input"} secureTextEntry={false} />,
        );
        expect(textBox).toHaveProp("secureTextEntry", false);
    });

    test("Appel de onFocus et onBlur", () => {
        //setup
        const onBlur = jest.fn();
        const onFocus = jest.fn();

        // access render UI
        render(
            <Input
                onChangeText={() => {}}
                value={"Text Value"}
                placeholder={"PlaceHolder Text"}
                onFocus={onFocus}
                onBlur={onBlur}
            />,
        );
        const textBox = screen.getByPlaceholderText("PlaceHolder Text");

        // actions
        fireEvent(textBox, "focus");
        fireEvent(textBox, "blur");

        // assert
        expect(onFocus).toHaveBeenCalledTimes(1);
        expect(onBlur).toHaveBeenCalledTimes(1);
    });

    test("autoCapitalize fonctionne", () => {
        // access render UI
        render(
            <Input
                value=""
                onChangeText={() => {}}
                placeholder="autoCapitalize"
                autoCapitalize="words"
            />,
        );
        const input = screen.getByPlaceholderText("autoCapitalize");

        // assert
        expect(input).toHaveProp("autoCapitalize", "words");

        // Rerender
        screen.rerender(
            <Input
                value=""
                onChangeText={() => {}}
                placeholder="autoCapitalize"
                autoCapitalize="none"
            />,
        );

        // assert
        expect(input).toHaveProp("autoCapitalize", "none");
    });

    test("style personnalisé est appliqué", () => {
        // setup
        const customStyle = { paddingLeft: 20, backgroundColor: "blue" };

        // access render UI
        render(
            <Input
                value=""
                onChangeText={() => {}}
                placeholder="Styled Input"
                style={customStyle}
            />,
        );
        const input = screen.getByPlaceholderText("Styled Input");

        // assert
        expect(input).toHaveStyle(customStyle);
    });
});
