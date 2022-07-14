import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import {COLORS} from '../constants';
import {firestore} from '../firebase/utils';

const UserLogin = ({navigation}) => {
  console.log('User Loign Screen');

  const [email, onChangeEmail] = useState('01975184');
  const [pContent, onChangepContent] = useState(null);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (done) {
      navigation.navigate('UserHome', {pContent, email});
      ResetForm();
    }
  }, [done]);

  const ResetForm = () => {
    onChangeEmail('');
    setError('');
  };

  const checkProp = async propertyId => {
    try {
      const propertyId_ExistRef = firestore().doc(
        'propertyIds/UAqCWjB5b3hytoTOFui9',
      );
      const propertyIds = await propertyId_ExistRef.get();
      const propertyArray = propertyIds.data().properties;
      let i = 0;
      let IDFound = false;
      while (i < propertyArray.length && !IDFound) {
        if (propertyArray[i].RandomPropertyID == propertyId) {
          IDFound = true;
          break;
        }
        i++;
      }
      if (!IDFound) {
        setError('propertyId not found.');
      } else {
        const property_Ref = firestore().doc(`property/${propertyId}`);
        const property_precontent = await property_Ref.get();
        if (property_precontent.exists) {
          setDone(true);
          onChangepContent(email);
        }
      }
    } catch (err) {
      console.log('error from login user action =>');
      console.log(err);
      setError(err.toString().slice(err.toString().indexOf(']') + 2));
    }
  };

  const handleRegister = async e => {
    var checking_form = 'true';
    console.log('From Login ===>', email);
    if (email.length !== 8) {
      setError('* PropertyId is 8 character');
      checking_form = 'false';
    } else {
      setError('');
    }
    if (checking_form === 'true') {
      checkProp(email);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <IconFeather
            name="arrow-left"
            size={25}
            color={COLORS.greyColor}
            style={styles.icon_style}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.headerTitle}>
          <Text style={styles.headerText1}>Login</Text>
        </View>
        <View style={styles.content}>
          {/* Email Adresse */}
          <View style={styles.inputField}>
            <Text style={styles.label}>PropertyId</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeEmail}
              value={email}
              keyboardType="numeric"
              placeholder="12345678"
              maxLength={8}
              placeholderTextColor={'grey'}
            />
            <Text style={styles.fieldErrors}>{error}</Text>
          </View>
          <TouchableOpacity style={styles.button1} onPress={handleRegister}>
            <Text style={styles.signup}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserLogin;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    color: COLORS.main,
    backgroundColor: COLORS.whiteColor,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  icon_style: {
    flex: 0.45,
    padding: 20,
    marginTop: 30,
  },
  headerTitle: {
    paddingVertical: 10,
  },
  headerText: {
    color: COLORS.greyColor,
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 0,
    lineHeight: 20,
  },
  headerText1: {
    color: 'black',
    textAlign: 'center',
    fontSize: 28,
    textTransform: 'uppercase',
    marginBottom: 25,
  },
  content: {
    paddingHorizontal: 40,
    marginTop: 50,
  },
  inputField: {
    paddingTop: 0,
    padding: 5,
    width: '100%',
  },
  label: {
    textAlign: 'left',
    fontSize: 16,
    color: COLORS.greyColor,
    marginBottom: 10,
  },
  privacy: {
    textAlign: 'left',
    fontSize: 12,
    color: 'white',
    // marginBottom: 10,
  },
  label1: {
    textAlign: 'left',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
    color: COLORS.greyColor,
    marginBottom: 10,
  },
  label2: {
    textAlign: 'left',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
    color: COLORS.blueColor,
    textDecorationStyle: 'solid',
    textDecorationColor: COLORS.greyColor,
    marginBottom: 10,
  },
  fieldErrors: {
    marginVertical: 3,
    color: COLORS.redColor,
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 10,
  },
  input: {
    borderRadius: 10,
    fontSize: 14,
    color: COLORS.darkgray,
    borderWidth: 1,
    borderColor: COLORS.greyColor,
    backgroundColor: COLORS.whiteColor,
    paddingVertical: 10,
    paddingLeft: 20,
    width: '100%',
  },
  passwordField: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  eyeIcon: {
    position: 'absolute',
    right: 20,
    fontSize: 25,
  },
  terms: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 10,
  },
  signup: {
    backgroundColor: COLORS.blue2Color,
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    // marginVertical: 20,
  },
  button1: {
    marginBottom: 20,
  },
  errors: {
    paddingVertical: 10,
  },
  error: {
    color: 'red',
    fontSize: 18,
    fontWeight: '600',
  },
  already: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
});
