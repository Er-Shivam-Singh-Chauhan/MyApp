import AsyncStorage from '@react-native-async-storage/async-storage';
//store value in async storage
export const storeItem = async (key, item) => {
  try {
    //we want to wait for the Promise returned by AsyncStorage.setItem()
    //to be resolved to the actual value before returning the value
    var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
    return jsonOfItem;
  } catch (error) {}
};
//get value from async storage
export const getItem = async key => {
  try {
    const retrievedItem = await AsyncStorage.getItem(key);
    const item = JSON.parse(retrievedItem);
    return item;
  } catch (error) {
    const errorInfo = {
      fileName: 'AsyncUtils.js',
      methodName: 'getItem()',
      otherDetails: `getitem error===>${error.message}`,
    };
    LogErrorToFirebase(error, errorInfo);
    return null;
  }
};
//remove value from async storage
export const removeItem = async key => {
  try {
    const jsonOfItem = await AsyncStorage.removeItem(key);

    return jsonOfItem;
  } catch (error) {}
  return;
};
//reset async storage
export const clearDB = async () => {
  try {
    const retrievedItem = await AsyncStorage.clear();

    return retrievedItem;
  } catch (error) {}
  return;
};
