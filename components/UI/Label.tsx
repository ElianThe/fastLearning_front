import React, {PropsWithChildren} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Colors} from "@/constants/Colors";

type LabelProps = PropsWithChildren<{}>;

const Label = ({children}: LabelProps) => {
    return (
        <Text style={styles.labelText}>{children}</Text>
    );
};

const styles = StyleSheet.create({

    labelText: {
        fontSize: 14,
        color: Colors.light.text,
        marginBottom: 7
    },
});

export default Label;