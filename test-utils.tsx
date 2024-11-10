import React from "react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { render } from "@testing-library/react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export function renderWithBottomSheetModalProvider<T>(ui: React.ReactElement<T>) {
    return render(
        <GestureHandlerRootView>
            <BottomSheetModalProvider>{ui}</BottomSheetModalProvider>
        </GestureHandlerRootView>,
    );
}
