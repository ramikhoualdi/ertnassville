import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import {COLORS} from '../../constants';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import {useSelector, useDispatch} from 'react-redux';
import {fetchContact, fetchProperty} from '../../redux/User/user.actions';
import Contact from '../Services/Contact/Contact';

const mapState = ({user}) => ({
  fetchContactD: user.fetchContactD,
  fetchPropertyD: user.fetchPropertyD,
});

const ContactsUser = ({route, navigation}) => {
  console.log('Contacts Screen !!');
  const propertyId = route.params.propertyId;
  const {fetchPropertyD, fetchContactD} = useSelector(mapState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProperty(propertyId));
    dispatch(fetchContact(propertyId));
  }, []);
  console.log('here ..................', fetchContactD);
  console.log('here ..................', fetchPropertyD);

  const handleCall = number => {
    const strNumber = toString(number);
    RNImmediatePhoneCall.immediatePhoneCall(strNumber);
  };
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        {/* Blue Header */}
        <View style={styles.header}>
          <View style={styles.headerSub}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IconFeather
                name="arrow-left"
                size={25}
                color={COLORS.greyColor}
                style={styles.icon_style}
              />
            </TouchableOpacity>
            <Text style={styles.headerID}>{propertyId}</Text>
          </View>
        </View>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.headerTitle}>Contacts</Text>
          {fetchContactD && fetchContactD ? (
            fetchContactD.map((m, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleCall(m.number)}>
                <Contact
                  nb={m.nb}
                  name={m.name}
                  number={m.number}
                  image={m.photo}
                  createdAt={m.createdAt}
                  updatedAt={m.updatedAt}
                  deletedAt={m.deletedAt}
                />
              </TouchableOpacity>
            ))
          ) : !fetchContactD ? (
            <Text style={styles.loading}>Contacts Not Availble Yet.</Text>
          ) : (
            <Text style={styles.loading}>loading ...</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default ContactsUser;

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
    backgroundColor: 'white',
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
    fontSize: 26,
    fontWeight: '700',
    color: 'black',
    backgroundColor: 'white',
    paddingLeft: 20,
  },
  headerID: {
    color: 'black',
    fontSize: 18,
    fontWeight: '800',
  },
  loading: {
    textAlign: 'center',
    fontSize: 14,
    color: 'black',
  },
});
