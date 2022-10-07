import React, { useCallback, useEffect } from "react";
import { BackHandler, View, Text, Image, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'

import { Layout } from "../components/Layout";
import Loader from "../components/Loader";
import NotFound from "../components/NotFound";
import { useGithub } from "../context/GithubProvider";
import { colors } from "../theme/colors";
import Header from "../components/Header";

export default function GithubUser({ navigation: { navigate }, route }){
    const username = route.params?.username;
    const previousUsername = route.params?.previousUsername;
    const title = route.params?.title;
    const previousTitle = route.params?.previousTitle;
    const { fetchGithubUsers, githubUser, loading } = useGithub();

    console.log("tittt", {title, previousTitle})

    const onNavigateBack = () => {
        const route = (!previousUsername && !username) ? null : 'OtherUsers';
        navigate(route || 'Home', { title: previousTitle || title, username: previousUsername });
        return true
    }
    
    useEffect(() => {
        fetchGithubUsers(username);
    }, [username]);

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener(
                'hardwareBackPress',
                onNavigateBack,
              );
          
              return () => BackHandler.removeEventListener('hardwareBackPress', onNavigateBack);
              // eslint-disable-next-line
        }, [previousTitle, username])
    );
    

    if(loading) return <Loader />

    return (
        <Layout>
            <Header title="User" backAction={onNavigateBack} />
            <View style={styles.userContainer}>
                {githubUser.name ? (
                    <View style={styles.card}>
                        <View style={styles.avatarContainer}>
                            <Image source={{uri: githubUser.avatar_url}} style={styles.avatar} />
                        </View>
                        <Text style={styles.name}>{githubUser.name}</Text>
                        <Text style={styles.username}>{githubUser.login}</Text>
                        <Text style={styles.bio}>{githubUser.bio || '-'}</Text>
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>
                                <Text 
                                    style={styles.highlight} 
                                    onPress={() => navigate('OtherUsers', {title: 'Followers', previousTitle: title, username: githubUser.login})}>
                                        {githubUser.followers}</Text> Followers
                                </Text>
                            <Text style={styles.footerText}>
                                <Text 
                                style={styles.highlight}
                                onPress={() => navigate('OtherUsers', {title: 'Following', previousTitle: title, username: githubUser.login})}>
                                    {githubUser.following}</Text> Following
                            </Text>
                        </View>
                    </View>
                ): <NotFound message="No user found" />}
            </View>
        </Layout>
    )
}

const styles = StyleSheet.create({
    userContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        backgroundColor: colors.white,
        borderRadius: 8,
        padding: 10,
        width: '80%',
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatarContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: colors.primary,
        overflow: 'hidden'
    },
    avatar: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
    },
    name: {
        fontSize: 24,
        color: colors.black,
        fontWeight: '700',
        marginBottom: 5
    },
    username: {
        fontSize: 16,
        color: colors.black,
        fontWeight: '400',
        marginBottom: 10
    },
    bio: {
        fontSize: 18,
        color: colors.black
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    footerText: {
        fontSize: 14,
        color: colors.black
    },
    highlight: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.primary,
        textDecorationLine: 'underline'
    }
})