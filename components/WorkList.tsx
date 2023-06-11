import {
  Box,
  HStack,
  VStack,
  Spacer,
  Text,
  FlatList,
  MoonIcon,
  SunIcon,
  Center,
  Badge,
  Input,
  Icon,
  FormControl,
  Modal,
  Button,
  IconButton,
  Radio,
  Slider,
  Pressable,
} from 'native-base';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import { useState, useRef } from 'react';
import { Platform } from 'react-native';
import { Link } from 'expo-router';
import { difficultyColorPicker, difficultyTagPicker, ratingColorPicker } from '../utils';
import type { Work } from '../constants/works';

type WorkListProps = {
  data: Work[];
};

const WorkList = ({ data }: WorkListProps) => {
  return (
    <Box flex={1} paddingLeft={4}>
      <Filter />

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Link
            asChild
            href={{
              pathname: `/rate/work/${item.id}`,
              params: {
                title: item.title,
                description: item.description,
                worker: item.worker,
              },
            }}
          >
            <Pressable
              borderBottomWidth='1'
              _dark={{
                borderColor: 'muted.50',
              }}
              borderColor='gray.200'
              pl={['0', '4']}
              pr={['0', '5']}
              mr={4}
              py='3'
            >
              <HStack space={[2, 2]} justifyContent='space-between'>
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
                <VStack space='1'>
                  <HStack alignItems='center'>
                    <Text
                      noOfLines={1}
                      maxW={200}
                      _dark={{
                        color: 'warmGray.50',
                      }}
                      color={item.worker ? 'coolGray.800' : 'red.600'}
                      bold
                    >
                      {item.title}
                    </Text>

                    <Text
                      noOfLines={1}
                      maxW={100}
                      ml={2}
                      _dark={{ color: 'warmGray.50' }}
                      color={item.worker ? 'gray.400' : 'red.600'}
                      fontSize={10}
                    >
                      {item.worker || 'Not assigned yet'}
                    </Text>
                  </HStack>
                  <Text
                    noOfLines={3}
                    maxW={275}
                    fontSize={12}
                    color={item.worker ? 'coolGray.800' : 'red.600'}
                    _dark={{
                      color: 'warmGray.200',
                    }}
                  >
                    {item.description}
                  </Text>
                </VStack>
                <Spacer />
                <VStack>
                  <Box ml='auto'>
                    {item.shift === 'day' ? (
                      <SunIcon size={5} color={item.worker ? 'yellow.400' : 'red.600'} />
                    ) : (
                      <MoonIcon size={5} color={item.worker ? 'coolGray.600' : 'red.600'} />
                    )}
                  </Box>
                  <Spacer />
                  <Badge
                    borderRadius={9}
                    bg={difficultyColorPicker(item.difficulty)}
                    m={0}
                    p={0}
                    px='1'
                    _text={{
                      fontSize: 10,
                      color: item.difficulty > 3 ? 'dark.900' : 'dark.400',
                    }}
                  >
                    {difficultyTagPicker(item.difficulty)}
                  </Badge>
                </VStack>
              </HStack>
            </Pressable>
          </Link>
        )}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
};

export default WorkList;

const Filter = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  return (
    <>
      <HStack space='4' alignItems='center' width={Platform.OS === 'ios' ? '350' : '330'}>
        <VStack w='100%' py='2' space={5} alignSelf='center'>
          <Input
            placeholder='Search'
            variant='filled'
            width='100%'
            borderRadius='10'
            py={Platform.OS === 'ios' ? '2' : '1'}
            px='2'
            InputLeftElement={
              <Icon ml='2' size='4' color='gray.400' as={<Ionicons name='ios-search' />} />
            }
          />
        </VStack>
        <IconButton
          borderRadius={8}
          colorScheme='warmGray'
          size='sm'
          variant='solid'
          _icon={{
            as: AntDesign,
            name: 'filter',
          }}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        />
      </HStack>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        borderRadius={1}
      >
        <Modal.Content borderRadius={12}>
          <Modal.CloseButton />
          <Modal.Header>Filter</Modal.Header>
          <Modal.Body>
            <VStack space='3'>
              <FormControl>
                <FormControl.Label mb='1'>Shift</FormControl.Label>
                <Radio.Group nativeID='patani' name='day_night' colorScheme='gray'>
                  <HStack space='3'>
                    <Radio size='sm' value='day'>
                      Day
                    </Radio>
                    <Radio size='sm' value='night'>
                      Night
                    </Radio>
                  </HStack>
                </Radio.Group>
              </FormControl>
              <FormControl>
                <FormControl.Label mb='1'>Difficulty</FormControl.Label>
                <Radio.Group nativeID='patani' name='difficulty' colorScheme='gray'>
                  <HStack space='3'>
                    <Radio size='sm' value='1'>
                      1
                    </Radio>
                    <Radio size='sm' value='2'>
                      2
                    </Radio>
                    <Radio size='sm' value='3'>
                      3
                    </Radio>
                    <Radio size='sm' value='4'>
                      4
                    </Radio>
                    <Radio size='sm' value='5'>
                      5
                    </Radio>
                  </HStack>
                </Radio.Group>
              </FormControl>
              <FormControl>
                <FormControl.Label mb='1'>Minimum Rating ({rating})</FormControl.Label>
                <Slider
                  value={rating}
                  colorScheme='gray'
                  onChange={(e) => setRating(e)}
                  minValue={0}
                  maxValue={5}
                  step={0.5}
                >
                  <Slider.Track>
                    <Slider.FilledTrack />
                  </Slider.Track>
                  <Slider.Thumb />
                </Slider>
              </FormControl>
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                size='sm'
                variant='ghost'
                colorScheme='gray'
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                Cancel
              </Button>
              <Button
                size='sm'
                colorScheme='gray'
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                Apply
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};
