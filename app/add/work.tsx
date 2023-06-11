import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
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
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import type { SelectWorker } from '../../types';

export default function AddWorkScreen() {
  const { push } = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [worker, setWorker] = useState('');
  const [shift, setShift] = useState('day');
  const [difficulty, setDifficulty] = useState('1');

  const [isLoading, setLoading] = useState(false);
  const [workers, setWorkers] = useState<SelectWorker[]>([]);

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'workers'));
      const workersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setWorkers(workersData);
    } catch (error) {
      console.error('Error fetching workers from Firestore:', error);
    }
  };

  const addWork = async () => {
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, 'works'), {
        title,
        description,
        worker,
        shift,
        difficulty,
      });
      console.log('Work written with ID: ', docRef.id);
      push('/works');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Box p='8'>
        <VStack space='5'>
          <FormControl>
            <FormControl.Label mb='1'>Work Title?</FormControl.Label>
            <Input placeholder='Title' borderRadius={9} onChangeText={(text) => setTitle(text)} />
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
                <Select.Item key={worker.id} label={worker.name} value={worker.name?.toString()} />
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
              <VStack space='3'>
                <HStack space='3'>
                  <Radio value='1'>Easy</Radio>
                  <Radio value='2'>Normal</Radio>
                  <Radio value='3'>Medium</Radio>
                </HStack>
                <HStack space='3'>
                  <Radio value='4'>Hard</Radio>
                  <Radio value='5'>Expert</Radio>
                </HStack>
              </VStack>
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
          onPress={addWork}
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
