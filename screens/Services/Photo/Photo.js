import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {deletePhoto} from '../../../redux/Property/property.actions';
import {useDispatch} from 'react-redux';
import {auth} from '../../../firebase/utils';
import Swipeout from 'react-native-swipeout';
import Dialog from 'react-native-dialog';
import ImageView from 'react-native-image-viewing';

const Photo = props => {
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const {nb, photo, name, createdAt, updatedAt, deletedAt, images} = props;
  console.log('props From Photo Model => ');
  console.log(props);
  console.log('From Photo Components =>');
  console.log({photo, name});
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
        <TouchableOpacity onPress={() => setIsVisible(true)}>
          <Image source={{uri: photo}} style={styles.image} />
        </TouchableOpacity>
        <View style={styles.contactMidText}>
          <Text style={styles.contactName}>{name}</Text>
          <Text style={styles.date}>{time()}</Text>
        </View>
      </View>
    </View>
  );
  const handleDeleteCancel = () => {
    setVisibleDelete(false);
  };
  const handleDelete = () => {
    setVisibleDelete(false);
    dispatch(deletePhoto(nb));
  };
  return (
    <View>
      {auth().currentUser ? (
        <Swipeout right={swipeoutBtns}>{renderModel()}</Swipeout>
      ) : (
        renderModel()
      )}
      <Dialog.Container visible={visibleDelete}>
        <Dialog.Title>Photo deletion</Dialog.Title>
        <Dialog.Description>
          Do you want to delete this Photo? You cannot undo this action.
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={handleDeleteCancel} />
        <Dialog.Button label="Delete" onPress={handleDelete} />
      </Dialog.Container>
      <ImageView
        images={images ? images : [{uri: photo}]}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </View>
  );
};

export default Photo;

const styles = StyleSheet.create({
  contactContainer: {
    margin: 0,
    padding: 0,
    backgroundColor: 'white',
  },
  contact: {
    flexDirection: 'column',
    padding: 10,
  },
  image: {
    width: 300,
    height: 180,
    marginHorizontal: 20,
    borderRadius: 20,
    zIndex: 100,
  },
  contactMid: {
    flexDirection: 'column',
  },
  contactMidText: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  contactName: {
    color: 'black',
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'left',
  },
  date: {
    fontSize: 12,
    color: 'grey',
    marginTop: 0,
  },
});
