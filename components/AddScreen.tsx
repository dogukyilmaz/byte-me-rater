import React from 'react';
import { StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
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
} from 'native-base';

type AddScreenProps = {
  type: 'work' | 'worker';
};

export default function AddScreen({ type }: AddScreenProps) {
  return (
    <Box p='8'>
      <VStack space='5'>
        <FormControl>
          <FormControl.Label mb='3'>What's your event called?</FormControl.Label>
          <Input placeholder="Event's Name" />
        </FormControl>
        <FormControl>
          <FormControl.Label mb='3'>When is your Event?</FormControl.Label>
          <Radio.Group nativeID='patani' name='day_night'>
            <VStack space='3'>
              <Radio value='day'>Day</Radio>
              <Radio value='night'>Night</Radio>
            </VStack>
          </Radio.Group>
        </FormControl>
        <Divider />
        <Checkbox size='sm' value='tnc' justifyContent='center' mb='4'>
          I agree to Terms and conditions
        </Checkbox>
      </VStack>
      <Button mt='2' endIcon={<AddIcon size='3' />}>
        Create Event
      </Button>
    </Box>
  );
}

const styles = StyleSheet.create({});
