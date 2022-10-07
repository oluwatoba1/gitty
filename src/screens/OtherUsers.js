import React, { useEffect, useCallback } from "react";
import { BackHandler, View, Image, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import Loader from "../components/Loader";
import NotFound from "../components/NotFound";
import { useGithub } from "../context/GithubProvider";
import { colors } from "../theme/colors";
import { Layout } from "../components/Layout";
import Header from "../components/Header";

export default function OtherUsers({ navigation: { navigate }, route }){
    const title = route.params?.title;
    const previousTitle = route.params?.previousTitle;
    const username = route.params?.username;
    const { fetchOtherUsers, otherUsers, loading } = useGithub();

    const onNavigateBack = () => {
        navigate('GithubUser', { username, title, previousTitle });
        return true
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener(
                'hardwareBackPress',
                onNavigateBack,
              );
          
              return () => BackHandler.removeEventListener('hardwareBackPress', onNavigateBack);
              // eslint-disable-next-line
        }, [title, previousTitle, username])
    );

    useEffect(() => {
        fetchOtherUsers(username, title)
    }, [title, previousTitle, username]);

    if(loading) return <Loader />

    return (
        <Layout>
            <Header title={title} backAction={onNavigateBack} />
            {!otherUsers.length ? (
                <NotFound message={`This user has 0 ${title?.charAt(0)?.toUpperCase() + title?.substring(1)}`} />
                ) : (
                <View style={styles.cardContainer}>
                    <FlatList
                        refreshing={loading}
                        onRefresh={() => fetchOtherUsers(username, title)}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        data={otherUsers}
                        numColumns={2}
                        renderItem={({item}) => (
                            <TouchableOpacity 
                                onPress={() => navigate('GithubUser', {username: item.login, previousUsername: username, title, previousTitle })} 
                                style={styles.card}>
                                <View style={styles.imageContainer}>
                                    <Image source={{uri: item.avatar_url}} style={styles.image} />
                                </View>
                                <Text style={styles.username}>{item.login}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
        </Layout>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        width: '100%',
        padding: 10,
    },
    card: {
        backgroundColor: colors.white,
        borderRadius: 8,
        padding: 10,
        width: '45%',
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },
    imageContainer: {
        height: 50,
        width: 50,
        borderColor: colors.primary,
        borderWidth: 1,
        borderRadius: 25,
        overflow: 'hidden'
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
    },
    username: {
        fontSize: 14,
        color: colors.black
    }
})