import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: '10%',
    backgroundColor: '#fff',
  },
  inputBox: {
    borderWidth: 1,
    borderRadius: 3,
    width: '80%',
    marginTop: 10,
    height: 48,
    padding: 4,
    color: '#000',
  },
  login: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '600',
  },
});

export default styles;
