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
import {useSelector, useDispatch} from 'react-redux';
import {fetchElevator, fetchProperty} from '../../redux/User/user.actions';
import Elevator from '../Services/Elevator/Elevator';

const mapState = ({user}) => ({
  fetchElevatorD: user.fetchElevatorD,
  fetchPropertyD: user.fetchPropertyD,
});

const ElevatorsUser = ({route, navigation}) => {
  console.log('Elevators Screen !!');
  const propertyId = route.params.propertyId;
  const {fetchPropertyD, fetchElevatorD} = useSelector(mapState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProperty(propertyId));
    dispatch(fetchElevator(propertyId));
  }, []);

  console.log('Here ..............', fetchElevatorD);
  console.log('here ..................', fetchPropertyD);

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
          <Text style={styles.headerTitle}>Evacuation plan</Text>
          {fetchElevatorD && fetchElevatorD ? (
            fetchElevatorD.map((m, index) => (
              <Elevator
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
          ) : !fetchElevatorD ? (
            <Text style={styles.loading}>Evacuation plan Not Availble Yet.</Text>
          ) : (
            <Text style={styles.loading}>loading ...</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default ElevatorsUser;

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
