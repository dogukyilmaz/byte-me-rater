import { faker } from '@faker-js/faker';
import { randomNumber } from '../utils';

export type Shift = 'day' | 'night';

export type Work = {
  id: string;
  title: string;
  description: string;
  worker: string | null;
  shift: Shift;
  difficulty: number;
  rating: number;
};

export const WORKS: Work[] = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: faker.company.name(),
    description: faker.lorem.sentences(randomNumber()),
    worker: faker.person.fullName(),
    shift: 'day',
    difficulty: 1,
    rating: 1.5,
  },
  {
    id: 'ed8e8f4f-a2b2-4c3c-9d6d-5e5e6f6f7f7',
    title: faker.company.name(),
    description: faker.lorem.sentences(randomNumber()),
    worker: faker.person.fullName(),
    shift: 'night',
    difficulty: 2,
    rating: 4.2,
  },
  {
    id: 'fc9c9d0d-d3e3-4f4f-af1a-7b7c8d8d9d9',
    title: faker.company.name(),
    description: faker.lorem.sentences(randomNumber()),
    worker: faker.person.fullName(),
    shift: 'day',
    difficulty: 3,
    rating: 3.8,
  },
  {
    id: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
    title: faker.company.name(),
    description: faker.lorem.sentences(randomNumber()),
    worker: faker.person.fullName(),
    shift: 'night',
    difficulty: 4,
    rating: 0.7,
  },
  {
    id: 'b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7',
    title: faker.company.name(),
    description: faker.lorem.sentences(randomNumber()),
    worker: faker.person.fullName(),
    shift: 'day',
    difficulty: 5,
    rating: 1.9,
  },
  {
    id: 'g3h4i5j6-k7l8-m9n0-o1p2-q3r4s5t6u7',
    title: faker.company.name(),
    description: faker.lorem.sentences(randomNumber()),
    worker: faker.person.fullName(),
    shift: 'day',
    difficulty: 3,
    rating: 4.1,
  },
  {
    id: 'h4i5j6k7-l8m9-n0o1-p2q3-r4s5t6u7v8w9',
    title: faker.company.name(),
    description: faker.lorem.sentences(randomNumber()),
    worker: faker.person.fullName(),
    shift: 'night',
    difficulty: 2,
    rating: 3.5,
  },
  {
    id: 'i5j6k7l8-m9n0-o1p2-q3r4-s5t6u7v8w9x0y1',
    title: faker.company.name(),
    description: faker.lorem.sentences(randomNumber()),
    worker: faker.person.fullName(),
    shift: 'day',
    difficulty: 4,
    rating: 4.8,
  },
  {
    id: 'j6k7l8m9-n0o1-p2q3-r4s5-t6u7v8w9x0y1z2',
    title: faker.company.name(),
    description: faker.lorem.sentences(randomNumber()),
    worker: faker.person.fullName(),
    shift: 'night',
    difficulty: 1,
    rating: 2.6,
  },
  {
    id: 'k7l8m9n0-o1p2-q3r4s5-t6u7v8w9-x0y1z2a3b4',
    title: faker.company.name(),
    description: faker.lorem.sentences(randomNumber()),
    worker: faker.person.fullName(),
    shift: 'day',
    difficulty: 2,
    rating: 3.2,
  },
  {
    id: 'l8m9n0o1-p2q3r4s5-t6u7v8w9x0-y1z2a3b4c5d6',
    title: faker.company.name(),
    description: faker.lorem.sentences(randomNumber()),
    worker: faker.person.fullName(),
    shift: 'night',
    difficulty: 3,
    rating: 4.4,
  },
  {
    id: 'm9n0o1p2q3-r4s5t6u7v8-w9x0y1z2a3b4c5d6e7',
    title: faker.company.name(),
    description: faker.lorem.sentences(randomNumber()),
    worker: faker.person.fullName(),
    shift: 'day',
    difficulty: 5,
    rating: 4.9,
  },
  {
    id: 'n0o1p2q3r4s5t-6u7v8w9x0y1z-2a3b4c5d6e7f8g9',
    title: faker.company.name(),
    description: faker.lorem.sentences(randomNumber()),
    worker: faker.person.fullName(),
    shift: 'night',
    difficulty: 4,
    rating: 4.3,
  },
  {
    id: 'o1p2q3r4s5t6u7-v8w9x0y1z2a3b4c5d6e7f8g9h0',
    title: faker.company.name(),
    description: faker.lorem.sentences(randomNumber()),
    worker: faker.person.fullName(),
    shift: 'day',
    difficulty: 2,
    rating: 3.7,
  },
  {
    id: 'p2q3r4s5t6u7v8-w9x0y1z2a3b4c5d6e7f8g9h0i1',
    title: faker.company.name(),
    description: faker.lorem.sentences(randomNumber()),
    worker: faker.person.fullName(),
    shift: 'night',
    difficulty: 3,
    rating: 3.9,
  },
];

export const WORKS_COMMENTS = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    comment: faker.lorem.sentences(randomNumber()),
    rating: faker.number.int({ min: 1, max: 5 }),
  },
  {
    id: 'bd7acbea-c1b1-46c2-2rf-3ad53abb28ba',
    comment: faker.lorem.sentences(randomNumber()),
    rating: faker.number.int({ min: 1, max: 5 }),
  },
  {
    id: 'bd7acbea-c1b1-fds2-aed5-3ad53abb28ba',
    comment: faker.lorem.sentences(randomNumber()),
    rating: faker.number.int({ min: 1, max: 5 }),
  },
  {
    id: '3231412-c1b1-qwe1-aed5-3ad53abb28ba',
    comment: faker.lorem.sentences(randomNumber()),
    rating: faker.number.int({ min: 1, max: 5 }),
  },
  {
    id: 'bcvbcb-c1b1-46c2-aed5-3ad53abb28ba',
    comment: faker.lorem.sentences(randomNumber()),
    rating: faker.number.int({ min: 1, max: 5 }),
  },
];