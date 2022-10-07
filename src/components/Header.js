import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../theme/colors';

export default function Header({ backAction, title }){
    return (
        <View style={styles.headerContainer}>
            {!!backAction ? (
                <TouchableOpacity onPress={backAction} style={styles.imageContainer}>
                    <Image source={require('../assets/arrow-back.png')} style={styles.image} />
                </TouchableOpacity>
            ): null}
            <Text style={styles.heading}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 50,
        width: '100%',
        paddingHorizontal: 10,
        alignItems: 'center', 
        flexDirection: 'row',
        backgroundColor: colors.white,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    imageContainer: {
        marginRight: 20
    },
    image: {
        height: 25,
        width: 25,
        resizeMode: 'contain'
    },
    heading: {
        fontSize: 20,
        color: colors.black,
        fontWeight: '500'
    }
})

Header.propTypes = {
    backAction: PropTypes.func,
    title: PropTypes.string.isRequired
}

Header.defaultProps = {
    backAction: null
}