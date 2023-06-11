import React, { useState } from 'react';
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
  HStack,
} from 'native-base';
import { View } from '../../components/Themed';
import { db } from '../../config/firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore';

export default function AddWorkerScreen() {
  const { push } = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [preferredShift, setPreferredShift] = useState(['day', 'night']);
  const [maxDifficulty, setMaxDifficulty] = useState('5');
  const [gender, setGender] = useState('m');

  const addWorker = async () => {
    try {
      const workersCollectionRef = await addDoc(collection(db, 'workers'), {
        name,
        description,
        preferredShift,
        maxDifficulty,
        gender,
      });
      console.log('Work written with ID: ', workersCollectionRef.id);
      push('/workers');
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
            <FormControl.Label mb='1'>Worker Name?</FormControl.Label>
            <Input placeholder='Title' borderRadius={9} onChangeText={(text) => setName(text)} />
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
            <FormControl.Label mb='1'>Gender?</FormControl.Label>
            <Radio.Group
              nativeID='patani'
              name='gender'
              value={gender}
              onChange={(value) => setGender(value)}
              colorScheme='green'
            >
              <HStack space='3'>
                <Radio value='m'>Male</Radio>
                <Radio value='f'>Female</Radio>
              </HStack>
            </Radio.Group>
          </FormControl>
          <FormControl>
            <FormControl.Label mb='1'>Preferred Shift?</FormControl.Label>
            <Checkbox.Group
              onChange={setPreferredShift}
              value={preferredShift}
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
              name='maxDifficulty'
              value={maxDifficulty}
              onChange={(nextValue) => setMaxDifficulty(nextValue)}
              accessibilityLabel='choose max difficulty'
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
              I agree to add worker terms and conditions.
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
