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
import {COLORS, icons} from '../../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {
  saveDocument,
  ResetAddDocumentForm,
  resetFetchDocument,
} from '../../../redux/Property/property.actions';
import DocumentPicker from 'react-native-document-picker';

const mapState = ({property}) => ({
  addDocumentSuccess: property.addDocumentSuccess,
  errors: property.errors,
});

const AddDocument = ({navigation}) => {
  console.log('AddDocument screen !');
  const {addDocumentSuccess, errors} = useSelector(mapState);
  const dispatch = useDispatch();

  // Storing data
  const [name, onChangeName] = useState('');
  const [document, setDocument] = useState(null);
  const [documentType, setDocumentType] = useState(null);
  const [documentName, setDocumentName] = useState(null);
  const [pdfErrors, onChangePdfError] = useState('');
  const [nameErrors, onChangeNameError] = useState('');

  useEffect(() => {
    if (addDocumentSuccess) {
      dispatch(ResetAddDocumentForm);
      navigation.navigate('PropertyHome');
      dispatch(resetFetchDocument());
    }
  }, [addDocumentSuccess]);

  const handlePicker = async () => {
    try {
      const file = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        copyTo: 'documentDirectory',
      });
      console.log('File => ', file);
      console.log('File => ', file[0].fileCopyUri);
      setDocument(file[0].fileCopyUri);
      setDocumentType(file[0].type);
      setDocumentName(file[0].name);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('User Cancel Pick Document');
      } else {
        throw error;
      }
      console.log('Error from catch, ', error);
    }
  };

  const handleRegister = () => {
    console.log('handleRegister Clicked !!');
    let checked = 'true';
    if (!document) {
      checked = 'false';
      onChangePdfError('* File Required!');
    }
    if (name.length == 0) {
      checked = 'false';
      onChangeNameError('* Name Required!');
    }
    if (checked == 'true') {
      console.log('Inputs Valid !!!!');
      console.log({document, name, documentType});
      dispatch(saveDocument(document, name, documentType));
      console.log('data send to users actions Success !!');
    }
  };

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
        <View style={styles.headerTitle}>
          <Text style={styles.headerText1}>Add Document</Text>
        </View>
        <View>
          <TouchableOpacity onPress={handlePicker} style={styles.circle}>
            <View style={styles.circlePhoto}>
              {!document && (
                <>
                  <Image style={styles.emptyPhoto} source={icons.file_add} />
                  <Text style={styles.textType2}>Select a File</Text>
                </>
              )}
              {document && documentType === 'text/csv' && (
                <>
                  <Image style={styles.emptyPhoto} source={icons.file_csv} />
                  <Text style={styles.textType2}>{documentName}</Text>
                </>
              )}
              {document && documentType === 'application/msword' && (
                <>
                  <Image style={styles.emptyPhoto} source={icons.file_doc} />
                  <Text style={styles.textType2}>{documentName}</Text>
                </>
              )}
              {document && documentType === 'application/pdf' && (
                <>
                  <Image style={styles.emptyPhoto} source={icons.file_pdf} />
                  <Text style={styles.textType2}>{documentName}</Text>
                </>
              )}
              {document &&
                (documentType === 'application/vnd.ms-powerpoint' ||
                  documentType ===
                    'application/vnd.openxmlformats-officedocument.presentationml.presentation') && (
                  <>
                    <Image style={styles.emptyPhoto} source={icons.file_ppt} />
                    <Text style={styles.textType2}>{documentName}</Text>
                  </>
                )}
              {document && documentType === 'text/plain' && (
                <>
                  <Image style={styles.emptyPhoto} source={icons.file_txt} />
                  <Text style={styles.textType2}>{documentName}</Text>
                </>
              )}
              {document && documentType === 'application/zip' && (
                <>
                  <Image style={styles.emptyPhoto} source={icons.file_zip} />
                  <Text style={styles.textType2}>{documentName}</Text>
                </>
              )}
              {document &&
                documentType !== 'text/csv' &&
                documentType !== 'application/msword' &&
                documentType !== 'application/pdf' &&
                documentType !== 'application/vnd.ms-powerpoint' &&
                documentType !== 'text/plain' &&
                documentType !== 'application/zip' &&
                documentType !==
                  'application/vnd.openxmlformats-officedocument.presentationml.presentation' && (
                  <Image style={styles.emptyPhoto} source={icons.file_custom} />
                )}
            </View>
            <Text style={styles.fieldErrors}>{pdfErrors}</Text>
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
              placeholder="File Name"
              maxLength={20}
              placeholderTextColor={'grey'}
            />
            <Text style={styles.fieldErrors}>{nameErrors}</Text>
          </View>
          <TouchableOpacity style={styles.button1} onPress={handleRegister}>
            <Text style={styles.signup}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddDocument;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    color: COLORS.main,
    backgroundColor: COLORS.whiteColor,
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
    textAlign: 'center',
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
    marginTop: 0,
  },
  emptyPhoto: {
    width: 150,
    height: 150,
    borderRadius: 10,
    zIndex: 100,
    transform: [{scale: 0.9}],
  },
  circle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  circlePhoto: {
    borderRadius: 20,
    width: 150,
    height: 150,
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
