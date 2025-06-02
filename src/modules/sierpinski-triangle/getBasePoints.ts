import {
  addVectors,
  CLOCK_ANGLE_OFFSET,
  polarToCartesianVector,
  type Vector
} from '@/utils/vector.ts'

const CIRCLE_OFFSET = 100;

export const getBasePoints = (count: number, centerCoordinate: Vector): Vector[] => {
  const radius: number = Math.min(...centerCoordinate) - CIRCLE_OFFSET;
  const angleStep: number = (2 * Math.PI) / count;

  const basePoints: Vector[] = [];

  for (let i = 0; i < count; i += 1) {
    const angle = angleStep * i + CLOCK_ANGLE_OFFSET;

    basePoints.push(addVectors(polarToCartesianVector(radius, angle), centerCoordinate));
  }

  return basePoints;
};
