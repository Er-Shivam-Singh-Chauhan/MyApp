import { SafeAreaView } from 'react-native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from '../navigation/RootNavigation';
import LoginStack from '../navigation/LoginStack';
import { useSelector } from 'react-redux';

const Entry = () => {
  // isLoggedIn => this will check whether user is logged in or not using redux value
  const isLoggedIn = useSelector(state => state?.isLoggedIn);
  //returnSection()=> this will return either RootNavigation or LoginStack based on user is logged in or not and loggedIn value is managed using Redux
  const returnSection = () => {
    if (isLoggedIn) {
      return <RootNavigation />;
    } else {
      return <LoginStack />;
    }
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer key={isLoggedIn ? 'user' : 'guest'}>
          {returnSection()}
        </NavigationContainer>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Entry;
