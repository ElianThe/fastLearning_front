import {BottomSheetBackdrop, BottomSheetFlatList, BottomSheetModal} from "@gorhom/bottom-sheet";
import {View, StyleSheet, TouchableOpacity, Text} from "react-native";
import {forwardRef, ReactNode, useCallback, useState} from "react";
import useToggle from "@/hooks/useToggle";

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
            handleIndicatorStyle={{ backgroundColor: "black" }}
            backgroundStyle={{ backgroundColor: "#FFFFFF" }}
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

    const [pressed, setPressed] = useState(false);

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
    contentContainer: {
        flex: 1,
        textAlign: "center",
    },
    containerAction: {
        flex: 1,
        padding: 20,
        alignItems: "center",
        backgroundColor: "white",
        borderTopWidth: 1,
        borderTopColor: '#ccc'
    }
});