import { Dimensions, StyleSheet } from 'react-native';
import Theme from '../../Utilities/Theme';

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: Theme.WHITE },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.WHITE,
    flex: 1,
    // zIndex: 10,
  },
  heading: {
    fontSize: 24,
    lineHeight: 42,
    fontWeight: '600',
    color: Theme.SECONDARY_BLUE,
    textAlign: 'center',
  },
  webViewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
  },
  webView: { width: Dimensions.get('screen').width },
});
export default styles;
