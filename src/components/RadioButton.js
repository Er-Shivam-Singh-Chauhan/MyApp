import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Theme from '../Utilities/Theme';

const RadioButton = ({
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
        name={selected ? 'radiobox-marked' : 'radiobox-blank'}
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
          marginLeft: 5,
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

export default RadioButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
});
