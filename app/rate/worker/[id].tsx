import { useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Box, VStack, FormControl, Input, Radio, AddIcon, Button, HStack } from 'native-base';
import { View } from '../../../components/Themed';

export default function AddWorkerScreen() {
  const [isLoading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      <Box p='8'>
        <VStack space='5'>
          <FormControl>
            <FormControl.Label mb='1'>Comment?</FormControl.Label>
            <Input placeholder='Description' borderRadius={9} />
          </FormControl>

          <FormControl>
            <FormControl.Label mb='1'>Rating?</FormControl.Label>
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
