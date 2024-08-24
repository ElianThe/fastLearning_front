import {TouchableOpacity, StyleSheet, Text, View} from "react-native";

interface onPressProps {
    onPress: () => void;
}

export default function ButtonCard({onPress} : onPressProps) {
    return (
        <View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {onPress();}}
            >
                <Text style={styles.text}>
                    Retourner la carte
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#DDDDDD',
        borderRadius: 10,
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
    },
});