import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  deleteElevator,
  doneElevator,
} from '../../../redux/Property/property.actions';
import {useDispatch} from 'react-redux';
import {auth} from '../../../firebase/utils';
import Dialog from 'react-native-dialog';
import ImageView from 'react-native-image-viewing';


const Elevator = props => {
  const [visibleDone, setVisibleDone] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const dispatch = useDispatch();
  const [visible, setIsVisible] = useState(false);
  const {nb, photo, title, phone, done, createdAt, updatedAt, deletedAt, images} =
    props;
  console.log('props');
  console.log(props);
  console.log('From Elecator Components =>');
  console.log({photo, title, phone, done});
  console.log(auth().currentUser);

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
          <Text style={styles.contactName}>{title}</Text>
          <Text style={styles.date}>{time()}</Text>
        </View>
      </View>
    </View>
  );
  const handleDoneCancel = () => {
    setVisibleDone(false);
  };
  const handleDone = () => {
    setVisibleDone(false);
    dispatch(doneElevator(nb));
  };
  const handleDeleteCancel = () => {
    setVisibleDelete(false);
  };
  const handleDelete = () => {
    setVisibleDelete(false);
    dispatch(deleteElevator(nb));
  };
  return (
    <View>
      {renderModel()}
      <Dialog.Container visible={visibleDone}>
        <Dialog.Title>Matterport Done</Dialog.Title>
        <Dialog.Description>
          Do you want to set this Matterport to Done?
        </Dialog.Description>
        <Dialog.Button label="Back" onPress={handleDoneCancel} />
        <Dialog.Button label="Done" onPress={handleDone} />
      </Dialog.Container>

      <Dialog.Container visible={visibleDelete}>
        <Dialog.Title>Matterport deletion</Dialog.Title>
        <Dialog.Description>
          Do you want to delete this matterport? You cannot undo this action.
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

export default Elevator;

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
