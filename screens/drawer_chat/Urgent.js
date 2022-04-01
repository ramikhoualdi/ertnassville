import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

const Urgent = () => {
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Urgent</Text>
      </View>
    </ScrollView>
  );
};

export default Urgent;

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
