import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

const GeneralChat = () => {
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Chat</Text>
      </View>
    </ScrollView>
  );
};

export default GeneralChat;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    margin: 20,
  },
  title: {
    fontWeight: '800',
    color: 'black',
    fontSize: 30,
  },
});
