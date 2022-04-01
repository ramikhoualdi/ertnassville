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
  fetchUtility,
  fetchProperty,
  ResetAddUtilityForm,
  ResetDeleteUtilityForm,
  ResetDoneUtilityForm,
} from '../../../redux/Property/property.actions';
import Utility from './Utility';

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
    text: 'Add Utility',
    icon: <AntDesign name="plus" size={20} color="white" />,
    name: 'AddUtility',
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
  fetchUtilityD: property.fetchUtilityD,
  fetchPropertyD: property.fetchPropertyD,
  addUtilitySuccess: property.addUtilitySuccess,
  deleteUtilitySuccess: property.deleteUtilitySuccess,
  doneUtilitySuccess: property.doneUtilitySuccess,
  errors: property.errors,
});

const Utilities = ({navigation}) => {
  console.log('Matterports Screen !!');

  const {
    fetchPropertyD,
    fetchUtilityD,
    addUtilitySuccess,
    deleteUtilitySuccess,
    doneUtilitySuccess,
    errors,
  } = useSelector(mapState);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('errors from Matterports => ', errors);
    if (addUtilitySuccess) {
      dispatch(ResetAddUtilityForm());
    }
  }, [addUtilitySuccess, errors]);

  useEffect(() => {
    dispatch(fetchProperty());
    dispatch(fetchUtility());
  }, []);
  useEffect(() => {
    console.log('deleteUtilitySuccess ', deleteUtilitySuccess);
    console.log('doneUtilitySuccess ', doneUtilitySuccess);
    if (deleteUtilitySuccess) {
      dispatch(ResetDeleteUtilityForm());
      navigation.navigate('PropertyHome');
    }
    if (doneUtilitySuccess) {
      dispatch(ResetDoneUtilityForm());
      navigation.navigate('PropertyHome');
    }
  }, [deleteUtilitySuccess, doneUtilitySuccess]);

  console.log('here ..................', fetchUtilityD);
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
          <Text style={styles.headerTitle}>Utilities</Text>
          {fetchUtilityD ? (
            fetchUtilityD.map((m, index) => (
              <Utility
                key={index}
                nb={m.nb}
                emergency={m.emergency}
                title={m.title}
                phone={m.phone}
                done={m.done}
                createdAt={m.createdAt}
                updatedAt={m.updatedAt}
                deletedAt={m.deletedAt}
              />
            ))
          ) : !fetchUtilityD ? (
            <Text style={styles.loading}>Utilities Not Availble Yet.</Text>
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

export default Utilities;

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
