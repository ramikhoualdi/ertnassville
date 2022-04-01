import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {deleteContact} from '../../../redux/Property/property.actions';
import {useDispatch} from 'react-redux';
import {auth} from '../../../firebase/utils';
import Swipeout from 'react-native-swipeout';
import Dialog from 'react-native-dialog';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';

const Contact = props => {
  const [visibleDelete, setVisibleDelete] = useState(false);
  const dispatch = useDispatch();
  const {nb, name, number, image, createdAt, updatedAt, deletedAt} = props;
  console.log('props');
  console.log(props);
  console.log('From Contact Components =>');
  console.log({name, number, image});

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
  const handleCall = number => {
    const strNumber = toString(number);
    RNImmediatePhoneCall.immediatePhoneCall(strNumber);
  };
  const renderModel = () => (
    <View style={styles.container}>
      <View style={styles.model}>
        <TouchableOpacity onPress={() => {handleCall(number)}} style={styles.modelMid}>
          <View style={styles.doneCheck}>
            <Image
              source={{uri: image}}
              style={{
                width: 50,
                height: 50,
                marginHorizontal: 20,
                borderRadius: 50,
              }}
            />
          </View>

          <View style={styles.modelMidText}>
            <View style={styles.titleTime}>
              <Text style={styles.modelName}>{name}</Text>
            </View>
            <View style={styles.lastLine}>
              <View>
                <Text style={styles.modelNumber}>{number}</Text>
              </View>
              <View>
                <Text style={styles.modelTime}>{time()}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
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
  const handleDeleteCancel = () => {
    setVisibleDelete(false);
  };
  const handleDelete = () => {
    setVisibleDelete(false);
    dispatch(deleteContact(nb));
  };
  return (
    <View>
      {auth().currentUser ? (
        <Swipeout right={swipeoutBtns}>{renderModel()}</Swipeout>
      ) : (
        renderModel()
      )}
      <Dialog.Container visible={visibleDelete}>
        <Dialog.Title>Contact deletion</Dialog.Title>
        <Dialog.Description>
          Do you want to delete this Contact? You cannot undo this action.
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={handleDeleteCancel} />
        <Dialog.Button label="Delete" onPress={handleDelete} />
      </Dialog.Container>
    </View>
  );
};

export default Contact;

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
    width: 70,
    marginRight: 20,
  },
});
