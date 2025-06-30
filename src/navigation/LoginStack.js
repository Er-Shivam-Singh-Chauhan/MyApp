import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import PolicyViewerScreen from '../screens/PolicyViewerScreen';

const LoginStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PolicyViewerScreen} />
    </Stack.Navigator>
  );
};

export default LoginStack;
