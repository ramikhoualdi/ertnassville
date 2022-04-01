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
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../../constants';
import {useSelector, useDispatch} from 'react-redux';
import Document from './Document';
import {
  fetchDocument,
  fetchProperty,
  ResetAddDocumentForm,
  ResetDeleteDocumentForm,
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
    text: 'Add Document',
    icon: <AntDesign name="plus" size={20} color="white" />,
    name: 'AddDocument',
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
  currentProperty: property.currentProperty,
  fetchDocumentD: property.fetchDocumentD,
  fetchPropertyD: property.fetchPropertyD,
  addDocumentSuccess: property.addDocumentSuccess,
  deleteDocumentSuccess: property.deleteDocumentSuccess,
  errors: property.errors,
});

var count = 0;
const Documents = ({navigation}) => {
  console.log('UserHome Screen !!');
  const {
    currentProperty,
    fetchPropertyD,
    fetchDocumentD,
    addDocumentSuccess,
    deleteDocumentSuccess,
    errors,
  } = useSelector(mapState);
  const dispatch = useDispatch();
  useEffect(() => {
    if (addDocumentSuccess) {
      dispatch(ResetAddDocumentForm());
    }
    console.log('currentProperty from Property Home =>', currentProperty);
    console.log('fetchPropertyD from Property Home =>', fetchPropertyD);
    console.log('fetchDocumentD from Property Home =>', fetchDocumentD);
    console.log('errors from Property Home =>', errors);
    if (!currentProperty) {
      navigation.navigate('BeforeSplash');
    }
  }, [
    currentProperty,
    fetchPropertyD,
    fetchDocumentD,
    addDocumentSuccess,
    errors,
  ]);
  useEffect(() => {
    console.log('deleteAccessSuccess ', deleteDocumentSuccess);
    if (deleteDocumentSuccess) {
      dispatch(ResetDeleteDocumentForm());
      navigation.navigate('PropertyHome');
    }
  }, [deleteDocumentSuccess]);

  useEffect(() => {
    dispatch(fetchProperty());
    dispatch(fetchDocument());
  }, []);

  console.log('Here ..............', fetchDocumentD);

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
          <Text style={styles.headerTitle}>Emergency documents</Text>
          <View styles={styles.documents}>
            {fetchDocumentD ? (
              fetchDocumentD.map((d, index) => (
                <Document
                  key={index}
                  nb={d.nb}
                  docRef={d.docRef}
                  name={d.name}
                  type={d.type}
                  createdAt={d.createdAt}
                  updatedAt={d.updatedAt}
                  deletedAt={d.deletedAt}
                />
              ))
            ) : !fetchDocumentD ? (
              <Text style={styles.loading}>Emergency documents Not Availble Yet.</Text>
            ) : (
              <Text style={styles.loading}>loading ...</Text>
            )}
          </View>
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

export default Documents;

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
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
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
