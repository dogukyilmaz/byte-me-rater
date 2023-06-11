import { DIFFICULTIES, DIFFICULTY_COLORS } from '../constants/difficulty';

export const ratingColorPicker = (rating: number) => {
  if (rating < 1) return '#ff4545';
  if (rating < 2) return '#ffa534';
  if (rating < 3) return '#ffe234';
  if (rating < 4) return '#b7dd29';
  return '#57e32c';
};

export const difficultyColorPicker = (difficulty: number | string) => {
  return DIFFICULTY_COLORS[Number(difficulty) - 1];
};

export const difficultyTagPicker = (difficulty: number | string) => {
  return DIFFICULTIES[Number(difficulty) - 1];
};

export const randomNumber = (min = 1, max = 5) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const getInitials = (fullName: string) => {
  // Test Cases
  // avatarName('QwrqGWE') // QW
  // avatarName('Qwrq GWE') // QG
  // avatarName('Qwrq QWE') // QQ
  // avatarName('Qwrq hWE') // QH
  // avatarName('Qwrq') // QW
  // avatarName('') // ??
  // avatarName() // ??

  const names = fullName?.trim()?.split(' ');
  if (!names.length || !names[0]?.length) return '??';
  else if (names.length === 1)
    return `${names[0]?.[0]?.toUpperCase()}${names[0]?.[1]?.toUpperCase()}`;
  else return `${names[0]?.[0]?.toUpperCase()}${names[names.length - 1]?.[0]?.toUpperCase()}`;
};

export const getStarRatings = (rating: number) => {
  // Test Cases
  // getStarRating(0.1) ['empty', 'empty', 'empty', 'empty', 'empty']
  // getStarRating(0.5) ['half', 'empty', 'empty', 'empty', 'empty']
  // getStarRating(1.5) ['full', 'half', 'empty', 'empty', 'empty']
  // getStarRating(3.9) ['full', 'full', 'full', 'half', 'empty']
  // getStarRating(4)   ['full', 'full', 'full', 'full', 'empty']
  // getStarRating(4.1) ['full', 'full', 'full', 'full', 'empty']

  return Array.from({ length: 5 }, (_, i) => {
    const precision = rating?.toFixed(1).split('.');
    const [major, minor] = [Number(precision[0]), Number(precision[1])];

    const isFilled = i < major;
    const isHalfFilled = major === i && minor >= 5;

    return isFilled ? 'full' : isHalfFilled ? 'half' : 'empty';
  });
};
