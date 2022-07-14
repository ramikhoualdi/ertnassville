import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
  Alert,
} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS, icons} from '../constants';
import {FloatingAction} from 'react-native-floating-action';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchProperty,
  resetFetchAll,
  ResetAddAnswerForm,
} from '../redux/User/user.actions';
import InAppBrowser from 'react-native-inappbrowser-reborn';

const actions = [
  {
    text: 'Spport',
    icon: <MaterialIcons name="support-agent" size={20} color="white" />,
    name: '_supports',
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
    text: 'Q&A',
    icon: (
      <MaterialCommunityIcons
        name="message-processing-outline"
        size={20}
        color="white"
      />
    ),
    name: '_helps',
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
const services = [
  {
    icon: icons.i1,
    name: 'Access',
    link: '_Access',
    desc: 'Given access',
  },
  {
    icon: icons.i2,
    name: 'Contact',
    link: '_Contacts',
    desc: 'Phone calls',
  },
  {
    icon: icons.i3,
    name: 'MSDS',
    link: '_Description',
    desc: 'New content',
  },
  {
    icon: icons.i4,
    name: 'Documents',
    link: '_Documents',
    desc: 'Latest upload',
  },
  {
    icon: icons.i5,
    name: 'Evacuation plan',
    link: '_Elevators',
    desc: 'Shifting methods',
  },
  // {
  //   icon: icons.i6,
  //   name: 'Generator',
  //   link: '_Generators',
  //   desc: 'The generators',
  // },
  {
    icon: icons.i7,
    name: 'Lockbox',
    link: '_LockBoxes',
    desc: 'The lockboxs',
  },
  // {
  //   icon: icons.i8,
  //   name: 'Matterport',
  //   link: '_Matterports',
  //   desc: 'The matterports',
  // },
  {
    icon: icons.i9,
    name: 'Gallery',
    link: '_Photos',
    desc: 'Recent photos',
  },
  // {
  //   icon: icons.i10,
  //   name: 'Precaution',
  //   link: '_Precautions',
  //   desc: 'Safety measure',
  // },
  // {
  //   icon: icons.i11,
  //   name: 'PreExisting Damage',
  //   link: '_PreExistingDamages',
  //   desc: 'Earliest harm',
  // },
  // {
  //   icon: icons.i12,
  //   name: 'Utility',
  //   link: '_Utilities',
  //   desc: 'Our tools',
  // },
];
const chat = [
  {
    icon: icons.utility,
    name: 'General chat',
    link: '_generalChat',
  },
  {
    icon: icons.utility,
    name: 'Urgent',
    link: '_urgent',
  },
];

const mapState = ({user}) => ({
  fetchPropertyD: user.fetchPropertyD,
  addAnswerSuccess: user.addAnswerSuccess,
});

const UserHome = ({route, navigation}) => {
  console.log('UserHome Screen !!', route.params);
  const propertyId = route.params.email;
  const {fetchPropertyD, addAnswerSuccess} = useSelector(mapState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetFetchAll());
  }, []);

  useEffect(() => {
    if (addAnswerSuccess) {
      dispatch(ResetAddAnswerForm());
      navigation.navigate('UserHome', {email: propertyId});
    }
  }, [addAnswerSuccess]);

  useEffect(() => {
    console.log('Property ID => ', propertyId);
    console.log('fetchPropertyD => ', fetchPropertyD);
    if (fetchPropertyD === null) {
      dispatch(fetchProperty(propertyId));
    }
  }, [fetchPropertyD]);

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
            <Text style={styles.headerID}>{route.params.email}</Text>
          </View>
          <View></View>
          <View></View>
          <View></View>
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={(styles.title, {margin: 20})}>
            <Text style={styles.titleStyle0}>Welcome Back To </Text>
            <Text style={styles.titleStyle2}>
              {fetchPropertyD && fetchPropertyD.propertyName}
            </Text>
          </View>
          <View style={styles.title}>
            <Text style={styles.titleStyle}>Services</Text>
          </View>
          {/* Services */}
          <View style={styles.servicesContainer}>
            {services.map((s, index) => (
              <TouchableOpacity
                key={index}
                style={styles.hotspot}
                onPress={() => navigation.navigate(s.link, {propertyId})}>
                <Image source={s.icon} style={styles.hotspotIcon} />
                <View style={styles.hotspotTitleContainer}>
                  <Text style={styles.hotspotTitle1}>{s.name}</Text>
                  <Text style={styles.hotspotTitle2}>{s.desc}</Text>
                </View>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
                style={styles.hotspot}
                onPress={async () => {
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
                }}>
                <Image source={icons.i8} style={styles.hotspotIcon} />
                <View style={styles.hotspotTitleContainer}>
                  <Text style={styles.hotspotTitle1}>Youtube Video</Text>
                </View>
              </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <FloatingAction
        actions={actions}
        color={COLORS.blueBtn}
        floatingIcon={<Ionicons name="help" size={25} color="white" />}
        onPressItem={name => {
          console.log(`selected button: ${name}`);
          navigation.navigate(`${name}`, {propertyId});
        }}
      />
    </View>
  );
};

export default UserHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 100,
  },
  subContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  headerID: {
    color: 'black',
    fontSize: 18,
    fontWeight: '800',
  },
  title: {
    margin: 20,
    marginVertical: 10,
    marginTop: 10,
  },
  titleStyle0: {
    fontSize: 16,
    // color: '#616161',
    color: '#B2B2B2',
  },
  titleStyle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
  },
  titleStyle2: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.blueBtn,
    textAlign: 'center',
  },
  servicesContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 100,
  },
  chatStyle: {
    marginBottom: 50,
  },
  service: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    margin: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 25,
    borderColor: 'black',
  },
  // Block
  icon: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    marginBottom: 8,
  },
  subIconTitle: {
    fontSize: 12,
    color: 'black',
    fontWeight: '500',
    maxWidth: 80,
    textAlign: 'center',
  },
  // hotspot
  hotspot: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    padding: 12,
  },
  hotspotContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
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
    fontSize: 12,
    color: '#363535',
    fontWeight: '600',
    textAlign: 'left',
  },
  hotspotTitle2: {
    fontSize: 12,
    color: '#616161',
    textAlign: 'left',
  },
});
