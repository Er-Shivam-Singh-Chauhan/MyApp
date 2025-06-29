import { Text, View, TextInput, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import Checkbox from '../../components/RadioButton';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import Theme from '../../Utilities/Theme';
import { storeItem } from '../../Utilities/AsyncUtils';
import Strings from '../../Utilities/Strings';
import CustomInputBox from '../../components/CustomInputBox';
import { useDispatch } from 'react-redux';
import { changeNavigator } from '../../redux/actions/appStackActions';
const LoginScreen = ({ setIsLoggedIn }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [roleType, setRoleType] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showpassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  //The function to handle login with all the validations
  const onClickLogin = async () => {
    setPasswordError('');
    setUserNameError('');
    //check if username is filled and not then set error for username
    if (userName.trim() === '') {
      setUserNameError('Please enter user name.');
    }
    //check if password is filled and not then set error for password
    if (password.trim() === '') {
      setPasswordError('Please enter password.');
    }
    //check if role type is filled and not then show toast for role type
    if (roleType.trim() === '') {
      Toast.show('Please select role type.', Toast.SHORT);
      return;
    }
    //check if all the fields are filled then save the data to async storage and navigate to audit form screen
    if (userName && password && roleType) {
      Toast.show('Login successful.', Toast.SHORT);
      await storeItem(Strings.USER_DATA, { userName, password, roleType });
      dispatch(changeNavigator(true));
      // navigation.navigate('HomeScreen');
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.login}>Login</Text>
      <TextInput
        style={styles.inputBox}
        placeholder="Please enter user name."
        value={userName}
        onChangeText={t => {
          setUserNameError('');
          setUserName(t);
        }}
      />
      <Text
        style={{
          fontSize: 12,
          lineHeight: 18,
          color: Theme.ERROR_RED,
          width: '80%',
          marginTop: 3,
        }}
      >
        {userNameError}
      </Text>
      <CustomInputBox
        secureTextEntry={!showpassword}
        showEyeIcon={true}
        placeholder="Please enter password."
        value={password}
        onChangeText={t => {
          setPasswordError('');
          setPassword(t);
        }}
      />
      <Text
        style={{
          fontSize: 12,
          lineHeight: 18,
          color: Theme.ERROR_RED,
          width: '80%',
          marginTop: 3,
        }}
      >
        {passwordError}
      </Text>

      <View
        style={{ alignSelf: 'flex-start', marginLeft: '10%', marginTop: '5%' }}
      >
        <Checkbox
          title={'Admin'}
          selected={roleType === 'Admin'}
          onPress={t => {
            setRoleType(t);
          }}
        />
        <Checkbox
          title={'Auditor'}
          selected={roleType === 'Auditor'}
          onPress={t => {
            setRoleType(t);
          }}
        />
        <Checkbox
          title={'Viewer'}
          selected={roleType === 'Viewer'}
          onPress={t => {
            setRoleType(t);
          }}
        />
        <CustomButton
          label={'Login'}
          onPress={() => {
            onClickLogin();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
