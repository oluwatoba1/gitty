import React, { createContext, useContext, useState } from "react";
import { Alert } from "react-native";
import { fetchUser, fetchUserFollowing, fetchUserFollowers } from "../utils/urls";

const GithubContext = createContext({});

export function useGithub(){
    return useContext(GithubContext)
}

export function GithubProvider({ children }){
    const [searchTerm, setSearchTerm] = useState('');
    const [githubUser, setGithubUser] = useState({});
    const [otherUsers, setOtherUsers] = useState([]);
    const [loading, setLoading] = useState(false)

    const fetchGithubUsers = async (username) => {
        setLoading(true)
        try {
            const response = await fetch(fetchUser(username || searchTerm));
            const result = await response.json();
            setGithubUser(result)
        } catch (error) {
            Alert.alert(error.message || error.response.data.message);
        }finally{
            setLoading(false)
        }
    }

    const fetchOtherUsers = async (username, slug) => {
        const url = slug === 'Followers' ? fetchUserFollowers(username || searchTerm) : 
            fetchUserFollowing(username || searchTerm);
        setLoading(true)
        try {
            const response = await fetch(url);
            const result = await response.json();
            setOtherUsers(result)
        } catch (error) {
            Alert.alert(error.message || error.response.data.message)
        }finally{
            setLoading(false)
        }
    };

    const value = {
        searchTerm,
        setSearchTerm,
        githubUser,
        otherUsers,
        fetchGithubUsers,
        fetchOtherUsers,
        loading
    }

    return <GithubContext.Provider value={value}>{children}</GithubContext.Provider>
}
