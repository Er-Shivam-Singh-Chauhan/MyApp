import {
  Alert,
  Animated,
  Button,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { use, useEffect, useRef, useState } from 'react';
import Theme from '../../Utilities/Theme';
import Strings from '../../Utilities/Strings';
import { getItem, removeItem, storeItem } from '../../Utilities/AsyncUtils';
import CustomButton from '../../components/CustomButton';
import RadioButton from '../../components/RadioButton';
import CheckBox from '../../components/CheckBox';
import Toast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { resetNavigator } from '../../redux/actions/appStackActions';
import styles from './styles';
const Step = ({ children, fadeAnim }) => (
  <Animated.View style={{ ...styles.step, opacity: fadeAnim }}>
    {children}
  </Animated.View>
);
const AuditFormScreen = () => {
  const [roleType, setRoleType] = useState('');
  const [step, setStep] = useState(0);
  const dispatch = useDispatch();
  const [selectedRating, setSelectedRating] = useState('');
  const [comment, setComment] = useState('');
  const navigation = useNavigation();
  const [editable, setEditable] = useState(false);
  const [auditsSelected, setAuditSelected] = useState([]);
  const [errors, setErrors] = useState({ step1: '', step2: '', step3: '' });
  const [options] = useState([
    { id: 'iso9001', value: 'ISO 9001 (Quality Management)' },
    { id: 'iso27001', value: 'ISO 27001 (Information Security)' },
    { id: 'sox', value: 'SOX (Sarbanes-Oxley Act)' },
    { id: 'hipaa', value: 'HIPAA' },
    { id: 'gdpr', value: 'GDPR' },
    { id: 'pciDss', value: 'PCI-DSS' },
    { id: 'internalPolicies', value: 'Internal company policies' },
    { id: 'industryStandards', value: 'Industry-specific standards' },
  ]);
  const Question1 = 'Which standards or frameworks are you auditing against?';
  const Question2 = 'How would you rate your overall experience?';
  const fadeAnim = useRef(new Animated.Value(0)).current;
  //This will be called when the component mounts
  useEffect(() => {
    // removeItem(Strings.AUDIT_DATA);
    getRoleType();
  }, []);
  //getRoleType() => This will be called when the component mounts and this will get the user role type from async storage
  const getRoleType = async () => {
    const userData = await getItem(Strings.USER_DATA);
    setRoleType(userData.roleType);
    setEditable(userData.roleType === 'Auditor');
  };
  // setAuditOptions() => This will be called when the user clicks on the checkboxes in step 1
  const setAuditOptions = title => {
    setErrors({ ...errors, step1: '' });
    if (auditsSelected.includes(title)) {
      setAuditSelected(auditsSelected.filter(item => item !== title));
    } else {
      setAuditSelected([...auditsSelected, title]);
    }
  };
  //submitData() => This will be called when the user clicks on the submit button
  const submitData = async () => {
    if (auditsSelected.length === 0) {
      setErrors(prev => ({
        ...prev,
        step1: 'Please select at least one option.',
      }));
    }
    if (comment.trim() === '') {
      setErrors(prev => ({
        ...prev,
        step2: 'Please enter your observations.',
      }));
    }
    if (selectedRating === '') {
      setErrors(prev => ({ ...prev, step3: 'Please select a rating.' }));
    }
    if (auditsSelected.length === 0) {
      setStep(0);
    } else if (comment.trim() === '') {
      setStep(1);
    } else if (selectedRating === '') {
      setStep(2);
    }

    if (
      auditsSelected.length !== 0 &&
      comment.trim() !== '' &&
      selectedRating !== ''
    ) {
      const oldAudits = (await getItem(Strings.AUDIT_DATA)) || [];

      const obj = {
        id: uuid.v4(),
        comment,
        questions: [
          { answer: auditsSelected, Question: Question1, type: 'checkbox' },
          { answer: selectedRating, Question: Question2, type: 'radio' },
        ],
      };
      oldAudits.push(obj);
      await storeItem(Strings.AUDIT_DATA, oldAudits);
      Toast.show('Form submitted successfully.', Toast.SHORT);
      setAuditSelected([]);
      setSelectedRating('');
      setComment('');
      setStep(0);
      navigation.navigate('AuditSummary', obj);
    }
  };
  //setRatings() => This will be called when the user clicks on the radio buttons in step 3
  const setRatings = rating => {
    setErrors({ ...errors, step3: '' });
    setSelectedRating(rating);
  };
  //These are multi step wizard
  const steps = [
    <Step fadeAnim={fadeAnim} key={0}>
      <Text style={styles.heading}>Question</Text>
      <Text style={styles.question}>{Question1}</Text>
      <Text style={styles.error}>{errors.step1}</Text>
      {options.map((option, index) => (
        <CheckBox
          editable={editable}
          key={option.id}
          selected={auditsSelected.includes(option.value)}
          title={option.value}
          onPress={title => setAuditOptions(title)}
        />
      ))}
    </Step>,
    <Step fadeAnim={fadeAnim} key={1}>
      <Text style={styles.heading}>Please fill your observations</Text>
      <Text style={styles.error}>{errors.step2}</Text>
      <TextInput
        editable={editable}
        multiline
        style={styles.multiline}
        placeholder="Add your thoughts."
        maxLength={500}
        value={comment}
        onChangeText={text => {
          setErrors({ ...errors, step2: '' });
          setComment(text);
        }}
      />
      <Text style={styles.info}>{comment.length}/500 remaining</Text>
    </Step>,
    <Step fadeAnim={fadeAnim} key={2}>
      <Text
        style={{
          fontWeight: '800',
          fontSize: 22,
          marginVertical: 10,
          marginBottom: 20,
        }}
      >
        Rating
      </Text>
      <Text style={styles.heading}>{Question2}</Text>
      <Text style={styles.error}>{errors.step3}</Text>

      <View>
        <RadioButton
          title="Excellent"
          selected={selectedRating === 'Excellent'}
          onPress={setRatings}
          editable={editable}
        />
        <RadioButton
          title="Good"
          selected={selectedRating === 'Good'}
          onPress={setRatings}
          editable={editable}
        />
        <RadioButton
          title="Average"
          selected={selectedRating === 'Average'}
          onPress={setRatings}
          editable={editable}
        />
        <RadioButton
          title="Bad"
          selected={selectedRating === 'Bad'}
          onPress={setRatings}
          editable={editable}
        />
        <TouchableOpacity
          disabled={!editable}
          onPress={() => setSelectedRating('')}
        >
          <Text
            style={{
              color: editable ? Theme.SECONDARY_BLUE : Theme.LIGHT_GREY,
              fontSize: 12,
              fontWeight: '600',
              textDecorationLine: 'underline',
              marginTop: 20,
            }}
          >
            CLEAR SELECTION
          </Text>
        </TouchableOpacity>
      </View>
    </Step>,
  ];
  //animateFadeIn() => fade animation will be called when user clicks on next or previous button
  const animateFadeIn = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  //useEffect will be triggered to show animation on every wizard changes
  useEffect(() => {
    animateFadeIn();
  }, [step]);
  //gotoHistory() => This will be called when the user want to see past audits
  const goToHistory = () => {
    navigation.navigate('AuditHistory');
    // dispatch(resetNavigator());
  };
  //logout() => This will be called when the user want to logout
  const logout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            dispatch(resetNavigator());
          },
        },
      ],
      { cancelable: false },
    );
  };
  const nextStep = () => setStep(prev => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 0));

  return (
    <SafeAreaView style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.logout}
        onPress={() => {
          logout();
        }}
      >
        <Icon name={'logout'} size={22} color={Theme.WHITE} />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          padding: 8,
        }}
      >
        {steps[step]}
      </View>
      {!editable && (
        <CustomButton
          label="View submitted audits"
          customeStyles={styles.history}
          fontStyle={styles.whiteColor}
          onPress={() => goToHistory()}
        />
      )}

      <View style={styles.buttonContainer}>
        {step > 0 && (
          <CustomButton
            label="Back"
            onPress={prevStep}
            customeStyles={styles.customButton}
            fontStyle={styles.whiteColor}
          />
        )}
        {step < steps.length - 1 ? (
          <CustomButton
            label="Next"
            onPress={nextStep}
            customeStyles={styles.customButton}
            fontStyle={styles.whiteColor}
          />
        ) : (
          <CustomButton
            label="Submit"
            disabled={!editable}
            onPress={() => {
              submitData();
            }}
            customeStyles={styles.customButton}
            fontStyle={styles.whiteColor}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default AuditFormScreen;
