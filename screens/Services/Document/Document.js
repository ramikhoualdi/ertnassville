import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import {
  deleteDocument,
} from '../../../redux/Property/property.actions';
import {COLORS, icons} from '../../../constants';
import {useDispatch} from 'react-redux';
import {auth} from '../../../firebase/utils';
import Swipeout from 'react-native-swipeout';
import Dialog from 'react-native-dialog';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';

const Document = props => {
  const {nb, docRef, name, type, createdAt, updatedAt} = props;
  console.log('props');
  console.log(props);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const dispatch = useDispatch();
  const documentType = type;
  var swipeoutBtns = [
    {
      text: 'Delete',
      backgroundColor: '#D2222D',
      color: 'white',
      onPress: () => {
        setVisibleDelete(true);
      },
      type: 'delete',
      underlayColor: 'grey',
      disabled: false,
    },
  ];
  const time = () => {
    let ch = createdAt;
    if (ch) {
      const dateFinal = ch.toDate().toString().substr(4, 11);
      return `Added on ${dateFinal.substr(0, 3)} ${dateFinal.substr(
        4,
        2,
      )}, ${dateFinal.substr(7, 4)}`;
    } else {
      return '';
    }
  };
  const ViewFile = async () => {
    console.log('Clicked !!');
    try {
      if (await InAppBrowser.isAvailable()) {
        await InAppBrowser.open(docRef, {
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
      } else Linking.openURL(docRef);
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  const renderModel = () => (
    <TouchableOpacity style={styles.contactContainer} onPress={ViewFile}>
      <View style={styles.contact}>
        <View style={styles.contactMid}>
          {documentType === 'text/csv' && (
            <Image style={styles.docStyle} source={icons.file_csv} />
          )}
          {documentType === 'application/msword' && (
            <Image style={styles.docStyle} source={icons.file_doc} />
          )}
          {documentType === 'application/pdf' && (
            <Image style={styles.docStyle} source={icons.file_pdf} />
          )}
          {(documentType === 'application/vnd.ms-powerpoint' ||
            documentType ===
              'application/vnd.openxmlformats-officedocument.presentationml.presentation') && (
            <Image style={styles.docStyle} source={icons.file_ppt} />
          )}
          {documentType === 'text/plain' && (
            <Image style={styles.docStyle} source={icons.file_txt} />
          )}
          {documentType === 'application/zip' && (
            <Image style={styles.docStyle} source={icons.file_zip} />
          )}
          {documentType !== 'text/csv' &&
            documentType !== 'application/msword' &&
            documentType !== 'application/pdf' &&
            documentType !== 'application/vnd.ms-powerpoint' &&
            documentType !== 'text/plain' &&
            documentType !== 'application/zip' &&
            documentType !==
              'application/vnd.openxmlformats-officedocument.presentationml.presentation' && (
              <Image style={styles.docStyle} source={icons.file_custom} />
            )}
          {/* <Image source={images.fileLogo} style={styles.docStyle} /> */}
          <View style={styles.contactMidText}>
            <Text style={styles.contactName}>{name}</Text>
            <Text style={styles.modelTime}>{time()}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  const handleDeleteCancel = () => {
    setVisibleDelete(false);
  };
  const handleDelete = () => {
    setVisibleDelete(false);
    dispatch(deleteDocument(nb));
  };

  return (
    <View>
      {auth().currentUser ? (
        <Swipeout right={swipeoutBtns}>{renderModel()}</Swipeout>
      ) : (
        renderModel()
      )}
      <Dialog.Container visible={visibleDelete}>
        <Dialog.Title>Access deletion</Dialog.Title>
        <Dialog.Description>
          Do you want to delete this Access? You cannot undo this action.
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={handleDeleteCancel} />
        <Dialog.Button label="Delete" onPress={handleDelete} />
      </Dialog.Container>
    </View>
  );
};

export default Document;

const styles = StyleSheet.create({
  contactContainer: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  contact: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
  },
  docStyle: {
    width: 50,
    height: 50,
    marginHorizontal: 15,
    borderRadius: 0,
  },
  contactMid: {
    flexDirection: 'row',
  },
  contactMidText: {
    paddingVertical: 5,
  },
  contactName: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'left',
    color: 'black',
  },
  contactNumber: {
    color: 'grey',
    fontSize: 13,
  },
  modelTime: {
    color: 'grey',
    fontSize: 10,
  },
});
