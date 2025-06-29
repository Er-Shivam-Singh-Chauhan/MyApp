import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Theme from '../Utilities/Theme';

const CheckBox = ({
  title = '',
  selected = false,
  onPress = () => {},
  editable = true,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        onPress(title);
      }}
      disabled={!editable}
    >
      <Icon
        name={selected ? 'checkbox-outline' : 'checkbox-blank-outline'}
        size={20}
        color={
          selected
            ? Theme.SECONDARY_BLUE
            : editable
            ? Theme.BLACK
            : Theme.LIGHT_GREY
        }
      />
      <Text
        style={{
          ...styles.title,
          color: selected
            ? Theme.SECONDARY_BLUE
            : editable
            ? Theme.BLACK
            : Theme.LIGHT_GREY,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  title: {
    marginLeft: 5,
  },
});
