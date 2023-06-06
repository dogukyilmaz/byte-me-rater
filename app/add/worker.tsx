import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Button } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';

type ModalScreenProps = {
  title: string;
};

const firebaseConfig = {
  apiKey: 'AIzaSyDyF_dX0eMwvw3MGmsnUsP1NHybRGzMAzE',
  authDomain: '388749525367-1frbbgeg507rmt9kcmujicr26qet5058.apps.googleusercontent.com',
  projectId: 'byteme-a2fdf',
  storageBucket: 'byteme-a2fdf.appspot.com',
};

export default function ModalScreen() {
  const addUserToFirestore = async () => {
    try {
      const firebaseApp = firebase.initializeApp(firebaseConfig);

      const db = firebaseApp.firestore();
      const auth = firebase.auth();

      await db.collection('Kisiler').add({
        Id: 'ads',
        Name: 'John doe',
      });

      console.log('User added to Firestore');
    } catch (error) {
      console.log('Error adding user to Firestore:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Worker</Text>
      <Button title="Add User" onPress={addUserToFirestore} />
      {/* <View style={styles.separator} lightColor='#eee' darkColor='rgba(255,255,255,0.1)' /> */}
      {/* <EditScreenInfo path='app/modal.tsx' /> */}

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
