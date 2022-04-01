import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {deleteDescription} from '../../../redux/Property/property.actions';
import Ioniicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {useDispatch} from 'react-redux';
import {auth} from '../../../firebase/utils';
import Swipeout from 'react-native-swipeout';
import Dialog from 'react-native-dialog';
import ImageView from 'react-native-image-viewing';

const Description = props => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const {nb, photo, title, description, createdAt, updatedAt, deletedAt} =
    props;
  console.log('From Description Model =>');
  console.log(props);
  console.log('From Description Components =>');
  console.log({photo, title, description});
  console.log(auth().currentUser);

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
  const renderModel = () => (
    <View style={styles.contactContainer}>
      <View style={styles.contact}>
        <View style={styles.contactMid}>
          <View style={[styles.contactMidText, styles.shadow]}>
            <TouchableOpacity onPress={() => setIsVisible(true)}>
              <Image source={{uri: photo}} style={styles.photoStyle} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.readIcon}
              onPress={() => toggleModal()}>
              <Ioniicons
                name="chevron-down-circle-outline"
                color="white"
                size={35}
              />
            </TouchableOpacity>
            <Text style={styles.contactName}>{title}</Text>
            <Text style={styles.date}>{time()}</Text>
          </View>
        </View>
      </View>
      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0.5}
        onBackdropPress={() => setModalVisible(false)}
        // swipeDirection={['up']}
        // scrollOffsetMax={400 - 300} // content height - ScrollView height
        propagateSwipe={true}
        style={styles.modal}>
        <View style={styles.modelStyle}>
          <ScrollView>
            <Text style={styles.modelTitle}>{title}</Text>
            <Text style={styles.contactNumber}>{description}</Text>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
  const handleDeleteCancel = () => {
    setVisibleDelete(false);
  };
  const handleDelete = () => {
    setVisibleDelete(false);
    dispatch(deleteDescription(nb));
  };
  const toggleModal = () => {
    console.log('Clicked !!!');
    setModalVisible(!isModalVisible);
  };

  return (
    <View>
      {auth().currentUser ? (
        <Swipeout right={swipeoutBtns}>{renderModel()}</Swipeout>
      ) : (
        renderModel()
      )}
      <Dialog.Container visible={visibleDelete}>
        <Dialog.Title>Description deletion</Dialog.Title>
        <Dialog.Description>
          Do you want to delete this Description? You cannot undo this action.
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={handleDeleteCancel} />
        <Dialog.Button label="Delete" onPress={handleDelete} />
      </Dialog.Container>
      <ImageView
        images={[{uri: photo}]}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </View>
  );
};

export default Description;

const styles = StyleSheet.create({
  contactContainer: {
    paddingVertical: 10,
    paddingHorizontal: 0,
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contact: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 10,
  },
  shadow: {
    shadowOffset: {width: 10, height: 10},
    shadowColor: 'black',
    shadowOpacity: 1,
    // elevation: 3,
    // background color must be set
    backgroundColor: '#0000', // invisible color
  },
  contactMid: {
    flexDirection: 'row',
  },
  contactMidText: {
    paddingVertical: 5,
    position: 'relative',
    width: 330,
    height: 200,
    zIndex: 1,
  },
  contactName: {
    zIndex: 200,
    position: 'absolute',
    bottom: 25,
    left: 0,
    fontSize: 16,
    color: 'black',
    backgroundColor: 'white',
    padding: 8,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  date: {
    fontSize: 14,
    color: 'grey',
    marginTop: 10,
  },
  contactNumber: {
    color: 'black',
    fontSize: 16,
    lineHeight: 22,
    marginVertical: 20,
    paddingHorizontal: 10,
    textAlign: 'justify',
  },
  contactMore: {
    opacity: 0.9,
  },
  photoStyle: {
    zIndex: 2,
    width: 330,
    height: 170,
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    // elevation: 15,
  },
  readIcon: {
    zIndex: 200,
    position: 'absolute',
    top: 12,
    right: 10,
  },
  //   Model
  modelStyle: {
    flex: 0.55,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 25,
    paddingTop: 25,
    overflow: 'scroll',
  },
  modal: {
    // height: 200,
    justifyContent: 'flex-end',
    margin: 0,
    overflow: 'scroll',
  },
  modelTitle: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
  },
});
