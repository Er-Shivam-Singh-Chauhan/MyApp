import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Theme from '../Utilities/Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const CustomInputBox = ({
  placeholder = '',
  value = '',
  onChangeText = () => {},
  customStyles = {},
  showEyeIcon = false,
}) => {
  const [text, setText] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    setText(value);
  }, [value]);
  const onChange = text => {
    setText(text);
    onChangeText(text);
  };
  return (
    <View style={styles.row}>
      <TextInput
        placeholder={placeholder}
        value={text}
        onChangeText={onChange}
        secureTextEntry={!showPassword}
        style={{ ...styles.input, ...customStyles }}
      />
      {showEyeIcon && (
        <TouchableOpacity
          style={{
            borderLeftWidth: 1,
            width: 38,
            height: 48,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Icon
            name={showPassword ? 'eye-off' : 'eye'}
            size={20}
            color={Theme.GREY}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomInputBox;

const styles = StyleSheet.create({
  inputBox: {},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 3,
    width: '80%',
    marginTop: 10,
    height: 48,
    padding: 4,
    paddingRight: 0,
    color: Theme.BLACK,
  },
});
