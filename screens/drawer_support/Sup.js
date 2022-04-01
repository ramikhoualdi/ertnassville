import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {deleteSupport} from '../../redux/Property/property.actions';
import {useDispatch} from 'react-redux';
import {auth} from '../../firebase/utils';
import Swipeout from 'react-native-swipeout';
import Dialog from 'react-native-dialog';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const Sup = props => {
  const [visibleDelete, setVisibleDelete] = useState(false);
  const dispatch = useDispatch();
  const {nb, title, description, createdAt, updatedAt, deletedAt} = props;
  console.log('props');
  console.log(props);
  console.log('From Acces Components =>');
  console.log(nb, title, description, createdAt, updatedAt, deletedAt);
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
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleStyle}>{title}</Text>
      </View>
      <View style={styles.description}>
        <Text style={styles.descriptionStyle}>{description}</Text>
      </View>
    </View>
  );
  const handleDeleteCancel = () => {
    setVisibleDelete(false);
  };
  const handleDelete = () => {
    setVisibleDelete(false);
    dispatch(deleteSupport(nb));
  };
  return (
    <View>
      {auth().currentUser ? (
        <Swipeout right={swipeoutBtns}>{renderModel()}</Swipeout>
      ) : (
        renderModel()
      )}

      <Dialog.Container visible={visibleDelete}>
        <Dialog.Title>Support deletion</Dialog.Title>
        <Dialog.Description>
          Do you want to delete this Support? You cannot undo this action.
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={handleDeleteCancel} />
        <Dialog.Button label="Delete" onPress={handleDelete} />
      </Dialog.Container>
    </View>
  );
};

export default Sup;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    padding: 10,
    paddingBottom: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  title: {
    paddingLeft: 10,
    paddingTop: 15,
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  description: {
    marginLeft: 30,
  },
  descriptionStyle: {
    fontSize: 18,
    color: 'black',
  },
});
