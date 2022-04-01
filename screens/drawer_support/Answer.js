import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Answer = props => {
  console.log('props from Answer');
  console.log(props);
  const {answer, createdAt, updatedAt, deletedAt} = props;
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
  return (
    <View>
      <View style={styles.modelMid}>
        <View style={styles.modelMidText}>
          <View style={styles.titleTime}>
            <Text style={styles.modelName}>{answer}</Text>
          </View>
          <View style={styles.lastLine}>
            <View>
              <Text style={styles.modelTime}>{time()}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Answer;

const styles = StyleSheet.create({
  modelMid: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  modelMidText: {
    flex: 1,
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
  },
  modelName: {
    fontSize: 18,
    marginBottom: 5,
    color: 'black',
    fontWeight: '700',
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
  lastLine: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
