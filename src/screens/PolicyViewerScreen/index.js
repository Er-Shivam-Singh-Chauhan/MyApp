import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import Theme from '../../Utilities/Theme';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const PolicyViewerScreen = () => {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Icon name="arrow-left" size={24} color={Theme.BLACK} />
      </TouchableOpacity>
      <Text style={styles.heading}>Privacy Policy</Text>
      <View style={styles.webViewContainer}>
        {loading && (
          // <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Theme.PRIMARY} />
          // </View>
        )}
        <View style={{ height: loading ? 0 : '100%' }}>
          <WebView
            source={{
              uri: 'https://www.freeprivacypolicy.com/live/87e71879-b3b8-4540-ab62-6252e6eb57e7',
            }}
            style={styles.webView}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
          />
        </View>
      </View>
    </View>
  );
};

export default PolicyViewerScreen;
