export type RateWorkSearchParams = {
  title: string;
  description: string;
  worker: string;
};

export type RateWorkerSearchParams = {
  name: string;
  description: string;
  maxDifficulty: string;
  rating: string;
  gender: Gender;
};

export type SelectWorker = {
  id: string;
  name: string;
};

export type Shift = 'day' | 'night';
export type Gender = 'm' | 'f';

export type Work = {
  id: string;
  title: string;
  description: string;
  worker: string | null;
  shift: Shift;
  difficulty: number;
  rating: number;
};

export type Worker = {
  id: string;
  name: string;
  description: string;
  gender: Gender;
  maxDifficulty: number;
  preferredShift: Shift[];
  rating: number;
};
