import {BottomSheetBackdrop, BottomSheetFlatList, BottomSheetModal} from "@gorhom/bottom-sheet";
import {View, StyleSheet, TouchableOpacity, Text} from "react-native";
import {forwardRef, useCallback} from "react";

type ActionsType = {
    key?: string;
    title: string;
    callback: () => void;
}

type CustomBottomSheetModalProps = {
    actions: ActionsType[];
};
const CustomBottomSheetModal = forwardRef<BottomSheetModal, CustomBottomSheetModalProps>(({actions}, ref) => {
    const renderBackdrop = useCallback((props : any) => <BottomSheetBackdrop
            appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
        []);

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
                    renderItem={({item}: { item : ActionsType }) => <ActionBottomSheet title={item.title} callback={item.callback} />}
                />
            </View>
        </BottomSheetModal>
    );
});

const ActionBottomSheet = ({title, callback} : ActionsType) => {

    return <View style={{ backgroundColor: "#DDDDDD" }}>
        <TouchableOpacity onPress={callback} style={styles.containerAction}>
            <Text>
                {title}
            </Text>
        </TouchableOpacity>
    </View>
}
export default CustomBottomSheetModal;

const styles = StyleSheet.create({
    containerAction: {
        flex: 1,
        padding: 20,
        alignItems: "center",
        backgroundColor: "white",
        borderTopWidth: 1,
        borderTopColor: '#ccc'
    }
});