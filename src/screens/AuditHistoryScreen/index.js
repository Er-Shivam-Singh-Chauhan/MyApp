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
import styles from './styles';

const AuditHistoryScreen = () => {
  const [audits, setAudits] = useState([]);
  const [roleType, setRoleType] = useState('');
  const navigation = useNavigation();
  //This will be called when the component mounts to get all audits and roletype
  useEffect(() => {
    getAudits();
    getRoleType();
  }, []);
  //getRoleType() => This will be called when the component mounts and this will get the user role type from async storage
  const getRoleType = async () => {
    const userData = await getItem(Strings.USER_DATA);
    setRoleType(userData.roleType);
  };
  //getAudits() => This will be called when the component mounts and this will get all audits from async storage
  const getAudits = async () => {
    const res = await getItem(Strings.AUDIT_DATA);
    setAudits(res);
  };
  //deleteAuditPrompt() => This will prompt the user to delete any audit
  const deleteAuditPrompt = id => {
    Alert.alert(
      'Delete Audit',
      'Are you sure you want to delete this audit?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
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
  //deleteAudit() => This will be called when the user clicks on the delete button on alert to delete any audit
  const deleteAudit = async id => {
    const res = await getItem(Strings.AUDIT_DATA);
    const filtered = res.filter(item => item.id !== id);
    await storeItem(Strings.AUDIT_DATA, filtered);
    setAudits(filtered);
  };
  //renderItem() => This is the block to render each audit on screen and wrapped inside useCallback to optimize performance
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
        style={styles.backButton}
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
        style={styles.FlatListContainer}
        renderItem={renderItem}
        contentContainerStyle={audits.length === 0 && { flex: 1 }}
        initialNumToRender={5}
        windowSize={3}
        ListEmptyComponent={
          <View style={styles.noDataContainer}>
            <Text style={styles.noData}>No audit records found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default AuditHistoryScreen;
