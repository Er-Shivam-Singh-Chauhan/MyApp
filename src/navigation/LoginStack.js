import { StyleSheet } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStaticNavigation } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';

const LoginStack = props => {
  const Stack = createNativeStackNavigator();
  console.log('props', props);
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={() => <LoginScreen {...props} />} />
    </Stack.Navigator>
  );
};

export default LoginStack;

const styles = StyleSheet.create({});
