import "react-native-gesture-handler/jestSetup";

jest.mock("react-native-reanimated", () => {
    const Reanimated = require("react-native-reanimated/mock");

    // Override pour activer le worklet
    Reanimated.default.call = () => {};

    return Reanimated;
});

jest.mock("@gorhom/bottom-sheet", () => {
    const BottomSheet = require("@gorhom/bottom-sheet/mock");
    return {
        ...BottomSheet,
        BottomSheetModalProvider: ({ children }) => <>{children}</>,
    };
});
