import { useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSearchParams } from 'expo-router';
import {
  Box,
  VStack,
  FormControl,
  Radio,
  AddIcon,
  Button,
  HStack,
  Heading,
  TextArea,
  Divider,
  Spacer,
  Text,
  FlatList,
  Center,
  Badge,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { View } from '../../../components/Themed';
import { difficultyColorPicker, difficultyTagPicker, ratingColorPicker } from '../../../utils';
import RatingStars from '../../../components/RatingStars';
import type { RateWorkerSearchParams } from '../../../types';
import { WORKS_COMMENTS } from '../../../constants/works';

export default function RateWorkerScreen() {
  const [isLoading, setLoading] = useState(false);
  const { name, description, maxDifficulty, gender, rating } =
    useSearchParams<RateWorkerSearchParams>();

  return (
    <View style={styles.container}>
      <Box p='4'>
        <Heading mx='auto' size='md' mb='5'>
          {name}
        </Heading>

        <VStack space='3'>
          <FormControl>
            <FormControl.Label mb='1'>Comment</FormControl.Label>
            <TextArea
              autoCompleteType={false}
              placeholder='Write your comment here'
              borderRadius={9}
              height={100}
              numberOfLines={5}
            />
          </FormControl>

          <HStack>
            <FormControl>
              <FormControl.Label mb='1'>Rating</FormControl.Label>
              <Radio.Group nativeID='patani' name='rating' defaultValue='5' colorScheme='green'>
                <HStack space='3'>
                  <Radio value='1'>1</Radio>
                  <Radio value='2'>2</Radio>
                  <Radio value='3'>3</Radio>
                  <Radio value='4'>4</Radio>
                  <Radio value='5'>5</Radio>
                </HStack>
              </Radio.Group>
            </FormControl>

            <Button
              ml='auto'
              variant='solid'
              colorScheme='green'
              mt='5'
              width={100}
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
              Rate
            </Button>
          </HStack>

          <Divider my='2' />
          <VStack space='1'>
            <HStack alignItems='start'>
              <Heading mx='auto' size='xs' color='gray.500'>
                {name} Details
              </Heading>
              <Spacer />
              <Badge
                borderRadius={9}
                bg={difficultyColorPicker(maxDifficulty!)}
                ml={2}
                p={0}
                px='1'
                size='xs'
                _text={{
                  fontSize: 10,
                  color: Number(maxDifficulty) > 3 ? 'dark.900' : 'dark.400',
                }}
              >
                {difficultyTagPicker(maxDifficulty!)}
              </Badge>
            </HStack>
            <HStack>
              <VStack space='1'>
                <RatingStars rating={Number(rating)} size={18} showRating />
                <Text textAlign='justify' fontSize={12} noOfLines={3} maxWidth={300}>
                  {description}
                </Text>
              </VStack>
              <Spacer />
              <Box pt='2'>
                <Ionicons name='ios-person' size={24} color={gender === 'f' ? 'red' : 'blue'} />
              </Box>
            </HStack>
          </VStack>
          <Divider my='2' />
          <VStack>
            <Heading mx='auto' size='xs' mb='5' color='gray.500'>
              Previous Comments
            </Heading>

            <FlatList
              data={WORKS_COMMENTS}
              renderItem={({ item }) => (
                <HStack
                  key={item.id}
                  justifyContent='space-between'
                  borderBottomWidth='1'
                  _dark={{
                    borderColor: 'muted.50',
                  }}
                  borderColor='gray.200'
                  pl={['0', '4']}
                  pr={['0', '5']}
                  py='3'
                >
                  <Text
                    fontSize={12}
                    noOfLines={3}
                    maxW={340}
                    _dark={{
                      color: 'warmGray.200',
                    }}
                  >
                    {item.comment}
                  </Text>
                  <Center
                    background={ratingColorPicker(item.rating)}
                    borderRadius='full'
                    width={10}
                    height={10}
                    alignItems='center'
                    justifyContent='center'
                    my='auto'
                  >
                    <Text fontSize={16} fontWeight={700} color='#FFF'>
                      {item.rating}
                    </Text>
                  </Center>
                </HStack>
              )}
              keyExtractor={(item) => item.id}
            />
          </VStack>
        </VStack>
      </Box>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
