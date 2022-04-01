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
import {COLORS} from '../../constants';
import {auth} from '../../firebase/utils';
import {FloatingAction} from 'react-native-floating-action';
import {useSelector, useDispatch} from 'react-redux';
import {
  fetchSupport,
  fetchProperty,
  ResetAddSupportForm,
  ResetDeleteSupportForm,
} from '../../redux/Property/property.actions';
import Sup from './Sup';

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
    text: 'Add Support',
    icon: <AntDesign name="plus" size={20} color="white" />,
    name: 'AddSupport',
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
  fetchSupportD: property.fetchSupportD,
  fetchPropertyD: property.fetchPropertyD,
  addSupportSuccess: property.addSupportSuccess,
  deleteSupportSuccess: property.deleteSupportSuccess,
  errors: property.errors,
});

const Support = ({navigation}) => {
  console.log('Access Screen !!');

  const {
    fetchPropertyD,
    fetchSupportD,
    addSupportSuccess,
    deleteSupportSuccess,
    errors,
  } = useSelector(mapState);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('errors from Supports => ', errors);
    if (addSupportSuccess) {
      dispatch(ResetAddSupportForm());
    }
  }, [addSupportSuccess, errors]);

  useEffect(() => {
    dispatch(fetchProperty());
    dispatch(fetchSupport());
  }, []);
  useEffect(() => {
    console.log('deleteSupportSuccess ', deleteSupportSuccess);
    if (deleteSupportSuccess) {
      dispatch(ResetDeleteSupportForm());
      navigation.navigate('PropertyHome');
    }
  }, [deleteSupportSuccess]);
  console.log('here ..................', fetchSupportD);
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
          <Text style={styles.headerTitle}>Supports</Text>
          {fetchSupportD ? (
            fetchSupportD.map((m, index) => (
              <Sup
                key={index}
                nb={m.nb}
                title={m.title}
                description={m.description}
                createdAt={m.createdAt}
                updatedAt={m.updatedAt}
                deletedAt={m.deletedAt}
              />
            ))
          ) : !fetchSupportD ? (
            <Text style={styles.loading}>Support Not Availble Yet.</Text>
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

export default Support;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  subContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
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
