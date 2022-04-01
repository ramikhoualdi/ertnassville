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
import {COLORS} from '../../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {
  savePreExistingDamage,
  ResetAddPreExistingDamageForm,
  resetFetchPreExistingDamage,
  ResetDeletePreExistingDamageForm,
} from '../../../redux/Property/property.actions';

const mapState = ({property}) => ({
  addPreExistingDamageSuccess: property.addPreExistingDamageSuccess,
  errors: property.errors,
});

const AddPreExistingDamage = ({navigation}) => {
  console.log('Add AddPreExistingDamage Screen !');
  const dispatch = useDispatch();
  const {addPreExistingDamageSuccess, errors} = useSelector(mapState);
  console.log(
    'addPreExistingDamageSuccess =>',
    addPreExistingDamageSuccess,
    'errors =>',
    errors,
  );

  // Selected
  const [greenSlected, setGreenSlected] = useState(false);
  const [redSelected, setRedSelected] = useState(false);
  const [yellowSelected, setYellowSelected] = useState(false);

  // Storing data
  const [title, onChangeTitle] = useState('');
  const [phone, onChangePhone] = useState('');
  const [accessErrors, onChangeAccessError] = useState('');
  const [titleErrors, onChangeTitleError] = useState('');
  const [phoneErrors, onChangePhoneError] = useState('');

  useEffect(() => {
    console.log('UseEffect');
    if (addPreExistingDamageSuccess) {
      console.log('Inside Line 52');
      dispatch(ResetDeletePreExistingDamageForm());
      dispatch(ResetAddPreExistingDamageForm());
      dispatch(resetFetchPreExistingDamage());
      navigation.navigate('PropertyHome');
    }
  }, [addPreExistingDamageSuccess]);

  const handleRegister = () => {
    console.log('handleRegister Clicked !!');
    let checked = 'true';
    if (!greenSlected && !redSelected && !yellowSelected) {
      checked = 'false';
      onChangeAccessError('* Emergency Degree Required!');
    }
    if (title.length == 0) {
      checked = 'false';
      onChangeTitleError('* Title Required!');
    }
    if (phone.length == 0) {
      checked = 'false';
      onChangePhoneError('* Phone Required!');
    }

    if (checked == 'true') {
      console.log('Inputs Valid !!!!');
      let emergency = '';
      if (greenSlected) {
        emergency = '1';
      } else if (yellowSelected) {
        emergency = '2';
      } else {
        emergency = '3';
      }
      console.log({emergency, title, phone});
      dispatch(savePreExistingDamage(emergency, title, phone));
      console.log('data send to users actions Success !!');
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
          <Text style={styles.headerText1}>Add PreExisting Damage</Text>
        </View>
        <View style={styles.accessLights}>
          <TouchableOpacity
            onPress={() => {
              setRedSelected(false);
              setYellowSelected(false);
              setGreenSlected(!greenSlected);
            }}
            style={
              !greenSlected
                ? [styles.ED, {borderColor: '#238823'}]
                : [styles.ED_G, {borderColor: 'white'}]
            }>
            <View
              style={
                !greenSlected
                  ? [styles.accessLight, {backgroundColor: '#238823'}]
                  : [styles.accessLight, {backgroundColor: 'white'}]
              }></View>
            <Text
              style={
                !greenSlected
                  ? [styles.EDgree, {color: '#238823'}]
                  : [styles.EDgree, {color: 'white'}]
              }>
              Normal emergent
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setRedSelected(false);
              setYellowSelected(!yellowSelected);
              setGreenSlected(false);
            }}
            style={
              !yellowSelected
                ? [styles.ED, {borderColor: '#FFBF00'}]
                : [styles.ED_Y, {borderColor: 'white'}]
            }>
            <View
              style={
                !yellowSelected
                  ? [styles.accessLight, {backgroundColor: '#FFBF00'}]
                  : [styles.accessLight, {backgroundColor: 'white'}]
              }></View>
            <Text
              style={
                !yellowSelected
                  ? [styles.EDgree, {color: '#FFBF00'}]
                  : [styles.EDgree, {color: 'white'}]
              }>
              Just emergent
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setRedSelected(!redSelected);
              setYellowSelected(false);
              setGreenSlected(false);
            }}
            style={
              !redSelected
                ? [styles.ED, {borderColor: '#D2222D'}]
                : [styles.ED_R, {borderColor: 'white'}]
            }>
            <View
              style={
                !redSelected
                  ? [styles.accessLight, {backgroundColor: '#D2222D'}]
                  : [[styles.accessLight, {backgroundColor: 'white'}]]
              }></View>
            <Text
              style={
                !redSelected
                  ? [styles.EDgree, {color: '#D2222D'}]
                  : [styles.EDgree, {color: 'white'}]
              }>
              Super emergent
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={[styles.fieldErrors, {textAlign: 'center'}]}>
            {accessErrors}
          </Text>
        </View>
        <View style={styles.content}>
          {/* PreExisting Damage Details */}
          <View style={styles.inputField}>
            <Text style={styles.label}>PreExisting Damage Details</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeTitle}
              value={title}
              placeholder="PreExisting Damage Details"
              maxLength={50}
              placeholderTextColor={'grey'}
            />
            <Text style={styles.fieldErrors}>{titleErrors}</Text>
          </View>
          {/* Phone Number */}
          <View style={styles.inputField}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangePhone}
              value={phone}
              placeholder="Phone Number"
              maxLength={50}
              placeholderTextColor={'grey'}
            />
            <Text style={styles.fieldErrors}>{phoneErrors}</Text>
          </View>

          <TouchableOpacity style={styles.button1} onPress={handleRegister}>
            <Text style={styles.signup}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddPreExistingDamage;

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
  textType2: {
    color: 'black',
    fontSize: 14,
    marginVertical: 5,
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
    marginTop: 0,
  },
  emptyPhoto: {
    width: 300,
    height: 150,
    borderRadius: 25,
    zIndex: 100,
    transform: [{scale: 1.1}],
    marginBottom: 15,
    overflow: 'hidden',
  },
  circle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circlePhoto: {
    borderRadius: 25,
    width: 300,
    height: 150,
    // backgroundColor: COLORS.blue2Color,
    backgroundColor: 'transparent',
    borderColor: COLORS.darkgray,
    borderWidth: 0,
    overflow: 'hidden',
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
  descriptionStyle: {
    paddingRight: 20,
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
  accessLights: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  accessLight: {
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 50,
  },
  ED: {
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 50,
    padding: 15,
    maxWidth: 80,
  },
  ED_G: {
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 50,
    padding: 15,
    maxWidth: 80,
    backgroundColor: '#238823',
  },
  ED_Y: {
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 50,
    padding: 15,
    maxWidth: 80,
    backgroundColor: '#FFBF00',
  },
  ED_R: {
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 50,
    padding: 15,
    maxWidth: 80,
    backgroundColor: '#D2222D',
  },
  EDgree: {
    textAlign: 'center',
    maxWidth: 70,
    fontSize: 10,
  },
});
