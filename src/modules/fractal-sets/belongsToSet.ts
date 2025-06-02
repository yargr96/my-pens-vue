import { addVectors, type Vector } from '@/utils/vector';

export type BelongsToFractalSet =
  | {
      value: true;
    }
  | {
      value: false;
      stepsCount: number;
    };

const getComplexNumberSquare = ([x, y]: Vector): Vector => [x ** 2 - y ** 2, 2 * x * y];

export const ITERATIONS_COUNT = 100;

export const belongsToSet = (z0: Vector, c: Vector): BelongsToFractalSet => {
  let zLast: Vector = [...z0];

  for (let i = 0; i < ITERATIONS_COUNT; i += 1) {
    const zNew = addVectors(getComplexNumberSquare(zLast), c);

    if (zNew[0] ** 2 + zNew[1] ** 2 > 4) {
      return {
        value: false,
        stepsCount: i,
      };
    }

    zLast = zNew;
  }

  return { value: true };
};
