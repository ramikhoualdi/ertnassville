import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
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
  fetchPhoto,
  fetchProperty,
  ResetAddPhotoForm,
  ResetDeletePhotoForm,
} from '../../../redux/Property/property.actions';
import Photo from './Photo';

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
    text: 'Add Photo',
    icon: <AntDesign name="plus" size={20} color="white" />,
    name: 'AddPhoto',
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
  fetchPhotoD: property.fetchPhotoD,
  fetchPropertyD: property.fetchPropertyD,
  addPhotoSuccess: property.addPhotoSuccess,
  deletePhotoSuccess: property.deletePhotoSuccess,
  errors: property.errors,
});

const Photos = ({navigation}) => {
  console.log('UserHome Screen !!');
  var images = [];
  const {
    fetchPhotoD,
    fetchPropertyD,
    addPhotoSuccess,
    deletePhotoSuccess,
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
    console.log('errors from Gallery => ', errors);
    if (addPhotoSuccess) {
      dispatch(ResetAddPhotoForm());
    }
    getPhotos(fetchPhotoD);
  }, [fetchPhotoD, addPhotoSuccess, errors]);

  useEffect(() => {
    dispatch(fetchProperty());
    dispatch(fetchPhoto());
  }, []);

  useEffect(() => {
    console.log('deletePhotoSuccess ', deletePhotoSuccess);
    if (deletePhotoSuccess) {
      dispatch(ResetDeletePhotoForm());
      navigation.navigate('PropertyHome');
    }
  }, [deletePhotoSuccess]);

  console.log('Here .........................', getPhotos(fetchPhotoD));

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
          <View></View>
          <View></View>
          <View></View>
        </View>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.headerTitle}>Gallery</Text>
          {fetchPhotoD ? (
            fetchPhotoD.map((m, index) => (
              <Photo
                key={index}
                nb={m.nb}
                photo={m.photo}
                name={m.name}
                createdAt={m.createdAt}
                updatedAt={m.updatedAt}
                deletedAt={m.deletedAt}
                images={getPhotos(fetchPhotoD)}
              />
            ))
          ) : !fetchPhotoD ? (
            <Text style={styles.loading}>Photos Not Availble Yet.</Text>
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

export default Photos;

const styles = StyleSheet.create({
  noContacts: {
    color: 'black',
    fontSize: 16,
    textAlign: 'left',
  },
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  scrollView: {
    paddingBottom: 30,
    backgroundColor: '#fff',
  },
  documents: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    width: 400,
    height: 1000,
    backgroundColor: 'red',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    fontSize: 24,
    fontWeight: '700',
    color: 'black',
    backgroundColor: 'white',
    paddingLeft: 30,
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
    color: 'white',
    fontSize: 16,
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
