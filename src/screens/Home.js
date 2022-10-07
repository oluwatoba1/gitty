import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Header from "../components/Header";
import { Layout } from "../components/Layout";
import { useGithub } from "../context/GithubProvider";
import { colors } from "../theme/colors";

export default function Home({ navigation }){
    const { searchTerm, setSearchTerm } = useGithub();

    return (
        <Layout>
            <Header title="Home" />
            <View style={styles.searchContainer}>
                <Text style={styles.heading}>Search for github user by username</Text>
                <View style={styles.searchWrapper}>
                    <TextInput 
                        style={styles.textInput} 
                        value={searchTerm} 
                        onChangeText={setSearchTerm}
                        placeholder="Search by username" />
                    <TouchableOpacity style={styles.searchButton} onPress={() => navigation.navigate('GithubUser')}>
                        <Text style={styles.searchText}>Search</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Layout>
    )
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 14,
        color: colors.black,
        marginBottom: 20,
    },
    searchContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    searchWrapper: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textInput: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        borderColor: colors.primary,
        borderWidth: 1,
        width: '100%',
        marginBottom: 10,
        color: colors.black
    },
    searchButton: {
        backgroundColor: colors.primary,
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 20
    },
    searchText: {
        fontWeight: '600',
        fontSize: 14,
        color: colors.white
    }
})