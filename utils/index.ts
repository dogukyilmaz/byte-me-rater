import { DIFFICULTIES, DIFFICULTY_COLORS } from '../constants/difficulty';

export const ratingColorPicker = (rating: number) => {
  if (rating < 1) return '#ff4545';
  if (rating < 2) return '#ffa534';
  if (rating < 3) return '#ffe234';
  if (rating < 4) return '#b7dd29';
  return '#57e32c';
};

export const difficultyColorPicker = (difficulty: number) => {
  return DIFFICULTY_COLORS[difficulty - 1];
};

export const difficultyTagPicker = (difficulty: number) => {
  return DIFFICULTIES[difficulty - 1];
};

export const randomNumber = (min = 1, max = 5) => {
  return Math.floor(Math.random() * (max - min) + min);
};
