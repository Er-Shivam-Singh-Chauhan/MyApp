import {
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
import React, { useEffect, useRef, useState } from 'react';
import Theme from '../../Utilities/Theme';
import Strings from '../../Utilities/Strings';
import { getItem, removeItem, storeItem } from '../../Utilities/AsyncUtils';
import CustomButton from '../../components/CustomButton';
import RadioButton from '../../components/RadioButton';
import CheckBox from '../../components/CheckBox';
import Toast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';
const Step = ({ children, fadeAnim }) => (
  <Animated.View style={{ ...styles.step, opacity: fadeAnim }}>
    {children}
  </Animated.View>
);
const AuditFormScreen = () => {
  const [roleType, setRoleType] = useState('');
  const [step, setStep] = useState(0);
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
  useEffect(() => {
    // removeItem(Strings.AUDIT_DATA);
    getRoleType();
  }, []);
  const getRoleType = async () => {
    const userData = await getItem(Strings.USER_DATA);
    setRoleType(userData.roleType);
    setEditable(userData.roleType === 'Auditor');
  };
  const setAuditOptions = title => {
    setErrors({ ...errors, step1: '' });
    if (auditsSelected.includes(title)) {
      setAuditSelected(auditsSelected.filter(item => item !== title));
    } else {
      setAuditSelected([...auditsSelected, title]);
    }
  };
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
  const setRatings = rating => {
    setErrors({ ...errors, step3: '' });
    setSelectedRating(rating);
  };
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

  const animateFadeIn = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animateFadeIn();
  }, [step]);
  const goToHistory = () => {
    navigation.navigate('AuditHistory');
  };
  const nextStep = () => setStep(prev => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 0));

  return (
    <SafeAreaView style={styles.mainContainer}>
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
});
