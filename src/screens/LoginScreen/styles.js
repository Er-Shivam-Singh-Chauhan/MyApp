import { StyleSheet } from 'react-native';
import Theme from '../../Utilities/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.WHITE,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: '10%',
  },
  inputBox: {
    borderWidth: 1,
    borderRadius: 3,
    width: '80%',
    marginTop: 10,
    height: 48,
    padding: 4,
    color: Theme.BLACK,
  },
  login: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '600',
  },
  privacyPolicy: {
    textDecorationLine: 'underline',
    color: Theme.SECONDARY_BLUE,
  },
  privacyPolicyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
