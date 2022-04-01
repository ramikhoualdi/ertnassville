import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import { COLORS, images } from '../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { saveContact, ResetAddContactForm, resetFetchContact } from '../../../redux/Property/property.actions';
import { launchImageLibrary } from 'react-native-image-picker';

const mapState = ({ property }) => ({
  addContactSuccess: property.addContactSuccess,
  errors: property.errors,
});

const AddContact = ({navigation}) => {
    console.log('AddContact screen !')
    const { addContactSuccess, errors } = useSelector(mapState)
    console.log('addContactSuccess =>',addContactSuccess,' errors =>', errors)

    const dispatch = useDispatch();

    // Storing data
    const [photo, onChangePhoto] = useState('')
    const [name, onChangeName] = useState('')
    const [phone, onChangePhone] = useState('')
    const [photoErrors, onChangePhotoError] = useState('')
    const [nameErrors, onChangeNameError] = useState('')
    const [phoneErrors, onChangePhoneError] = useState('')
    const [imgExist, setImgExist] = useState(false)

    // Optional 
    const [fileUri, setFileUri] = useState('')

    useEffect(() => {
      console.log('UseEffect')
      console.log('File URI =>', fileUri)
      if(fileUri){
        console.log('is Img Exist => ',imgExist)
        setImgExist(true)
        console.log('is Img Exist => ',imgExist)
      }
      if(addContactSuccess){
        dispatch(ResetAddContactForm)
        navigation.navigate('PropertyHome')
        dispatch(resetFetchContact())
      }
    },[fileUri, addContactSuccess])

    const selectImage = () => {
      var options = {
        title: 'Select Image',
        customButtons: [
          {
            name: 'customOptionKey', 
            title: 'Choose file from Custom Option' 
          },
        ],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      
      launchImageLibrary(options, (res) => {
        console.log('Response = ', res);
        if (res.didCancel) {
          console.log('User cancelled image picker');
        } else if (res.error) {
          console.log('ImagePicker Error: ', res.error);
        } else if (res.customButton) {
          console.log('User tapped custom button: ', res.customButton);
          alert(res.customButton);
        } else {
          console.log('response', JSON.stringify(res.assets[0].uri));
          setFileUri(res.assets[0].uri)
          onChangePhoto(res.assets[0].uri)
    }}
    )}
    
    const handleRegister = () => {
        console.log('handleRegister Clicked !!')
        let checked = 'true'
        if(!photo){
          checked = 'false'
          onChangePhotoError('* Photo Required!')
        }
        if(name.length == 0){
          checked = 'false'
          onChangeNameError('* Name Required!')
        }
        if(phone.length == 0){
          checked = 'false'
          onChangePhoneError('* Phone Required!')
        }
        if(checked == 'true'){
          console.log('Inputs Valid !!!!')
          console.log({photo, name, phone})
          dispatch(saveContact(photo, name, phone))
          console.log('data send to users actions Success !!')
        }
    }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <IconFeather
            name="arrow-left"
            size={25}
            color={COLORS.greyColor}
            style={styles.icon_style}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View
          style={styles.headerTitle}
        >
          <Text  
            style={styles.headerText1}
          >Add Contact</Text>
        </View>
        <View
        >
            <TouchableOpacity
                onPress={selectImage}
                style={styles.circle}
            >
                <View 
                    style={styles.circlePhoto}
                >
                  { imgExist ? (
                    <Image
                      style={styles.emptyPhoto}
                      source={{uri: fileUri}}
                  />
                  ) : (
                    <Image
                        style={styles.emptyPhoto}
                        source={images.nullimg} 
                    />
                  )}
                </View>
                    <Text style={styles.textType2}>Select A Photo</Text>
                    <Text style={styles.fieldErrors}>{photoErrors}</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.content}>
          {/* Email Adresse */}
          <View style={styles.inputField}>
            <Text style={styles.label}>name</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeName}
              value={name}
              placeholder='Contact Name'
              maxLength={20}
              placeholderTextColor={'grey'}
            />
            <Text style={styles.fieldErrors}>{nameErrors}</Text>
          </View>
          <View style={styles.inputField}>
            <Text style={styles.label}>Number</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangePhone}
              value={phone}
              placeholder='+1 12345678'
              maxLength={152}
              placeholderTextColor={'grey'}
            />
            <Text style={styles.fieldErrors}>{phoneErrors}</Text>
          </View>
          <TouchableOpacity style={styles.button1} onPress={handleRegister}>
            <Text style={styles.signup}>Confirm</Text>
          </TouchableOpacity>    
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddContact;

const styles = StyleSheet.create({  
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    color: COLORS.main,
    backgroundColor:  COLORS.whiteColor,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  icon_style: {
    flex: 0.45,
    padding: 20,
    marginTop: 30,
  },
  headerTitle: {
    paddingVertical: 10,
  },
  textType2: {
    color: 'black',
    fontSize: 14,
    marginVertical: 5,

  },
  headerText: {
    color: COLORS.greyColor,
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 0,
    lineHeight: 20,

  },
  headerText1: {
    color: 'black',
    textAlign: 'center',
    fontSize: 28,
    textTransform: 'uppercase',
    marginBottom: 25,
  },
  content: {
    paddingHorizontal: 40,
    marginTop: 40,
  },
  emptyPhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    zIndex: 100
  },
  circle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circlePhoto: {
      borderRadius: 50,
      width: 100,
      height: 100,
      // backgroundColor: COLORS.blue2Color,
      backgroundColor: 'transparent',
      borderColor: COLORS.darkgray,
      borderWidth: 0,
  },
  inputField: {
    paddingTop: 0,
    padding: 5,
    width: '100%',
  },
  label: {
    textAlign: 'left',
    fontSize: 16,
    color: COLORS.greyColor,
    marginBottom: 10,
  },
  privacy: {
    textAlign: 'left',
    fontSize: 12,
    color: 'white',
    // marginBottom: 10,
  },
  label1: {
    textAlign: 'left',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
    color: COLORS.greyColor,
    marginBottom: 10,
  },
  label2: {
    textAlign: 'left',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
    color: COLORS.blueColor,
    textDecorationStyle: 'solid',
    textDecorationColor: COLORS.greyColor,
    marginBottom: 10,
  },
  fieldErrors: {
    marginVertical: 3,
    color: COLORS.redColor,
    fontSize: 12,
  },
  input: {
    borderRadius: 10,
    fontSize: 14,
    color: COLORS.darkgray,
    borderWidth: 0.5,
    borderColor: COLORS.greyColor,
    backgroundColor: COLORS.whiteColor,
    paddingVertical: 10,
    paddingLeft: 20,
    width: '100%',
  },
  passwordField: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  eyeIcon: {
    position: 'absolute',
    right: 20,
    fontSize: 25,
  },
  terms: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 10,

  },
  signup: {
    backgroundColor: COLORS.blue2Color,
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    // marginVertical: 20,
  },
  button1: {
    marginBottom: 20,
  },
  errors: {
    paddingVertical: 10,
  },
  error: {
    color: 'red',
    fontSize: 18,
    fontWeight: '600',
  },
  already: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
});
