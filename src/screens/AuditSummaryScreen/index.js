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
        customeStyles={{
          backgroundColor: Theme.SECONDARY_BLUE,
          borderWidth: 0,
          alignSelf: 'center',
        }}
        fontStyle={{ color: Theme.WHITE }}
      />
    </SafeAreaView>
  );
};

export default AuditSummaryScreen;

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
});
