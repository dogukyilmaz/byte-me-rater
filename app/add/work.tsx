import React, { useState, useEffect } from 'react';
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
import { WORKERS as CONSTANTS_WORKERS } from '../../constants/workers';
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

export default function AddWorkScreen() {
  const [isLoading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [worker, setWorker] = useState('');
  const [shift, setShift] = useState('day');
  const [difficulty, setDifficulty] = useState('1');
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const workersCollectionRef = firebase.firestore().collection('workers');
        const snapshot = await workersCollectionRef.get();

        const workersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setWorkers([...CONSTANTS_WORKERS, ...workersData]);
      } catch (error) {
        console.error('Error fetching workers from Firestore:', error);
      }
    };

    fetchWorkers();
  }, []);

  const addWork = () => {
    const worksCollectionRef = firebase.firestore().collection('works');
    worksCollectionRef
      .add({
        title: title,
        description: description,
        worker: worker,
        shift: shift,
        difficulty: difficulty,
      })
      .then(() => {
        console.log('Work added to Firestore');
      })
      .catch((error) => {
        console.error('Error adding work to Firestore:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Box p='8'>
        <VStack space='5'>
          <FormControl>
            <FormControl.Label mb='1'>Work Title?</FormControl.Label>
            <Input
              placeholder='Title'
              borderRadius={9}
              onChangeText={(text) => setTitle(text)}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label mb='1'>Work Description?</FormControl.Label>
            <Input
              placeholder='Description'
              borderRadius={9}
              onChangeText={(text) => setDescription(text)}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label mb='1'>Worker?</FormControl.Label>
            <Select
              selectedValue={worker}
              minWidth='200'
              borderRadius={9}
              accessibilityLabel='Choose Worker'
              placeholder='Choose Worker'
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size='5' />,
              }}
              mt={1}
              onValueChange={(itemValue) => setWorker(itemValue)}
            >
              {workers.map((worker) => (
                <Select.Item key={worker.id} label={worker.name} value={worker.name.toString()} />
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormControl.Label mb='1'>Shift?</FormControl.Label>
            <Radio.Group
              name='day_night'
              value={shift}
              onChange={(nextValue) => setShift(nextValue)}
              accessibilityLabel='choose shift'
              colorScheme='secondary'
            >
              <HStack space='3'>
                <Radio value='day'>Day</Radio>
                <Radio value='night'>Night</Radio>
              </HStack>
            </Radio.Group>
          </FormControl>
          <FormControl>
            <FormControl.Label mb='1'>Difficulty?</FormControl.Label>
            <Radio.Group
              name='difficulty'
              value={difficulty}
              onChange={(nextValue) => setDifficulty(nextValue)}
              accessibilityLabel='choose difficulty'
              colorScheme='secondary'
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
            <Checkbox size='sm' value='tnc' justifyContent='center' colorScheme='secondary'>
              I agree to add work terms and conditions.
            </Checkbox>
            <Divider />
          </VStack>
        </VStack>
        <Button
          variant='solid'
          colorScheme='secondary'
          mt='2'
          mx={50}
          isLoading={isLoading}
          endIcon={<AddIcon size='3' />}
          borderRadius={10}
          onPress={() => {
            setLoading(true);
            addWork();
            setTimeout(() => {
              setLoading(false);
            }, 2000);
          }}
        >
          Create Work
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
