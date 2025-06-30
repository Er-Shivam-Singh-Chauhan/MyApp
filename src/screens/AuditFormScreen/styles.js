import { Dimensions, StyleSheet } from 'react-native';
import Theme from '../../Utilities/Theme';

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: Theme.WHITE },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  step: {
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('screen').width * 0.9,
    alignSelf: 'center',
  },
  customButton: {
    width: Dimensions.get('screen').width * 0.4,
    margHorizontal: 5,
    borderWidth: 0,
    backgroundColor: Theme.SECONDARY_BLUE,
  },
  multiline: {
    height: Dimensions.get('screen').height * 0.2,
    borderWidth: 1,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
    padding: 8,
    borderRadius: 4,
  },
  heading: { fontWeight: '500', fontSize: 16, marginVertical: 10 },
  info: {
    fontWeight: '500',
    fontSize: 12,
    marginVertical: 10,
    textAlign: 'right',
  },
  question: {
    fontWeight: '500',
    fontSize: 12,
    marginVertical: 10,
  },
  error: {
    color: Theme.ERROR_RED,
    fontWeight: '500',
    fontSize: 12,
    marginBottom: 10,
  },
  history: {
    width: Dimensions.get('screen').width * 0.9,
    alignSelf: 'center',
    margHorizontal: 5,
    borderWidth: 0,
    backgroundColor: Theme.SECONDARY_BLUE,
  },
  whiteColor: { color: Theme.WHITE },
  logout: {
    borderRadius: 50,
    backgroundColor: Theme.LIGHT_GREY,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginRight: '3%',
    paddingLeft: 3,
  },
});
export default styles;
