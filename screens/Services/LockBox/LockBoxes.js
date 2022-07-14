import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../../constants';
import {auth} from '../../../firebase/utils';
import {FloatingAction} from 'react-native-floating-action';
import {useSelector, useDispatch} from 'react-redux';
import {
  fetchLockbox,
  fetchProperty,
  ResetAddLockboxForm,
  ResetDeleteLockboxForm,
  ResetDoneLockboxForm,
} from '../../../redux/Property/property.actions';
import LockBox from './LockBox';

const actions = [
  {
    text: 'Home',
    icon: <AntDesign name="home" size={20} color="white" />,
    name: 'PropertyHome',
    position: 1,
    textBackground: 'transparent',
    textElevation: 0,
    textColor: 'white',
    buttonSize: 40,
    margin: 8,
    textStyle: {
      fontSize: 16,
    },
    color: COLORS.blueBtn,
  },
  {
    text: 'Add LockBox',
    icon: <AntDesign name="plus" size={20} color="white" />,
    name: 'AddLockBox',
    position: 2,
    textBackground: 'transparent',
    textElevation: 0,
    textColor: 'white',
    buttonSize: 40,
    margin: 8,
    textStyle: {
      fontSize: 16,
    },
    color: COLORS.blueBtn,
  },
];

const mapState = ({property}) => ({
  fetchLockboxD: property.fetchLockboxD,
  fetchPropertyD: property.fetchPropertyD,
  addLockboxSuccess: property.addLockboxSuccess,
  deleteLockBoxSuccess: property.deleteLockBoxSuccess,
  doneLockBoxSuccess: property.doneLockBoxSuccess,
  errors: property.errors,
});

const LockBoxes = ({navigation}) => {
  console.log('LockBoxes Screen !!');

  const {
    fetchPropertyD,
    fetchLockboxD,
    addLockboxSuccess,
    deleteLockBoxSuccess,
    doneLockBoxSuccess,
    errors,
  } = useSelector(mapState);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('errors from LockBoxes => ', errors);
    if (addLockboxSuccess) {
      dispatch(ResetAddLockboxForm());
    }
  }, [addLockboxSuccess, errors]);

  useEffect(() => {
    dispatch(fetchProperty());
    dispatch(fetchLockbox());
  }, []);
  useEffect(() => {
    console.log('deleteLockBoxSuccess ', deleteLockBoxSuccess);
    console.log('doneLockBoxSuccess ', doneLockBoxSuccess);
    if (deleteLockBoxSuccess) {
      dispatch(ResetDeleteLockboxForm());
      navigation.navigate('PropertyHome');
    }
    if (doneLockBoxSuccess) {
      dispatch(ResetDoneLockboxForm());
      navigation.navigate('PropertyHome');
    }
  }, [deleteLockBoxSuccess, doneLockBoxSuccess]);

  console.log('here ..................', fetchLockboxD);

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        {/* Blue Header */}
        <View style={styles.header}>
          <View style={styles.headerSub}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IconFeather
                name="arrow-left"
                size={20}
                color="white"
                style={[styles.icon_style, styles.icon_style2]}
              />
            </TouchableOpacity>
            {fetchPropertyD.RandomPropertyID1 ? (
              <Text style={styles.headerID}>
                ID: {fetchPropertyD.RandomPropertyID1}
              </Text>
            ) : (
              <Text style={styles.headerID}>Loading ...</Text>
            )}
          </View>
        </View>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.headerTitle}>LockBoxes</Text>
          {fetchLockboxD ? (
            fetchLockboxD.map((m, index) => (
              <LockBox
              key={index}
              nb={m.nb}
              ownerName={m.ownerName}
              ownerContactNumber={m.ownerContactNumber}
              tenantName={m.tenantName}
              tenantContactNumber={m.tenantContactNumber}
              lockboxCode={m.lockboxCode}
              pets={m.pets}
              masterKeyCode={m.masterKeyCode}
              done={m.done}
              createdAt={m.createdAt}
              updatedAt={m.updatedAt}
              deletedAt={m.deletedAt}
              />
            ))
          ) : !fetchLockboxD ? (
            <Text style={styles.loading}>LockBoxes Not Availble Yet.</Text>
          ) : (
            <Text style={styles.loading}>loading ...</Text>
          )}
        </ScrollView>
      </View>
      {auth().currentUser && (
        <FloatingAction
          actions={actions}
          color={COLORS.blueBtn}
          onPressItem={name => {
            console.log(`selected button: ${name}`);
            navigation.navigate(`${name}`);
          }}
        />
      )}
    </View>
  );
};

export default LockBoxes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  subContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  scrollView: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.blueBtn,
    height: 60,
    paddingHorizontal: 20,
  },
  headerSub: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon_style: {
    marginRight: 10,
    marginRight: 100,
  },
  headerTitle: {
    paddingTop: 20,
    paddingVertical: 5,
    fontSize: 24,
    fontWeight: '700',
    color: 'black',
    backgroundColor: 'white',
    paddingLeft: 30,
  },
  headerID: {
    color: 'white',
    fontSize: 16,
  },
  loading: {
    textAlign: 'center',
    fontSize: 14,
    color: 'black',
  },
});
