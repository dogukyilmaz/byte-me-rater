import { faker } from '@faker-js/faker';
import { Worker } from '../types';

export const WORKERS: Worker[] = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Aafreen Khan',
    gender: 'f',
    maxDifficulty: faker.number.int({ max: 5, min: 1 }),
    preferredShift: ['day', 'night'],
    rating: faker.number.int({ max: 5, min: 1 }),
    description: faker.lorem.sentence(),
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: 'Sujitha Mathur',
    gender: 'm',
    maxDifficulty: faker.number.int({ max: 5, min: 1 }),
    preferredShift: ['night'],
    rating: faker.number.int({ max: 5, min: 1 }),
    description: faker.lorem.sentence(),
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Anci Barroco',
    gender: 'f',
    maxDifficulty: faker.number.int({ max: 5, min: 1 }),
    preferredShift: ['night'],
    rating: faker.number.int({ max: 5, min: 1 }),
    description: faker.lorem.sentence(),
  },
  {
    id: '68694a0f-3da1-431f-bd56-142371e29d72',
    name: 'Aniket Kumar',
    gender: 'm',
    maxDifficulty: faker.number.int({ max: 5, min: 1 }),
    preferredShift: ['day'],
    rating: faker.number.int({ max: 5, min: 1 }),
    description: faker.lorem.sentence(),
  },
  {
    id: '28694a0f-3da1-471f-bd96-142456e29d72',
    name: 'Kiara',
    gender: 'm',
    maxDifficulty: faker.number.int({ max: 5, min: 1 }),
    preferredShift: ['day', 'night'],
    rating: faker.number.int({ max: 5, min: 1 }),
    description: faker.lorem.sentence(),
  },
];
