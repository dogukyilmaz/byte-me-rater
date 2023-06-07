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
  Select,
  CheckIcon,
  HStack,
} from 'native-base';
import { View } from '../../components/Themed';
import { WORKERS } from '../../constants/workers';

export default function AddWorkScreen() {
  const [isLoading, setLoading] = useState(false);
  const [worker, setWorker] = useState('');

  return (
    <View style={styles.container}>
      <Box p='8'>
        <VStack space='5'>
          <FormControl>
            <FormControl.Label mb='1'>Work Title?</FormControl.Label>
            <Input placeholder='Title' borderRadius={9} />
          </FormControl>
          <FormControl>
            <FormControl.Label mb='1'>Work Description?</FormControl.Label>
            <Input placeholder='Description' borderRadius={9} />
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
              {WORKERS.map((worker) => (
                <Select.Item key={worker.id} label={worker.name} value={worker.id.toString()} />
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormControl.Label mb='1'>Shift?</FormControl.Label>
            <Radio.Group
              nativeID='patani'
              name='day_night'
              defaultValue='day'
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
              nativeID='patani'
              name='difficulty'
              defaultValue='1'
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
            setTimeout(() => {
              setLoading(false);
            }, 2000);
          }}
        >
          Create Work
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
