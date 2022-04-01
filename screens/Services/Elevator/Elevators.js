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
  fetchElevator,
  fetchProperty,
  ResetAddElevatorForm,
  ResetDeleteElevatorForm,
  ResetDoneElevatorForm,
} from '../../../redux/Property/property.actions';
import Elevator from './Elevator';

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
    text: 'Add Evacuation plan',
    icon: <AntDesign name="plus" size={20} color="white" />,
    name: 'AddElevator',
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
  fetchElevatorD: property.fetchElevatorD,
  fetchPropertyD: property.fetchPropertyD,
  addElevatorSuccess: property.addElevatorSuccess,
  deleteElevatorSuccess: property.deleteElevatorSuccess,
  doneElevatorSuccess: property.doneElevatorSuccess,
  errors: property.errors,
});

const Elevators = ({navigation}) => {
  console.log('Elevators Screen !!');

  const {
    fetchPropertyD,
    fetchElevatorD,
    addElevatorSuccess,
    deleteElevatorSuccess,
    doneElevatorSuccess,
    errors,
  } = useSelector(mapState);
  const dispatch = useDispatch();
  const getPhotos = images => {
    console.log('images from getPhotos =>', images);
    if (!images) return null;
    if (images.length == 0) return null;
    let imagesArray = [];
    for (let i = 0; i < images.length; i++) {
      imagesArray.push({uri: images[i].photo});
    }
    return imagesArray;
  };
  useEffect(() => {
    console.log('errors from Elevators => ', errors);
    if (addElevatorSuccess) {
      dispatch(ResetAddElevatorForm());
    }
    getPhotos(fetchElevatorD);
  }, [fetchElevatorD, addElevatorSuccess, errors]);

  useEffect(() => {
    dispatch(fetchProperty());
    dispatch(fetchElevator());
  }, []);
  useEffect(() => {
    console.log('deleteElevatorSuccess ', deleteElevatorSuccess);
    console.log('doneElevatorSuccess ', doneElevatorSuccess);
    if (deleteElevatorSuccess) {
      dispatch(ResetDeleteElevatorForm());
      navigation.navigate('PropertyHome');
    }
    if (doneElevatorSuccess) {
      dispatch(ResetDoneElevatorForm());
      navigation.navigate('PropertyHome');
    }
  }, [deleteElevatorSuccess, doneElevatorSuccess]);

  console.log('Here ..............', fetchElevatorD);

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
                {fetchPropertyD.RandomPropertyID1}
              </Text>
            ) : (
              <Text style={styles.headerID}>Loading ...</Text>
            )}
          </View>
        </View>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.headerTitle}>Evacuation plan</Text>
          {fetchElevatorD ? (
            fetchElevatorD.map((m, index) => (
              <Elevator
                key={index}
                nb={m.nb}
                photo={m.photo}
                title={m.title}
                phone={m.phone}
                done={m.done}
                createdAt={m.createdAt}
                updatedAt={m.updatedAt}
                deletedAt={m.deletedAt}
                images={getPhotos(fetchElevatorD)}
              />
            ))
          ) : !fetchElevatorD ? (
            <Text style={styles.loading}>Evacuation plan Not Availble Yet.</Text>
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

export default Elevators;

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
