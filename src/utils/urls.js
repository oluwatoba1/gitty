const baseUrl = 'https://api.github.com/users/';
export const fetchUser = (username) => baseUrl + `${username}`
export const fetchUserFollowers = (username) => baseUrl + `${username}/followers`;
export const fetchUserFollowing = (username) => baseUrl + `${username}/following`;