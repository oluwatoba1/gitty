import React from "react";
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from "../theme/colors";

export default function Loader(){
    return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator size={24} color={colors.primary} />
        </View>
    )
}

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})