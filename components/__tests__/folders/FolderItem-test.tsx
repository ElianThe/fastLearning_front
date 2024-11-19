// Importations nécessaires
import React from "react";
import { screen, act, userEvent } from "@testing-library/react-native";

// Composants que tu veux tester
import FolderItem from "@/components/folders/FolderItem";
import { renderWithBottomSheetModalProvider } from "@/test-utils";
import { describe } from "@jest/globals";
import { useRouter } from "expo-router";
import { renderRouter } from "expo-router/testing-library";
import FoldersStackLayout from "@/app/(tabs)/folders/_layout";
import CardListScreen from "@/app/(tabs)/learn";

describe("", () => {
    const item = { name: "folder 1", id: 1 };

    jest.mock("expo-router", () => ({
        useRouter: jest.fn(),
        router: {
            push: jest.fn(),
        },
    }));

    // Test pour vérifier l’ouverture et la fermeture de la modal
    test.skip("Le BottomSheetModal s'ouvre bien et se ferme correctement", async () => {
        // Simulation d’un utilisateur
        const user = userEvent.setup();

        // Rendu de l’interface avec le provider
        renderWithBottomSheetModalProvider(<FolderItem item={item} onDelete={() => {}} />);

        // Simule l'interaction pour ouvrir la modal
        const moreOptionsButton = screen.getByLabelText("More options");

        await act(async () => user.press(moreOptionsButton));

        /*// Vérifie que le contenu de la modal s'affiche
        expect(modal).toBeVisible();

        const CloseModal = screen.getByText("Annuler");
        await act(async () => user.press(CloseModal));
        expect(modal).not.toBeVisible();*/
    });

    test.skip("La navigation fonctionne lorsque le bouton est pressé", async () => {
        //setup
        const user = userEvent.setup();

        // access render UI
        renderRouter(
            {
                index: () => <FolderItem item={item} onDelete={() => {}} />,
                "/folders/folder/[id]": () => <CardListScreen />,
            },
            {
                initialUrl: "/folders",
            },
        );
        const folderButton = screen.getByRole("button", {
            name: "folder 1",
        });

        //actions
        await act(async () => user.press(folderButton));

        expect(screen).toHavePathname("/folders/folder/1");
    });
});
