import { useState, useRef } from 'react';
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
  Slider,
  Pressable,
  Avatar,
  Checkbox,
} from 'native-base';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { Link } from 'expo-router';
import RatingStars from './RatingStars';
import {
  difficultyColorPicker,
  difficultyTagPicker,
  getInitials,
  ratingColorPicker,
} from '../utils';
import type { Worker } from '../types';

type WorkerListProps = {
  data: Worker[];
};

const WorkerList = ({ data }: WorkerListProps) => {
  return (
    <Box flex={1} paddingLeft={4}>
      <Filter />
  
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Link
            asChild
            href={{
              pathname: `/rate/worker/${item.id}`,
              params: {
                name: item.name || "Doesn't exist",
                description: item.description || "Doesn't exist",
                maxDifficulty: item.maxDifficulty || "Doesn't exist",
                rating: item.rating || 3,
                gender: item.gender || "Doesn't exist",
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
                  background={ratingColorPicker(item.rating || 3)}
                  borderRadius='full'
                  alignItems='center'
                  justifyContent='center'
                  my='auto'
                >
                  <Avatar bg={item.gender === 'f' ? 'red.400' : 'blue.500'}>
                    {getInitials(item.name) || '.'}
                  </Avatar>
                </Center>
                <VStack space='1'>
                  <HStack alignItems='center'>
                    <Text
                      noOfLines={1}
                      maxW={200}
                      _dark={{
                        color: 'warmGray.50',
                      }}
                      color={'coolGray.800'}
                      bold
                    >
                      {item.name || "Doesn't exist"}
                    </Text>
  
                    <Badge
                      borderRadius={9}
                      bg={difficultyColorPicker(item.maxDifficulty || 3)}
                      ml={2}
                      p={0}
                      px='1'
                      _text={{
                        fontSize: 10,
                        color: item.maxDifficulty > 3 ? 'dark.900' : 'dark.400',
                      }}
                    >
                      {difficultyTagPicker(item.maxDifficulty) || '.'}
                    </Badge>
                  </HStack>
                  <RatingStars rating={item.rating || 3} />
                  <Text
                    noOfLines={3}
                    maxW={275}
                    fontSize={12}
                    color={'coolGray.800'}
                    _dark={{
                      color: 'warmGray.200',
                    }}
                  >
                    {item.description || "Doesn't exist"}
                  </Text>
                </VStack>
                <Spacer />
                <VStack>
                  <HStack space='1' ml='auto'>
                    {item.preferredShift?.includes('night') && (
                      <MoonIcon size={5} color={'coolGray.600'} />
                    )}
                    {item.preferredShift?.includes('day') && (
                      <SunIcon size={5} color={'yellow.400'} />
                    )}
                  </HStack>
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

export default WorkerList;

const Filter = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [groupValues, setGroupValues] = useState([]);
  const [genderValues, setGenderValues] = useState([]);
  const [difficultyValues, setDifficultyValues] = useState([]);

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
                <FormControl.Label mb='1'>Preferred Shift</FormControl.Label>
                <Checkbox.Group
                  onChange={setGroupValues}
                  value={groupValues}
                  accessibilityLabel='choose shift'
                >
                  <HStack space='5' alignItems='center'>
                    <Checkbox value='day'>Day</Checkbox>
                    <Checkbox value='night'>Night</Checkbox>
                  </HStack>
                </Checkbox.Group>
              </FormControl>
              <FormControl>
                <FormControl.Label mb='1'>Gender</FormControl.Label>
                <Checkbox.Group
                  onChange={setGenderValues}
                  value={genderValues}
                  accessibilityLabel='choose shift'
                >
                  <HStack space='5' alignItems='center'>
                    <Checkbox value='m'>Male</Checkbox>
                    <Checkbox value='f'>Female</Checkbox>
                  </HStack>
                </Checkbox.Group>
              </FormControl>
              <FormControl>
                <FormControl.Label mb='1'>Difficulty</FormControl.Label>
                <Checkbox.Group
                  colorScheme='gray'
                  onChange={setDifficultyValues}
                  value={difficultyValues}
                >
                  <VStack space='1'>
                    <Checkbox size='sm' value='1'>
                      Easy
                    </Checkbox>
                    <Checkbox size='sm' value='2'>
                      Normal
                    </Checkbox>
                    <Checkbox size='sm' value='3'>
                      Medium
                    </Checkbox>
                    <Checkbox size='sm' value='4'>
                      Hard
                    </Checkbox>
                    <Checkbox size='sm' value='5'>
                      Expert
                    </Checkbox>
                  </VStack>
                </Checkbox.Group>
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
