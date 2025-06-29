import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView, StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react'
import LoginStack from './src/navigation/LoginStack'
import HomeScreen from './src/screens/DrawerNavigation'
import { NavigationContainer } from '@react-navigation/native'
import RootNavigation from './src/navigation/RootNavigation'
// const store = createStoreHook(rootReducer)
const App = () => {
  const [loggedIn,setIsLoggedIn] = useState(false)

  return (
    // <Provider store={store}>
    <GestureHandlerRootView style={{ flex: 1 }}>
    <SafeAreaView style={{flex:1}}>
      
      <NavigationContainer>
   {loggedIn?<RootNavigation/>:<LoginStack setIsLoggedIn={setIsLoggedIn}/>}

   </NavigationContainer>
   
   </SafeAreaView>
   </GestureHandlerRootView>
     // </Provider>
  )
}

export default App

const styles = StyleSheet.create({

})