import React, { useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  Box,
  VStack,
  FormControl,
  Input,
  Radio,
  Divider,
  Checkbox,
  AddIcon,
  Button,
  Select,
  CheckIcon,
  HStack,
} from 'native-base';
import { View } from '../../components/Themed';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDyF_dX0eMwvw3MGmsnUsP1NHybRGzMAzE',
  authDomain: '388749525367-1frbbgeg507rmt9kcmujicr26qet5058.apps.googleusercontent.com',
  projectId: 'byteme-a2fdf',
  storageBucket: 'byteme-a2fdf.appspot.com',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function AddWorkerScreen() {
  const [isLoading, setLoading] = useState(false);
  const [worker, setWorker] = useState('');
  const [description, setDescription] = useState('');
  const [groupValues, setGroupValues] = useState(['day', 'night']);
  const [difficulty, setDifficulty] = useState('5');

  const addWorker = () => {
    const workersCollectionRef = firebase.firestore().collection('workers');
    workersCollectionRef
      .add({
        name: worker,
        description: description,
        preferredShift: groupValues,
        difficulty: difficulty,
      })
      .then(() => {
        console.log('Worker added to Firestore');
      })
      .catch((error) => {
        console.error('Error adding worker to Firestore:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Box p='8'>
        <VStack space='5'>
          <FormControl>
            <FormControl.Label mb='1'>Worker Name?</FormControl.Label>
            <Input
              placeholder='Title'
              borderRadius={9}
              onChangeText={(text) => setWorker(text)}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label mb='1'>Worker Description?</FormControl.Label>
            <Input
              placeholder='Description'
              borderRadius={9}
              onChangeText={(text) => setDescription(text)}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label mb='1'>Preferred Shift?</FormControl.Label>
            <Checkbox.Group
              onChange={setGroupValues}
              value={groupValues}
              accessibilityLabel='choose shift'
              colorScheme='green'
            >
              <HStack space='5' alignItems='center'>
                <Checkbox value='day'>Day</Checkbox>
                <Checkbox value='night'>Night</Checkbox>
              </HStack>
            </Checkbox.Group>
          </FormControl>
          <FormControl>
            <FormControl.Label mb='1'>Preferred Max Difficulty?</FormControl.Label>
            <Radio.Group
              name='difficulty'
              value={difficulty}
              onChange={(nextValue) => setDifficulty(nextValue)}
              accessibilityLabel='choose difficulty'
              colorScheme='green'
            >
              <HStack space='3'>
                <Radio value='1'>1</Radio>
                <Radio value='2'>2</Radio>
                <Radio value='3'>3</Radio>
                <Radio value='4'>4</Radio>
                <Radio value='5'>5</Radio>
              </HStack>
            </Radio.Group>
          </FormControl>
          <VStack space={5} my={4}>
            <Divider />
            <Checkbox size='sm' value='tnc' justifyContent='center' colorScheme='green'>
              I agree to add work terms and conditions.
            </Checkbox>
            <Divider />
          </VStack>
        </VStack>
        <Button
          variant='solid'
          colorScheme='green'
          mt='2'
          mx={50}
          borderRadius={10}
          isLoading={isLoading}
          endIcon={<AddIcon size='3' />}
          onPress={() => {
            setLoading(true);
            addWorker();
            setTimeout(() => {
              setLoading(false);
            }, 2000);
          }}
        >
          Add Worker
        </Button>
      </Box>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
