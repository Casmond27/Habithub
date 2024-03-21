import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet, Image } from 'react-native';
import { Appbar } from 'react-native-paper';

const Loading = () => (
  <View style={styles.container}>
    <Image style={styles.image} source={require('./../assets/loadingIcon.png')} />
    <Text style={styles.title}>HabitHub</Text>
    <Text style={styles.subTitle}>Crafting a Better You, Brick by Brick.</Text>
    <ActivityIndicator size="large" color="#5c6ac4" testID="activity-indicator" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
  },
  title: {
    color: 'black',
    fontSize: 40,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  subTitle: {
    color: 'grey',
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 30,
    marginBottom: 30,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
});

export default Loading;
