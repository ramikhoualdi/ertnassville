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
  saveLockbox,
  ResetAddLockboxForm,
  resetFetchLockbox,
  ResetDeleteLockboxForm,
} from '../../../redux/Property/property.actions';

const mapState = ({property}) => ({
  addLockboxSuccess: property.addLockboxSuccess,
  errors: property.errors,
});

const AddLockBox = ({navigation}) => {
  console.log('AddLockbox screen !');
  const dispatch = useDispatch();
  const {addLockboxSuccess, errors} = useSelector(mapState);
  console.log(
    'addLockboxSuccess =>     ',
    addLockboxSuccess,
    'errors =>  ',
    errors,
  );

  // Storing data
  // OwnerName
  const [ownerName, onChangeOwnerName] = useState('');
  const [ownerNameErrors, onChangeOwnerNameError] = useState('');
  // OwnerContactNumber
  const [ownerContactNumber, onChangeOwnerContactNumber] = useState('');
  const [ownerContactNumberErrors, onChangeOwnerContactNumberError] = useState('');
  // TenantName
  const [tenantName, onChangeTenantName] = useState('');
  const [tenantNameErrors, onChangeTenantNameError] = useState('');
  // TenantContactNumber
  const [tenantContactNumber, onChangeTenantContactNumber] = useState('');
  const [tenantContactNumberErrors, onChangeTenantContactNumberError] = useState('');
  // LockboxCode
  const [lockboxCode, onChangeLockboxCode] = useState('');
  const [lockboxCodeErrors, onChangeLockboxCodeError] = useState('');
  // Pets
  const [pets, onChangePets] = useState('');
  const [petsErrors, onChangePetsError] = useState('');
  // MasterKeyCode
  const [masterKeyCode, onChangeMasterKeyCode] = useState('');
  const [masterKeyCodeErrors, onChangeMasterKeyCodeError] = useState('');

  useEffect(() => {
    console.log('UseEffect');
    if (addLockboxSuccess) {
      console.log('Inside Line 52');
      dispatch(ResetDeleteLockboxForm());
      dispatch(ResetAddLockboxForm());
      dispatch(resetFetchLockbox());
      navigation.navigate('PropertyHome');
    }
  }, [addLockboxSuccess]);

  const handleRegister = () => {
    console.log('handleRegister Clicked !!');
    let checked = 'true';
    if (ownerName.length == 0) {
      checked = 'false';
      onChangeOwnerNameError('* Owner Name Required!');
    }
    if (ownerContactNumber.length == 0) {
      checked = 'false';
      onChangeOwnerContactNumberError('* Owner Contact Number Required!');
    }
    if (tenantName.length == 0) {
      checked = 'false';
      onChangeTenantNameError('* Tenant Name Required!');
    }
    if (tenantContactNumber.length == 0) {
      checked = 'false';
      onChangeTenantContactNumberError('* Tenant Contact Number Required!');
    }
    if (lockboxCode.length == 0) {
      checked = 'false';
      onChangeLockboxCodeError('* Lockbox Code Required!');
    }
    if (pets.length == 0) {
      checked = 'false';
      onChangePetsError('* Pets Required!');
    }
    if (masterKeyCode.length == 0) {
      checked = 'false';
      onChangeMasterKeyCodeError('* Master Key Code Required!');
    }

    if (checked == 'true') {
      console.log('Inputs Valid !!!!');
      console.log({ownerName, ownerContactNumber, tenantName, tenantContactNumber, lockboxCode, pets, masterKeyCode});
      dispatch(saveLockbox(ownerName, ownerContactNumber, tenantName, tenantContactNumber, lockboxCode, pets, masterKeyCode));
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
          <Text style={styles.headerText1}>Add lockBox</Text>
        </View>
        <View style={styles.content}>
          {/* Owner Name*/}
          <View style={styles.inputField}>
            <Text style={styles.label}>Owner Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeOwnerName}
              value={ownerName}
              placeholder="Owner Name"
              maxLength={50}
              placeholderTextColor={'grey'}
            />
            <Text style={styles.fieldErrors}>{ownerNameErrors}</Text>
          </View>
          {/* Owner Contact Number*/}
          <View style={styles.inputField}>
            <Text style={styles.label}>Owner Contact Number</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeOwnerContactNumber}
              value={ownerContactNumber}
              placeholder="Owner Contact Number"
              maxLength={50}
              placeholderTextColor={'grey'}
              keyboardType={"phone-pad"}
            />
            <Text style={styles.fieldErrors}>{ownerContactNumberErrors}</Text>
          </View>
          {/* Tenant Name */}
          <View style={styles.inputField}>
            <Text style={styles.label}>Tenant Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeTenantName}
              value={tenantName}
              placeholder="Tenant Name"
              maxLength={50}
              placeholderTextColor={'grey'}
            />
            <Text style={styles.fieldErrors}>{tenantNameErrors}</Text>
          </View>
          {/* Tenant Contact Number */}
          <View style={styles.inputField}>
            <Text style={styles.label}>Tenant Contact Number</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeTenantContactNumber}
              value={tenantContactNumber}
              placeholder="Tenant Contact Number"
              maxLength={50}
              placeholderTextColor={'grey'}
              keyboardType={"phone-pad"}
            />
            <Text style={styles.fieldErrors}>{tenantContactNumberErrors}</Text>
          </View>
          {/* Lockbox Code*/}
          <View style={styles.inputField}>
            <Text style={styles.label}>Lockbox Code</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeLockboxCode}
              value={lockboxCode}
              placeholder="Lockbox Code"
              maxLength={50}
              placeholderTextColor={'grey'}
              keyboardType={"phone-pad"}
            />
            <Text style={styles.fieldErrors}>{lockboxCodeErrors}</Text>
          </View>
          {/* Pets*/}
          <View style={styles.inputField}>
            <Text style={styles.label}>Pets</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangePets}
              value={pets}
              placeholder="Pets"
              maxLength={50}
              placeholderTextColor={'grey'}
            />
            <Text style={styles.fieldErrors}>{petsErrors}</Text>
          </View>
          {/* Master Key code */}
          <View style={styles.inputField}>
            <Text style={styles.label}>Master Key code</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeMasterKeyCode}
              value={masterKeyCode}
              placeholder="Master Key code"
              maxLength={50}
              placeholderTextColor={'grey'}
              keyboardType={"phone-pad"}
            />
            <Text style={styles.fieldErrors}>{masterKeyCodeErrors}</Text>
          </View>
          <TouchableOpacity style={styles.button1} onPress={handleRegister}>
            <Text style={styles.signup}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddLockBox;

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
