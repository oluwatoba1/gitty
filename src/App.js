

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home';
import { GithubProvider } from './context/GithubProvider';
import GithubUser from './screens/GithubUser';
import OtherUsers from './screens/OtherUsers';
import { colors } from './theme/colors';

const Stack = createNativeStackNavigator()

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: colors.white,
    flex: 1
  };

  return (
    <GithubProvider>
      <NavigationContainer>
          <SafeAreaView style={backgroundStyle}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={backgroundStyle.backgroundColor}
            />
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen
                  name="Home"
                  component={Home}
                  options={{ title: 'Home' }}
                />
                <Stack.Screen
                  name="GithubUser"
                  component={GithubUser}
                  options={{ title: 'User' }}
                />
                <Stack.Screen
                  name="OtherUsers"
                  component={OtherUsers}
                  options={{ title: 'Users'}}
                />
            </Stack.Navigator>
          </SafeAreaView>
      </NavigationContainer>
    </GithubProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
