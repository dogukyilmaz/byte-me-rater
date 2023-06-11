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

import { useState, useRef, useEffect } from 'react';
import { Platform } from 'react-native';
import { Link } from 'expo-router';
import { difficultyColorPicker, difficultyTagPicker, ratingColorPicker } from '../utils';
import type { Work } from '../types';

type WorkListProps = {
  data: Work[];
};
type Filter = {
  shift: string;
  difficulty: string;
  minRating: number;
};

const WorkList = ({ data }: WorkListProps) => {
  const [filtered, setFiltered] = useState<Work[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>({
    shift: '',
    difficulty: '',
    minRating: 0,
  });

  useEffect(() => {
    const d = data.filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(d);
  }, [search, data]);

  const filterData = () => {
    let d = data;
    if (filter.shift) d = d.filter((item) => item.shift === filter.shift);
    if (filter.difficulty)
      d = d.filter((item) => Number(item.difficulty) >= Number(filter.difficulty));
    if (filter.minRating) d = d.filter((item) => item.rating >= filter.minRating);
    setFiltered(d);
  };

  const handleSetFilter = (key: string, value: any) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilter = () => {
    setFilter({
      shift: '',
      difficulty: '',
      minRating: 0,
    });
    setFiltered(data);
    setSearch('');
  };

  return (
    <Box flex={1} paddingLeft={4}>
      <Filter
        filter={filter}
        handleSetFilter={handleSetFilter}
        search={search}
        setSearch={setSearch}
        filterData={filterData}
        clearFilter={clearFilter}
      />

      <FlatList
        refreshing={true}
        data={filtered}
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
                    {item.rating?.toFixed(1)}
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

const Filter = ({
  filter,
  handleSetFilter,
  search,
  setSearch,
  filterData,
  clearFilter,
}: {
  filter: Filter;
  search: string;
  clearFilter: () => void;
  setSearch: (value: string) => void;
  handleSetFilter: (key: string, value: any) => void;
  filterData: () => void;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
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
            value={search}
            onChangeText={(text) => setSearch(text)}
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
                <Radio.Group
                  name='day_night'
                  colorScheme='gray'
                  value={filter.shift}
                  onChange={(nextValue) => handleSetFilter('shift', nextValue)}
                >
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
                <Radio.Group
                  name='difficulty'
                  colorScheme='gray'
                  value={filter.difficulty}
                  onChange={(nextValue) => handleSetFilter('difficulty', nextValue)}
                >
                  <VStack space='2'>
                    <HStack space='3'>
                      <Radio size='sm' value='1'>
                        Easy
                      </Radio>
                      <Radio size='sm' value='2'>
                        Normal
                      </Radio>
                      <Radio size='sm' value='3'>
                        Medium
                      </Radio>
                    </HStack>
                    <HStack space='3'>
                      <Radio size='sm' value='4'>
                        Hard
                      </Radio>
                      <Radio size='sm' value='5'>
                        Expert
                      </Radio>
                    </HStack>
                  </VStack>
                </Radio.Group>
              </FormControl>
              <FormControl>
                <FormControl.Label mb='1'>Minimum Rating ({filter.minRating})</FormControl.Label>
                <Slider
                  value={filter.minRating}
                  colorScheme='gray'
                  onChange={(e) => handleSetFilter('minRating', e)}
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
            <HStack width='100%'>
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
              <Spacer />

              <Button
                size='sm'
                variant='ghost'
                colorScheme='gray'
                onPress={() => {
                  clearFilter();
                  setModalVisible(false);
                }}
              >
                Clear
              </Button>

              <Button
                size='sm'
                colorScheme='gray'
                onPress={() => {
                  filterData();
                  setModalVisible(false);
                }}
              >
                Apply
              </Button>
            </HStack>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};
