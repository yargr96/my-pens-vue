import { type Vector, addVectors } from '@/utils/vector';

export type Particle = {
  position: Vector;
  velocity: Vector;
  acceleration: Vector;
};

export const getMovedParticle = ({ position, velocity, acceleration }: Particle): Particle => ({
  position: addVectors(position, velocity),
  velocity: addVectors(velocity, acceleration),
  acceleration,
});
