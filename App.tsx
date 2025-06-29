import {  StyleSheet} from 'react-native'
import React, {  useState } from 'react'
import { Provider } from 'react-redux'
import configureStore from './src/redux/store'
import Entry from './src/screens/Entry'
const {store} = configureStore()
const App = () => {
  return (
    <Provider store={store}>
    <Entry/>
     </Provider>
  )
}

export default App

const styles = StyleSheet.create({

})