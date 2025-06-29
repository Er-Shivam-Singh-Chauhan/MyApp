import {
  Alert,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import Theme from '../../Utilities/Theme';
import { getItem, storeItem } from '../../Utilities/AsyncUtils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Strings from '../../Utilities/Strings';
import { useNavigation } from '@react-navigation/native';

const AuditHistoryScreen = () => {
  const [audits, setAudits] = useState([]);
  const [roleType, setRoleType] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    getAudits();
    getRoleType();
  }, []);

  const getRoleType = async () => {
    const userData = await getItem(Strings.USER_DATA);
    setRoleType(userData.roleType);
  };
  const getAudits = async () => {
    const res = await getItem(Strings.AUDIT_DATA);
    setAudits(res);
  };
  const deleteAuditPrompt = id => {
    Alert.alert(
      'Delete Audit',
      'Are you sure you want to delete this audit?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            deleteAudit(id);
          },
        },
      ],
      { cancelable: false },
    );
  };
  const deleteAudit = async id => {
    const res = await getItem(Strings.AUDIT_DATA);
    const filtered = res.filter(item => item.id !== id);
    await storeItem(Strings.AUDIT_DATA, filtered);
    setAudits(filtered);
  };
  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.title}>#{index + 1} Audit</Text>
            {roleType == 'Admin' && (
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                  deleteAuditPrompt(item.id);
                }}
              >
                <Icon
                  name="trash-can-outline"
                  size={18}
                  color={Theme.ERROR_RED}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.divider} />
          <View style={styles.innerView}>
            <Text style={styles.title}>Comment Summary</Text>
            <Text>{item?.comment}</Text>

            {(item.questions || []).map((item, index) => {
              return (
                <View key={index}>
                  {item.type == 'checkbox' ? (
                    <View style={styles.block}>
                      <Text style={styles.title}>{item.Question}</Text>
                      <Text style={{ ...styles.comment, marginTop: 4 }}>
                        {item?.answer?.length == 1
                          ? item?.answer[0]
                          : item?.answer
                              .slice(0, item?.answer.length)
                              .toString() +
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
        </View>
      );
    },
    [audits],
  );
  return (
    <SafeAreaView style={styles.mainContainer}>
      <TouchableOpacity
        style={{
          alignSelf: 'flex-start',
          marginLeft: 20,
        }}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Icon name="arrow-left" size={24} color={Theme.BLACK} />
      </TouchableOpacity>
      <Text style={styles.heading}>Audit History</Text>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={audits}
        style={{ width: '100%' }}
        renderItem={renderItem}
        contentContainerStyle={audits.length === 0 && { flex: 1 }}
        initialNumToRender={5}
        windowSize={3}
        ListEmptyComponent={
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}
          >
            <Text style={styles.noData}>No audit records found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default AuditHistoryScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Theme.WHITE,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    lineHeight: 42,
    fontWeight: '600',
    color: Theme.SECONDARY_BLUE,
    textAlign: 'center',
  },
  noData: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '300',
    color: Theme.GREY,
  },
  container: {
    backgroundColor: Theme.WHITE,
    borderColor: Theme.GREY,
    borderWidth: 1,
    elevation: 2,
    borderRadius: 4,
    margin: 14,
    // padding: 10,
    shadowColor: Theme.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
    borderColor: Theme.GREY,
    // marginVertical: 8,
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
  innerView: { padding: 8 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
  },
  deleteButton: {
    backgroundColor: Theme.LIGHT_GREY,
    padding: 7,
    borderRadius: 40,
  },
});
