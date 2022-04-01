import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import {COLORS} from '../../constants';
import Description from '../Services/Description/Description';
import {useSelector, useDispatch} from 'react-redux';
import {fetchDescription, fetchProperty} from '../../redux/User/user.actions';

const mapState = ({user}) => ({
  fetchPropertyD: user.fetchPropertyD,
  fetchDescriptionD: user.fetchDescriptionD,
});

const DescriptionsUser = ({route, navigation}) => {
  console.log('Description Screen !!');
  const propertyId = route.params.propertyId;

  const {fetchPropertyD, fetchDescriptionD} = useSelector(mapState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDescription(propertyId));
    dispatch(fetchProperty(propertyId));
  }, []);

  console.log('here ..................', fetchDescriptionD);
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
                style={[styles.icon_style, styles.icon_style2]}
              />
            </TouchableOpacity>
            <Text style={styles.headerID}>{propertyId}</Text>
          </View>
        </View>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.headerTitle}>MSTS</Text>
          {fetchDescriptionD && fetchDescriptionD ? (
            fetchDescriptionD.map((m, index) => (
              <Description
                key={index}
                nb={m.nb}
                photo={m.photo}
                title={m.title}
                description={m.description}
                createdAt={m.createdAt}
                updatedAt={m.updatedAt}
                deletedAt={m.deletedAt}
              />
            ))
          ) : !fetchDescriptionD ? (
            <Text style={styles.loading}>Description Not Availble Yet.</Text>
          ) : (
            <Text style={styles.loading}>loading ...</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default DescriptionsUser;

const styles = StyleSheet.create({
  noContacts: {
    color: 'black',
    fontSize: 16,
    textAlign: 'left',
  },
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
  headerLeftText: {
    color: 'white',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  headerRightText: {
    color: 'white',
    fontSize: 14,
  },
  icon_style: {
    marginRight: 10,
  },
  imageContainer: {
    position: 'relative',
  },
  coverImage: {
    width: null,
    resizeMode: 'contain',
    height: Dimensions.get('window').width,
    marginTop: -150,
    zIndex: -1,
  },
  bgContainter: {
    width: Dimensions.get('window').width, //for full screen
  },
  propertyDetails: {
    position: 'absolute',
    bottom: 25,
    width: Dimensions.get('window').width,
    backgroundColor: 'rgba(0,0,0,0.6)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 0,
  },
  signup: {
    backgroundColor: COLORS.darkRedColor,
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    width: 130,
    marginBottom: -15,
  },
  button1: {
    marginBottom: 20,
  },
  midText: {
    fontSize: 20,
    color: 'white',
    marginBottom: 5,
  },
  bottomText: {
    fontSize: 16,
    color: 'grey',
    marginBottom: 5,
  },
  review: {
    flexDirection: 'row',
    marginTop: 5,
  },
  starReview: {
    marginRight: 3,
  },
  emergency: {
    marginTop: -25,
    paddingVertical: 20,
    paddingLeft: 50,
    backgroundColor: 'white',
    borderBottomWidth: 5,
    borderBottomColor: COLORS.darkRedColor,
  },
  emergencyText: {
    color: COLORS.darkRedColor,
    fontSize: 16,
    fontWeight: '600',
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
  selectedB: {
    marginTop: -40,
    backgroundColor: COLORS.blue2Color,
    borderRadius: 45,
    width: 80,
    height: 80,
    paddingLeft: 28,
    padding: 25,
  },
  headerID: {
    color: 'black',
    fontSize: 18,
    fontWeight: '800',
  },
  icon_style2: {
    marginRight: 100,
  },
  loading: {
    textAlign: 'center',
    fontSize: 14,
    color: 'black',
  },
});
