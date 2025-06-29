import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuditFormScreen from '../screens/AuditFormScreen';
import AuditHistoryScreen from '../screens/AuditHistoryScreen';
import PolicyViewerScreen from '../screens/PolicyViewerScreen';
import AuditSummaryScreen from '../screens/AuditSummaryScreen';
import DrawerNavigation from '../screens/DrawerNavigation';
import LoginScreen from '../screens/LoginScreen';

const RootNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="DrawerNavigation"
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
      <Stack.Screen name="AuditFormScreen" component={AuditFormScreen} />
      <Stack.Screen name="AuditHistory" component={AuditHistoryScreen} />
      <Stack.Screen name="PolicyViewer" component={PolicyViewerScreen} />
      <Stack.Screen name="AuditSummary" component={AuditSummaryScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({});
