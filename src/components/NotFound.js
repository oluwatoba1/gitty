import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'

import { colors } from '../theme/colors';

export default function NotFound({ message }){
    return (
        <View>
            <Image source={require('../assets/nouser.png')} style={styles.image} />
            <Text style={styles.message}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 80,
        resizeMode: 'contain'
    },
    message: {
        fontSize: 16,
        color: colors.black,
        marginTop: 10
    }
});

NotFound.propTypes = {
    message: PropTypes.string
}

NotFound.defaultProps = {
    message: 'Not found'
}