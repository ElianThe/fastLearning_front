import {BottomSheetBackdrop, BottomSheetFlatList, BottomSheetModal} from "@gorhom/bottom-sheet";
import {View, StyleSheet, TouchableOpacity, Text} from "react-native";
import {forwardRef, ReactNode, useCallback} from "react";

export type Ref = BottomSheetModal;

const CustomBottomSheetModal = forwardRef<Ref, any>(({data}: any, ref) => {
    const renderBackdrop = useCallback((props : any) => <BottomSheetBackdrop
            appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
        []);

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            enableDynamicSizing={true}
            backdropComponent={renderBackdrop}
            style={{ marginHorizontal: 6 }}
            handleIndicatorStyle={{ backgroundColor: "white" }}
            backgroundStyle={{ backgroundColor: "blue" }}
        >
            <View style={{ flex: 1 }}>
                <BottomSheetFlatList
                    data={data}
                    renderItem={({item}: { item : any }) => <ActionBottomSheet title={item.title} callback={item.callback} />}
                />
            </View>
        </BottomSheetModal>
    );
});

const ActionBottomSheet = ({title, callback} : {title: string, callback: any}) => {
    return <View style={{ backgroundColor: "white" }}>
        <TouchableOpacity onPress={callback} style={styles.containerAction}>
            <Text>
                {title}
            </Text>
        </TouchableOpacity>
    </View>
}
export default CustomBottomSheetModal;


const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        textAlign: "center",
    },
    containerAction: {
        flex: 1,
        padding: 20,
        alignItems: "center",
        backgroundColor: "blue",
        borderTopWidth: 1,
        borderBottomColor: '#ccc'
    }
});