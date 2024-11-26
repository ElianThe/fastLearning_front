import { BottomSheetBackdrop, BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";
import { View } from "react-native";
import { forwardRef, useCallback } from "react";
import ActionBottomSheet, { ActionsType } from "@/components/UI/BottomSheetModal/ActionBottomSheet";

type CustomBottomSheetModalProps = {
    actions: ActionsType[];
};

const CustomBottomSheetModal = forwardRef<BottomSheetModal, CustomBottomSheetModalProps>(
    ({ actions }, ref) => {
        const renderBackdrop = useCallback(
            (props: any) => (
                <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />
            ),
            [],
        );

        return (
            <BottomSheetModal
                ref={ref}
                index={0}
                enableDynamicSizing={true}
                backdropComponent={renderBackdrop}
                handleIndicatorStyle={{ backgroundColor: "black" }}
                backgroundStyle={{ backgroundColor: "#FFFFFF" }}
            >
                <View style={{ flex: 1 }}>
                    <BottomSheetFlatList
                        data={actions}
                        renderItem={({ item }: { item: ActionsType }) => (
                            <ActionBottomSheet title={item.title} callback={item.callback} />
                        )}
                    />
                </View>
            </BottomSheetModal>
        );
    },
);

CustomBottomSheetModal.displayName = "CustomBottomSheetModal";
export default CustomBottomSheetModal;
