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
import {auth} from '../../../firebase/utils';
import {FloatingAction} from 'react-native-floating-action';
import {useSelector, useDispatch} from 'react-redux';
import {
  fetchGenerator,
  fetchProperty,
  ResetAddGeneratorForm,
  ResetDeleteGeneratorForm,
  ResetDoneGeneratorForm,
} from '../../../redux/Property/property.actions';
import Generator from './Generator';

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
    text: 'Add Generator',
    icon: <AntDesign name="plus" size={20} color="white" />,
    name: 'AddGenerator',
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
  fetchGeneratorD: property.fetchGeneratorD,
  fetchPropertyD: property.fetchPropertyD,
  addGeneratorSuccess: property.addGeneratorSuccess,
  deleteGeneratorSuccess: property.deleteGeneratorSuccess,
  doneGeneratorSuccess: property.doneGeneratorSuccess,
  errors: property.errors,
});

const Generators = ({navigation}) => {
  console.log('Generators Screen !!');

  const {
    fetchPropertyD,
    fetchGeneratorD,
    addGeneratorSuccess,
    deleteGeneratorSuccess,
    doneGeneratorSuccess,
    errors,
  } = useSelector(mapState);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('errors from Generators => ', errors);
    if (addGeneratorSuccess) {
      dispatch(ResetAddGeneratorForm());
    }
  }, [addGeneratorSuccess, errors]);

  useEffect(() => {
    dispatch(fetchProperty());
    dispatch(fetchGenerator());
  }, []);
  useEffect(() => {
    console.log('deleteGeneratorSuccess ', deleteGeneratorSuccess);
    console.log('doneGeneratorSuccess ', doneGeneratorSuccess);
    if (deleteGeneratorSuccess) {
      dispatch(ResetDeleteGeneratorForm());
      navigation.navigate('PropertyHome');
    }
    if (doneGeneratorSuccess) {
      dispatch(ResetDoneGeneratorForm());
      navigation.navigate('PropertyHome');
    }
  }, [deleteGeneratorSuccess, doneGeneratorSuccess]);

  console.log('Here ..............', fetchGeneratorD);

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
            <Text style={styles.headerID}>ID: </Text>
            {fetchPropertyD.RandomPropertyID1 ? (
              <Text style={styles.headerID}>
                {fetchPropertyD.RandomPropertyID1}
              </Text>
            ) : (
              <Text style={styles.headerID}>Loading ...</Text>
            )}
          </View>
        </View>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.headerTitle}>Generators</Text>
          {fetchGeneratorD ? (
            fetchGeneratorD.map((m, index) => (
              <Generator
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
          ) : !fetchGeneratorD ? (
            <Text style={styles.loading}>Generators Not Availble Yet.</Text>
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

export default Generators;

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
