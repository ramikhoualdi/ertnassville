import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';

const Contact2 = props => {
  const {nb, name, number, image, createdAt, updatedAt, deletedAt} = props;
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
  return (
    <TouchableOpacity
      onPress={() => {
        handleCall(number);
      }}
      style={styles.modelMid}>
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
  );
};

export default Contact2;

const styles = StyleSheet.create({
  modelMid: {
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 8,
    marginBottom: 10,
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
