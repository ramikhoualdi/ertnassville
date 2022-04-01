import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  deleteGenerator,
  doneGenerator,
} from '../../../redux/Property/property.actions';
import {useDispatch} from 'react-redux';
import {auth} from '../../../firebase/utils';
import Swipeout from 'react-native-swipeout';
import Dialog from 'react-native-dialog';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const Generator = props => {
  const [visibleDone, setVisibleDone] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const dispatch = useDispatch();
  const {nb, emergency, title, phone, done, createdAt, updatedAt, deletedAt} =
    props;
  console.log('props');
  console.log(props);
  console.log('From Generator Components =>');
  console.log({emergency, title, phone, done});
  console.log(auth().currentUser);

  var swipeoutBtns = [
    {
      text: 'Done',
      backgroundColor: '#238823',
      color: 'white',
      onPress: () => {
        setVisibleDone(true);
      },
      underlayColor: 'grey',
      disabled: false,
    },
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
      <View style={styles.model}>
        <View style={styles.modelMid}>
          {done ? (
            <View style={styles.doneCheck}>
              <EvilIcons name="check" color="#238823" size={30} />
            </View>
          ) : (
            <View style={styles.doneCheck}></View>
          )}
          <View style={styles.modelMidText}>
            <View style={styles.titleTime}>
              <Text style={styles.modelName}>{title}</Text>
            </View>
            <Text style={styles.modelNumber}>{phone}</Text>
            <View style={styles.lastLine}>
              <View>
                {emergency === '1' ? (
                  <Text style={styles.accessEmergency1}>Normal Emergency</Text>
                ) : null}
                {emergency === '2' ? (
                  <Text style={styles.accessEmergency2}>Just Emergency</Text>
                ) : null}
                {emergency === '3' ? (
                  <Text style={styles.accessEmergency3}>Super Emergency</Text>
                ) : null}
              </View>
              <View>
                <Text style={styles.modelTime}>{time()}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.modelMore}>
          {/* <IconFeather
              name="more-vertical"
              color="grey"
              size={25}
              style={styles.icon_style}
            /> */}
        </View>
      </View>
    </View>
  );
  const handleDoneCancel = () => {
    setVisibleDone(false);
  };
  const handleDone = () => {
    setVisibleDone(false);
    dispatch(doneGenerator(nb));
  };
  const handleDeleteCancel = () => {
    setVisibleDelete(false);
  };
  const handleDelete = () => {
    setVisibleDelete(false);
    dispatch(deleteGenerator(nb));
  };

  return (
    <View>
      {auth().currentUser ? (
        <Swipeout right={swipeoutBtns}>{renderModel()}</Swipeout>
      ) : (
        renderModel()
      )}
      <Dialog.Container visible={visibleDone}>
        <Dialog.Title>Matterport Done</Dialog.Title>
        <Dialog.Description>
          Do you want to set this Matterport to Done?
        </Dialog.Description>
        <Dialog.Button label="Back" onPress={handleDoneCancel} />
        <Dialog.Button label="Done" onPress={handleDone} />
      </Dialog.Container>

      <Dialog.Container visible={visibleDelete}>
        <Dialog.Title >Matterport deletion</Dialog.Title>
        <Dialog.Description >
          Do you want to delete this matterport? You cannot undo this action.
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={handleDeleteCancel} />
        <Dialog.Button label="Delete" onPress={handleDelete} />
      </Dialog.Container>
    </View>
  );
};

export default Generator;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    marginBottom: 1,
  },
  model: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    paddingVertical: 5,
  },
  modelImage: {
    marginHorizontal: 20,
    width: 60,
    height: 60,
  },
  modelMid: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  modelMidText: {
    flex: 1,
    paddingVertical: 5,
  },
  modelName: {
    fontSize: 18,
    marginBottom: 5,
    color: 'black',
    fontWeight: '700',
  },
  modelNumber: {
    color: 'black',
    fontSize: 12,
  },
  modelMore: {
    opacity: 0.9,
  },
  modelTime: {
    color: 'grey',
    fontSize: 10,
  },
  titleTime: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accessEmergency1: {
    color: '#238823',
    fontSize: 12,
  },
  accessEmergency2: {
    color: '#FFBF00',
    fontSize: 12,
  },
  accessEmergency3: {
    color: '#D2222D',
    fontSize: 12,
  },
  lastLine: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  doneCheck: {
    width: 35,
  },
});
