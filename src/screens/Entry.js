import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from '../navigation/RootNavigation';
import LoginStack from '../navigation/LoginStack';
import { useSelector } from 'react-redux';

const Entry = () => {
  const [loggedIn, setIsLoggedIn] = useState(false);
  const isLoggedIn = useSelector(state => state?.isLoggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      setIsLoggedIn(isLoggedIn);
    }
  }, [isLoggedIn]);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          {loggedIn ? <RootNavigation /> : <LoginStack />}
        </NavigationContainer>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Entry;

const styles = StyleSheet.create({});
