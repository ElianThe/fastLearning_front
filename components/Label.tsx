import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface LabelProps {
    text: string;
}

const Label = ({text} : LabelProps ) => {
    return (
        <View style={styles.labelContainer}>
            <Text style={styles.labelText}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    labelContainer: {
        // Styles pour le conteneur, comme le padding, les bordures, etc.
        padding: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 4,
    },
    labelText: {
        // Styles pour le texte, comme la couleur, la taille, etc.
        fontSize: 16,
        color: '#333',
    },
});

export default Label;
