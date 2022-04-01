import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../../constants';
import Contact from './Contact';
import {useSelector, useDispatch} from 'react-redux';
import {
  fetchContact,
  fetchProperty,
  ResetAddContactForm,
  ResetDeleteContactForm,
} from '../../../redux/Property/property.actions';
import {FloatingAction} from 'react-native-floating-action';
import {auth} from '../../../firebase/utils';

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
    text: 'Add Contact',
    icon: <AntDesign name="plus" size={20} color="white" />,
    name: 'AddContact',
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
  fetchContactD: property.fetchContactD,
  fetchPropertyD: property.fetchPropertyD,
  addContactSuccess: property.addContactSuccess,
  deleteContactSuccess: property.deleteContactSuccess,
  errors: property.errors,
});

const Contacts = ({navigation}) => {
  console.log('Contacts Screen !!');

  const {
    fetchPropertyD,
    fetchContactD,
    addContactSuccess,
    deleteContactSuccess,
    errors,
  } = useSelector(mapState);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('errors from Contcts => ', errors);
    if (addContactSuccess) {
      dispatch(ResetAddContactForm());
    }
  }, [addContactSuccess, errors]);

  useEffect(() => {
    dispatch(fetchProperty());
    dispatch(fetchContact());
  }, []);
  useEffect(() => {
    console.log('deleteContactSuccess ', deleteContactSuccess);
    if (deleteContactSuccess) {
      dispatch(ResetDeleteContactForm());
      navigation.navigate('PropertyHome');
    }
  }, [deleteContactSuccess]);
  console.log('here ..................', fetchContactD);

  // const handleCall = number => {
  //   const strNumber = toString(number);
  //   RNImmediatePhoneCall.immediatePhoneCall(strNumber);
  // };
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
                style={styles.icon_style}
              />
            </TouchableOpacity>
            {fetchPropertyD && fetchPropertyD.RandomPropertyID1 ? (
              <Text style={styles.headerID}>
                ID: {fetchPropertyD.RandomPropertyID1}
              </Text>
            ) : (
              <Text style={styles.headerID}>Loading ...</Text>
            )}
          </View>
        </View>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.headerTitle}>Contacts</Text>
          {fetchContactD && fetchContactD ? (
            fetchContactD.map((m, index) => (
              // <TouchableOpacity
              //   key={index}
              //   onPress={() => handleCall(m.number)}>
              <Contact
                key={index}
                nb={m.nb}
                name={m.name}
                number={m.number}
                image={m.photo}
                createdAt={m.createdAt}
                updatedAt={m.updatedAt}
                deletedAt={m.deletedAt}
              />
              // </TouchableOpacity>
            ))
          ) : !fetchContactD ? (
            <Text style={styles.loading}>Contacts Not Availble Yet.</Text>
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

export default Contacts;

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
