import { useState } from 'react';
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
  HStack,
} from 'native-base';
import { View } from '../../components/Themed';

export default function AddWorkerScreen() {
  const [isLoading, setLoading] = useState(false);
  const [groupValues, setGroupValues] = useState(['day', 'night']);

  return (
    <View style={styles.container}>
      <Box p='8'>
        <VStack space='5'>
          <FormControl>
            <FormControl.Label mb='1'>Worker Name?</FormControl.Label>
            <Input placeholder='Title' borderRadius={9} />
          </FormControl>
          <FormControl>
            <FormControl.Label mb='1'>Worker Description?</FormControl.Label>
            <Input placeholder='Description' borderRadius={9} />
          </FormControl>
          <FormControl>
            <FormControl.Label mb='1'>Gender?</FormControl.Label>
            <Radio.Group nativeID='patani' name='gender' defaultValue='m' colorScheme='green'>
              <HStack space='3'>
                <Radio value='m'>Male</Radio>
                <Radio value='f'>Female</Radio>
              </HStack>
            </Radio.Group>
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
            <Radio.Group nativeID='patani' name='difficulty' defaultValue='5' colorScheme='green'>
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
            setTimeout(() => {
              setLoading(false);
            }, 2000);
          }}
        >
          Add Worker
        </Button>
      </Box>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
