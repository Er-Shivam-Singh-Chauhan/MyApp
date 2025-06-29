import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Theme from '../Utilities/Theme';

const CustomButton = ({
  label = '',
  onPress,
  customeStyles = {},
  fontStyle = {},
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.mainView,
        customeStyles,
        { backgroundColor: disabled ? Theme.LIGHT_GREY : Theme.SECONDARY_BLUE },
      ]}
      onPress={onPress}
    >
      <Text style={{ ...fontStyle, ...styles.text }}>
        {label.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: Theme.WHITE,
    padding: 8,
    marginVertical: 6,
    width: Dimensions.get('screen').width * 0.8,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 4,
  },
  text: { fontWeight: '600' },
});
