import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert,
  Linking,
} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, icons, images} from '../constants';
import {
  signOutProperty,
  fetchProperty,
  ResetErrorsState,
  fetchContact,
} from '../redux/Property/property.actions';
import {useDispatch, useSelector} from 'react-redux';
import Contact2 from './Services/Contact/Contact2';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import InAppBrowser from 'react-native-inappbrowser-reborn';

const mapState = ({property}) => ({
  currentProperty: property.currentProperty,
  fetchPropertyD: property.fetchPropertyD,
  fetchContactD: property.fetchContactD,
  errors: property.errors,
});

const HomePage = ({navigation}) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [servicesVisible, setServicesVisible] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const [campaniesVisible, setcampaniesVisible] = useState(false);

  const {currentProperty, fetchPropertyD, fetchContactD, errors} =
    useSelector(mapState);
  const dispatch = useDispatch();
  // dispatch(ResetStates);
  // dispatch(ResetAddMatterportForm());
  dispatch(ResetErrorsState);

  useEffect(() => {
    dispatch(fetchContact());
    setDrawerVisible(false);
    setServicesVisible(false);
    setChatVisible(false);
    setcampaniesVisible(false);
  }, []);

  useEffect(() => {
    if (fetchPropertyD === null) {
      dispatch(fetchProperty());
    }
    console.log('currentProperty from Property Home =>', currentProperty);
    console.log('fetchPropertyD from Property Home =>', fetchPropertyD);
    console.log('errors from Property Home =>', errors);
    if (!currentProperty) {
      navigation.navigate('BeforeSplash');
    }
  }, [currentProperty, fetchPropertyD, errors]);

  const handleSignOut = () => {
    dispatch(signOutProperty());
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        {/* Red Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerSub}
            onPress={() => navigation.openDrawer()}>
            <IconFeather
              name="menu"
              size={20}
              color="black"
              style={styles.icon_style}
            />
          </TouchableOpacity>
          <View>
            {fetchPropertyD && fetchPropertyD.RandomPropertyID1 ? (
              <Text style={styles.IDproperty}>
                {fetchPropertyD.RandomPropertyID1}
              </Text>
            ) : (
              <Text style={styles.signup}>Loading ...</Text>
            )}
          </View>
          <TouchableOpacity style={styles.headerSub} onPress={handleSignOut}>
            <IconFeather
              name="log-out"
              size={20}
              color="black"
              style={styles.icon_style}
            />
          </TouchableOpacity>
        </View>
        {/* Start */}
        <ScrollView style={styles.scrollView}>
          {/* Second */}
          <View style={styles.imageContainer}>
            <Text style={styles.welcometTitle}>
              {fetchPropertyD && fetchPropertyD.propertyName}
            </Text>
          </View>
          {/* Third */}
          <View style={styles.quickContainer}>
            <Text style={styles.title1}>Hot service</Text>
            <View style={styles.hotspotsLine1}>
              <TouchableOpacity
                style={styles.hotspot2}
                onPress={() => navigation.navigate('AddContact')}>
                <View style={[styles.leftSide, styles.shadow]}>
                  <Image source={icons.home_call} style={styles.bigIcon} />
                  <Text style={styles.hotspot2Title1}>Add Contact</Text>
                  <Text style={styles.hotspot2Title2}>Create contact</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.hotspot2}
                onPress={() => navigation.navigate('AddDocument')}>
                <View style={styles.rightSide}>
                  <Image
                    source={icons.home_doc}
                    style={[styles.bigIcon, styles.shadow]}
                  />
                  <Text style={styles.hotspot2Title3}>Add Document</Text>
                  <Text style={styles.hotspot2Title4}>Upload documents</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* Fourth */}
          <View style={styles.quickContainer}>
            <Text style={styles.title1}>Recent hotspots</Text>
            <View style={styles.hotspotsLine1}>
              {/* #1 */}
              <TouchableOpacity
                style={styles.hotspot}
                onPress={() => navigation.navigate('_Contacts')}>
                <Image source={icons.i2} style={styles.hotspotIcon} />
                <View style={styles.hotspotTitleContainer}>
                  <Text style={styles.hotspotTitle1}>Contacts</Text>
                  <Text style={styles.hotspotTitle2}>Start Phone Calls</Text>
                </View>
              </TouchableOpacity>
              {/* #1 */}
              <TouchableOpacity
                style={styles.hotspot}
                onPress={() => navigation.navigate('_Description')}>
                <Image source={icons.i3} style={styles.hotspotIcon} />
                <View style={styles.hotspotTitleContainer}>
                  <Text style={styles.hotspotTitle1}>Descriptions</Text>
                  <Text style={styles.hotspotTitle2}>New content</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.hotspotsLine1}>
              {/* #1 */}
              <TouchableOpacity
                style={styles.hotspot}
                onPress={() => navigation.navigate('_Documents')}>
                <Image source={icons.i4} style={styles.hotspotIcon} />
                <View style={styles.hotspotTitleContainer}>
                  <Text style={styles.hotspotTitle1}>Documents</Text>
                  <Text style={styles.hotspotTitle2}>Latest uploads</Text>
                </View>
              </TouchableOpacity>
              {/* #1 */}
              <TouchableOpacity
                style={styles.hotspot}
                onPress={() => navigation.navigate('_Photos')}>
                <Image source={icons.i9} style={styles.hotspotIcon} />
                <View style={styles.hotspotTitleContainer}>
                  <Text style={styles.hotspotTitle1}>Gallery</Text>
                  <Text style={styles.hotspotTitle2}>Recent photos</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* Fifth */}
          <View style={styles.quickContainer}>
            <Text style={styles.title1}>Latest contact</Text>
            <View style={styles.hotspotsLine2}>
              {fetchContactD && fetchContactD ? (
                fetchContactD.map((m, index) => (
                  <Contact2
                    key={index}
                    nb={m.nb}
                    name={m.name}
                    number={m.number}
                    image={m.photo}
                    createdAt={m.createdAt}
                    updatedAt={m.updatedAt}
                    deletedAt={m.deletedAt}
                  />
                ))
              ) : !fetchContactD ? (
                <Text style={styles.loading}>Contacts Not Availble Yet.</Text>
              ) : (
                <Text style={styles.loading}>loading ...</Text>
              )}
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('_Contacts')}>
              <Text style={styles.seemore}>See more contacts</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      {/* <ImageBackground
        style={[styles.fixed, styles.bgcontainter, {zIndex: -1}]}
        source={images.bgRegister}
      /> */}
    </View>
  );
};

const CustomDrawerContent = ({navigation}) => {
  // Drawer => Services
  const handleContacts = () => {
    navigation.navigate('_Contacts');
  };
  const handleDescription = () => {
    navigation.navigate('_Description');
  };
  const handleDocuments = () => {
    navigation.navigate('_Documents');
  };
  const handleElevators = () => {
    navigation.navigate('_Elevators');
  };
  const handleMatterports = () => {
    navigation.navigate('_Matterports');
  };
  const handleAccess = () => {
    navigation.navigate('_Access');
  };
  const handleLockBoxes = () => {
    navigation.navigate('_LockBoxes');
  };
  const handleGenerators = () => {
    navigation.navigate('_Generators');
  };
  const handlePhotos = () => {
    navigation.navigate('_Photos');
  };
  const handlePrecautions = () => {
    navigation.navigate('_Precautions');
  };
  const handlePreExistingDamage = () => {
    navigation.navigate('_PreExistingDamages');
  };
  const handleUtilities = () => {
    navigation.navigate('_Utilities');
  };
  const handleYoutubeVideo = async () => {
    // navigation.navigate('_Youtube');
    try {
      if (await InAppBrowser.isAvailable()) {
        await InAppBrowser.open("https://www.youtube.com/watch?v=UwsrzCVZAb8", {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: COLORS.blueBtn,
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: COLORS.blueBtn,
          secondaryToolbarColor: 'black',
          navigationBarColor: 'black',
          navigationBarDividerColor: 'white',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          headers: {
            'my-custom-header': 'my custom header value',
          },
        });
      } else Linking.openURL(file);
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  // Drawer => Support
  const handleSupport = () => {
    navigation.navigate('_support');
  };
  const handleHelp = () => {
    navigation.navigate('_help');
  };
  return (
    <DrawerContentScrollView style={{padding: 0}}>
      <ScrollView style={styles.drawer}>
        <TouchableOpacity
          onPress={() => navigation.closeDrawer()}
          style={styles.drawerLogo1}>
          <AntDesign
            name="close"
            size={25}
            color="black"
            style={[styles.icon_style, styles.icon_style_close]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.closeDrawer()}
          style={styles.drawerLogo2}>
          <Image
            style={styles.logo}
            source={images.logo}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log('Clicked !!')}
          style={styles.drawerMenu}>
          <View style={styles.drawerMenuleft}>
            <Text style={styles.drawerMenuText}>Services</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.servicesVisible}>
          <TouchableOpacity onPress={handleAccess} style={styles.subCategory}>
            <Image source={icons.access} style={styles.drawerIconStyle} />
            <Text style={styles.subCategoryText}>Access</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleContacts} style={styles.subCategory}>
            <Image source={icons.contact} style={styles.drawerIconStyle} />
            <Text style={styles.subCategoryText}>Contacts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDescription}
            style={styles.subCategory}>
            <Image source={icons.description} style={styles.drawerIconStyle} />
            <Text style={styles.subCategoryText}>MSDS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDocuments}
            style={styles.subCategory}>
            <Image source={icons.document} style={styles.drawerIconStyle} />
            <Text style={styles.subCategoryText}>Emergency Parts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleElevators}
            style={styles.subCategory}>
            <Image source={icons.elevator} style={styles.drawerIconStyle} />
            <Text style={styles.subCategoryText}>Evacuation plan</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={handleGenerators}
            style={styles.subCategory}>
            <Image source={icons.generator} style={styles.drawerIconStyle} />
            <Text style={styles.subCategoryText}>Generators</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={handleLockBoxes}
            style={styles.subCategory}>
            <Image source={icons.lockbox} style={styles.drawerIconStyle} />
            <Text style={styles.subCategoryText}>LockBoxes</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={handleMatterports}
            style={styles.subCategory}>
            <Image source={icons.matterport} style={styles.drawerIconStyle} />
            <Text style={styles.subCategoryText}>Matterports</Text>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={handlePhotos} style={styles.subCategory}>
            <Image source={icons.gallery} style={styles.drawerIconStyle} />
            <Text style={styles.subCategoryText}>Photos</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={handlePrecautions}
            style={styles.subCategory}>
            <Image source={icons.precaution} style={styles.drawerIconStyle} />
            <Text style={styles.subCategoryText}>Precautions</Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            onPress={handlePreExistingDamage}
            style={styles.subCategory}>
            <Image source={icons.damage} style={styles.drawerIconStyle} />
            <Text style={styles.subCategoryText}>PreExistingDamage</Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            onPress={handleUtilities}
            style={styles.subCategory}>
            <Image source={icons.utility} style={styles.drawerIconStyle} />
            <Text style={styles.subCategoryText}>Utilities</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={handleYoutubeVideo}
            style={styles.subCategory}>
            <Image source={icons.precaution} style={styles.drawerIconStyle} />
            <Text style={styles.subCategoryText}>Youtube Video</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => console.log('Clicked !!')}
          style={styles.drawerMenu}>
          <View style={styles.drawerMenuleft}>
            <Text style={styles.drawerMenuText}>Support</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.servicesVisible}>
          <TouchableOpacity onPress={handleSupport} style={styles.subCategory}>
            <MaterialIcons
              name="support-agent"
              size={15}
              color="black"
              style={styles.drawerIconStyle}
            />
            <Text style={styles.subCategoryText}>support</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleHelp} style={styles.subCategory}>
            <MaterialCommunityIcons
              name="message-processing-outline"
              size={15}
              color="black"
              style={styles.drawerIconStyle}
            />
            <Text style={styles.subCategoryText}>Q&A</Text>
          </TouchableOpacity>
          <View style={{height: 50}}></View>
        </View>
      </ScrollView>
    </DrawerContentScrollView>
  );
};
const Drawer = createDrawerNavigator();

const PropertyHome = () => {
  console.log('Property Home Screen');

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {width: '70%'},
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
      initialRouteName="Home"
      style={styles.drawerNavStyle}>
      <Drawer.Screen name="Home" component={HomePage} />
    </Drawer.Navigator>
  );
};

export default PropertyHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  subContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f3f3f5',
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
  icon_style_close: {
    marginLeft: 180,
  },
  imageContainer: {
    // position: 'relative',
    margin: 20,
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
    height: Dimensions.get('window').height, //for full screen
  },
  fixed: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  propertyDetails: {
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
  loading: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
  },
  // DRAWER
  drawer: {
    flex: 1,
  },
  drawerLogo1: {
    width: '100%',
    alignItems: 'flex-end',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  drawerLogo2: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  drawerLogoText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  drawerMenu: {
    display: 'flex',
    marginBottom: 5,
  },
  drawerMenuText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
    padding: 10,
    paddingLeft: 15,
  },
  drawerMenuleft: {
    display: 'flex',
    flexDirection: 'row',
  },
  subCategory: {
    marginVertical: 10,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subCategoryText: {
    // color: '#A2AAB1',
    color: '#747576',
    fontSize: 14,
    marginLeft: 10,
  },
  drawerLogoClose: {
    backgroundColor: '#fff',
    color: '#000',
    width: 30,
    height: 30,
    paddingLeft: 8,
    marginLeft: 20,
    borderRadius: 20,
    fontSize: 20,
    fontWeight: '500',
    display: 'flex',
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'flex-start',
  },
  servicesVisible: {
    marginBottom: 0,
  },
  IDproperty: {
    color: 'black',
    fontSize: 20,
  },
  welcometTitle: {
    color: 'black',
    fontWeight: '800',
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
  },
  titleContainer: {
    marginBottom: 0,
  },
  behindLine: {
    // borderBottomWidth: 25,
    // borderBottomColor: COLORS.blueBtn,
    // opacity: 0.85,
    // marginTop: -35,
    // zIndex:-1
  },
  titleStyle2: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  fullename: {
    color: 'grey',
    fontSize: 14,
  },
  fullename2: {
    color: 'black',
    fontSize: 26,
    marginBottom: 15,
  },
  titleLineA: {
    width: '100%',
    height: 18,
    backgroundColor: COLORS.blueBtn,
    marginTop: -38,
    zIndex: -1,
    opacity: 0.9,
  },
  titleLineB: {
    width: '100%',
    height: 10,
    backgroundColor: COLORS.blueBtn,
    marginLeft: 100,
  },
  drawerIconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 10,
  },
  // third
  quickContainer: {
    padding: 10,
  },
  title1: {
    fontSize: 24,
    color: 'black',
    fontWeight: '800',
  },
  hotspotsLine1: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
  },
  hotspotsLine2: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
  },
  hotspot: {
    width: '50%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  hotspot2: {
    width: '50%',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  hotspotIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  hotspotTitleContainer: {
    paddingHorizontal: 5,
  },
  hotspotTitle1: {
    fontSize: 14,
    // color: '#666565' privious,
    color: '#363535',
    fontWeight: '600',
    marginVertical: 2,
    textAlign: 'left',
  },
  hotspotTitle2: {
    fontSize: 12,
    // color: '#b8b8b8' privious,
    color: '#616161',
    marginVertical: 2,
    textAlign: 'left',
  },
  leftSide: {
    width: '100%',
    backgroundColor: COLORS.blueBtn,
    paddingHorizontal: 20,
    paddingVertical: 50,
    borderRadius: 8,
  },
  rightSide: {
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 50,
    borderRadius: 8,
  },
  bigIcon: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  hotspot2Title1: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    marginVertical: 5,
  },
  hotspot2Title2: {
    fontSize: 10,
    color: 'white',
  },
  hotspot2Title3: {
    fontSize: 14,
    fontWeight: '600',
    color: '#727272',
    marginVertical: 5,
  },
  hotspot2Title4: {
    fontSize: 10,
    color: '#b8b8b8',
  },
  shadow: {
    shadowColor: COLORS.blueBtn,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0,
    shadowRadius: 2,
    elevation: 8,
  },
  seemore: {
    textAlign: 'center',
    fontWeight: '600',
    color: '#727272',
    marginVertical: 10,
    marginBottom: 30,
  },
  drawerNavStyle: {
    padding: 0,
    margin: 0,
  },
});
