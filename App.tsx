import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './src/screens/ProfileScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import MovieScreen from './src/screens/MovieScreen';

export type RootStackParamList = {
    Profile: undefined;
    SignUp: undefined;
    Movie: undefined;
};

//Navigation
const Stack = createNativeStackNavigator<RootStackParamList>();

const MyStack = () => {
    return(
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Profile">
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                headerTitle: 'Profile',
                headerTitleAlign: 'center',
              }}
            />
          <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{
                headerTitle: 'Inscription',
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="Movie"
              component={MovieScreen}
              options={{
                headerTitle: 'Films',
                headerTitleAlign: 'center',
              }}
            />
          </Stack.Navigator>
      </NavigationContainer>

    );
};

export default function App() {
    return (
        <MyStack/>
   
    );
  }