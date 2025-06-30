import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import Theme from '../../Utilities/Theme';
import { divide } from 'react-native/types_generated/Libraries/Animated/AnimatedExports';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const AuditSummaryScreen = ({ route }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerView}>
        <Text style={styles.heading}>Audit Summary</Text>
        <View style={styles.divider} />
        <Text style={styles.title}>Comment Summary</Text>
        <Text style={styles.comment}>{route?.params?.comment} </Text>
        {(route?.params?.questions || []).map((item, index) => {
          return (
            <View key={index}>
              {item.type == 'checkbox' ? (
                <View style={styles.block}>
                  <Text style={styles.title}>{item.Question}</Text>
                  <Text style={{ ...styles.comment, marginTop: 4 }}>
                    {item?.answer?.length == 1
                      ? item?.answer[0]
                      : item?.answer.slice(0, item?.answer.length).toString() +
                        ' and ' +
                        item?.answer[item?.answer.length - 1]}
                  </Text>
                </View>
              ) : item.type == 'radio' ? (
                <View>
                  <Text style={styles.title}>{item.Question}</Text>
                  <Text style={{ ...styles.comment, marginTop: 4 }}>
                    {item?.answer}
                  </Text>
                </View>
              ) : null}
            </View>
          );
        })}
      </View>
      <CustomButton
        label="GO BACK"
        onPress={() => {
          navigation.goBack();
        }}
        customeStyles={styles.backButton}
        fontStyle={styles.backButtonText}
      />
    </SafeAreaView>
  );
};

export default AuditSummaryScreen;
