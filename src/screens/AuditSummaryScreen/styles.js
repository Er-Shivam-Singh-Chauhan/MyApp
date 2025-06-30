import { StyleSheet } from 'react-native';
import Theme from '../../Utilities/Theme';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.WHITE },
  innerView: { padding: 8, flex: 1 },
  heading: {
    fontSize: 24,
    lineHeight: 42,
    fontWeight: '600',
    color: Theme.SECONDARY_BLUE,
    textAlign: 'center',
  },
  title: {
    fontSize: 14,
    lineHeight: 18,
    marginTop: 10,
    fontWeight: '600',
    color: Theme.SECONDARY_BLUE,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: Theme.SECONDARY_BLUE,
    marginVertical: 8,
  },
  comment: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '350',
    color: Theme.BLACK,
    // marginTop: 8,
    // marginHorizontal: 5,
  },
  block: {
    marginVertical: 8,
  },
  backButton: {
    backgroundColor: Theme.SECONDARY_BLUE,
    borderWidth: 0,
    alignSelf: 'center',
  },
  backButtonText: { color: Theme.WHITE },
});
export default styles;
