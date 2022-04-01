/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';
import CheckBox from '@react-native-community/checkbox';
import {COLORS, images} from '../constants';
import {useDispatch, useSelector} from 'react-redux';
import {
  signUpProperty,
  resetAllAuthForms,
  ResetErrorsState,
} from '../redux/Property/property.actions';

const mapState = ({property}) => ({
  currentProperty: property.currentProperty,
  propertySignUpSuccess: property.propertySignUpSuccess,
  errors: property.errors,
});

const Register = ({navigation}) => {
  console.log('Property Register Screen');
  const {currentProperty, propertySignUpSuccess, errors} =
    useSelector(mapState);
  const dispatch = useDispatch();
  dispatch(ResetErrorsState)

  console.log('propertySignUpSuccess =>', propertySignUpSuccess);
  console.log('currentProperty =>', currentProperty);
  console.log('errors =>', errors);

  const [propertyName, onChangePropertyName] = useState('');
  const [firstName, onChangefirstName] = useState('');
  const [lastName, onChangelastName] = useState('');
  const [address, onChangeAddress] = useState('');
  const [email, onChangeEmail] = useState('');
  const [phone, onChangephone] = useState('');
  const [password, onChangepassword] = useState('');
  const [isSelected, setSelected] = useState(false);
  const [isSecure, setIsSecure] = useState(true);
  const [iconPasswordName, setIconPasswordName] = useState('eye-with-line');
  const [error, setError] = useState([]);
  // Hnadle Errors
  const [propertyNameErrors, setPropertyNameErrors] = useState('');
  const [firstNameErrors, setFirstNameErrors] = useState('');
  const [lastNameErrors, setLastNameErrors] = useState('');
  const [emailErrors, setEmailErrors] = useState('');
  const [phoneErrors, setPhoneErrors] = useState('');
  const [passwordErrors, setPasswordErrors] = useState('');
  const [termsErrors, setTermsErrors] = useState('');

  useEffect(() => {
    if (propertySignUpSuccess) {
      ResetForm();
      dispatch(resetAllAuthForms());
      navigation.navigate('PropertyHome');
    }
  }, [propertySignUpSuccess]);

  useEffect(() => {
    if (Array.isArray(errors) && errors.length > 0) {
      setError(errors);
    }
  }, [propertySignUpSuccess]);

  const ResetForm = () => {
    onChangefirstName('');
    onChangelastName('');
    onChangeAddress('');
    onChangeEmail('');
    onChangephone('');
    onChangepassword('');
    setIsSecure(true);
    setIconPasswordName('eye');
    setSelected(false);
    setError([]);
  };

  const handlePasswordSecure = () => {
    setIsSecure(!isSecure);
    if (isSecure) {
      setIconPasswordName('eye-with-line');
    } else {
      setIconPasswordName('eye');
    }
  };
  const isThisNumber = () => {
    let i = 0;
    let ch = '0123456789()+ ';
    while (ch.includes(phone[i])) {
      i++;
    }
    if (i > phone.length) {
      return true;
    } else {
      return false;
    }
  };

  const handleRegister = async e => {
    const contact = [];
    console.log('From Registration ===>', {
      propertyName,
      firstName,
      lastName,
      address,
      contact,
      email,
      phone,
      password,
      isSelected,
    });
    var checking_form = 'true';
    if (propertyName.length === 0) {
      setPropertyNameErrors('* Property Name Field Required');
      checking_form = 'false';
    } else {
      setPropertyNameErrors('');
    }
    if (firstName.length === 0) {
      setFirstNameErrors('* First Name Field Required');
      checking_form = 'false';
    } else {
      setFirstNameErrors('');
    }
    if (lastName.length === 0) {
      setLastNameErrors('* Last Name Field Required');
      checking_form = 'false';
    } else {
      setLastNameErrors('');
    }
    if (email.length === 0 || email.indexOf('@') === -1) {
      setEmailErrors('* Email Field Required');
      checking_form = 'false';
    } else {
      setEmailErrors('');
    }
    if (phone.length === 0 || isThisNumber(phone)) {
      setPhoneErrors('* phone Field Required');
      checking_form = 'false';
    } else {
      setPhoneErrors('');
    }
    if (password.length < 6) {
      setPasswordErrors('* Password Field Required, 6 caracter min');
      checking_form = 'false';
    } else {
      setPasswordErrors('');
    }
    if (isSelected !== true) {
      setTermsErrors('* Agree to the Terms and Conditions is required');
      checking_form = 'false';
    } else {
      setTermsErrors('');
    }
    if (checking_form === 'true') {
      dispatch(
        signUpProperty({
          propertyName,
          firstName,
          lastName,
          address,
          email,
          phone,
          password,
          isSelected,
        }),
      );
    }
  };
  const handleSignIn = () => {
    navigation.navigate('PropertyLogin');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <IconFeather
            name="arrow-left"
            size={25}
            color="white"
            style={styles.icon_style}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.headerTitle}>
          <Text style={styles.headerText1}>Register</Text>
          <Text style={styles.headerText}>Create Account</Text>
        </View>
        <View style={styles.content}>
          {/* First Name */}
          <View style={styles.inputField}>
            {/* {errors.length > 0 && (
              <View style={styles.errors}>
                {error.map((err, index) => (
                  <Text style={styles.error} key={index}>
                    {err}
                  </Text>
                ))}
              </View>
            )} */}

            <Text style={styles.label}>Property Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangePropertyName}
              value={propertyName}
              placeholder="Property Name"
              placeholderTextColor={'grey'}
            />
            <Text style={styles.fieldErrors}>{propertyNameErrors}</Text>
            <Text style={styles.label}>Fisrt Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangefirstName}
              value={firstName}
              placeholder="First Name"
              placeholderTextColor={'grey'}
            />
            <Text style={styles.fieldErrors}>{firstNameErrors}</Text>
          </View>
          {/* Last Name */}
          <View style={styles.inputField}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangelastName}
              value={lastName}
              placeholder="Last Name"
              placeholderTextColor={'grey'}
            />
            <Text style={styles.fieldErrors}>{lastNameErrors}</Text>
          </View>
          {/*  Addresse */}
          <View style={styles.inputField}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeAddress}
              value={address}
              placeholder="Address"
              placeholderTextColor={'grey'}
            />
            <Text style={styles.fieldErrors}></Text>
          </View>
          {/* Email Adress */}
          <View style={styles.inputField}>
            <Text style={styles.label}>Email Adress</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeEmail}
              value={email}
              textContentType="emailAddress"
              placeholder="Email"
              placeholderTextColor={'grey'}
            />
            <Text style={styles.fieldErrors}>{emailErrors}</Text>
          </View>
          {/* Phone Number */}
          <View style={styles.inputField}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangephone}
              value={phone}
              placeholder="+1 23456789"
              placeholderTextColor={'grey'}
            />
            <Text style={styles.fieldErrors}>{phoneErrors}</Text>
          </View>
          {/* Password */}
          <View style={styles.inputField}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordField}>
              <TextInput
                style={styles.input}
                onChangeText={onChangepassword}
                value={password}
                secureTextEntry={isSecure}
                placeholder="Password"
                placeholderTextColor={'grey'}
              />
              <IconEntypo
                style={styles.eyeIcon}
                name={iconPasswordName}
                fontSize={25}
                color={COLORS.main}
                onPress={handlePasswordSecure}
              />
            </View>
            <Text style={styles.fieldErrors}>{passwordErrors}</Text>
          </View>
          {/* Terms and Condition */}
          <View style={styles.terms}>
            <CheckBox
              value={isSelected}
              onValueChange={setSelected}
              style={styles.checkbox}
            />
            <Text style={styles.privacy}>
              I agree with the privacy policies.
            </Text>
          </View>
          <Text style={styles.fieldErrors}>{termsErrors}</Text>
          <TouchableOpacity style={styles.button1} onPress={handleRegister}>
            <Text style={styles.signup}>Submit</Text>
          </TouchableOpacity>
          <Text style={styles.fieldErrors2}>{errors}</Text>
          {/* <Text style={styles.fieldErrors2}>{errors}</Text> */}
          <TouchableOpacity style={styles.already} onPress={handleSignIn}>
            <Text style={styles.label1}>Already have an Account? </Text>
            <Text style={styles.label2}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <ImageBackground
        style={[styles.fixed, styles.bgcontainter, {zIndex: -1}]}
        source={images.bgRegister}
      />
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    // color: COLORS.main,
    backgroundColor: COLORS.blue2Color,
  },
  bgContainter: {
    width: Dimensions.get('window').width, //for full screen
    height: Dimensions.get('window').height, //for full screen
  },
  fixed: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
  },
  fieldErrors2: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 10,
  },
  headerText1: {
    color: 'white',
    textAlign: 'center',
    fontSize: 28,
    textTransform: 'uppercase',
    marginBottom: 5,
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
    color: 'white',
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
    fontSize: 12,
    color: 'white',
    marginBottom: 10,
  },
  label2: {
    textAlign: 'left',
    fontSize: 12,
    color: COLORS.lightGray,
    textDecorationStyle: 'solid',
    textDecorationColor: 'white',
    marginBottom: 10,
  },
  fieldErrors: {
    color: 'red',
    fontSize: 14,
  },
  input: {
    borderRadius: 10,
    fontSize: 14,
    color: COLORS.greyColor,
    backgroundColor: 'white',
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
    backgroundColor: COLORS.blueBtn,
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
    marginBottom: 50,
  },
});
