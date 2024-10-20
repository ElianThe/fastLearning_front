import {TouchableOpacity, StyleSheet, Text, View} from "react-native";

interface onPressProps {
    onPress: () => void;
}

export default function ButtonCard({onPress} : onPressProps) {
    return (
        <>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {onPress();}}
            >
                <Text style={styles.text}>
                    Retourner la carte
                </Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop: 10,
        padding: 15,
        backgroundColor: '#003049',
        borderRadius: 10,
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        color: "#FFFFFF",
    },
});
