import { assert } from '@/utils/assert.ts'
import type { Particle } from '@/modules/gravity-simulator/particle.ts'
import type { Vector } from '@/utils/vector.ts'
import { COLORS, DEFAULT_CANVAS_SCALE } from '@/constants'
import {
  getVectorAngle,
  multiplyVectorByNumber,
  polarToCartesianVector,
  subtractVector
} from '@/utils/vector.ts'
import { getMovedParticle } from '@/modules/gravity-simulator/particle.ts'
import { getRenderLoop } from '@/utils/getRenderLoop.ts'

type Params = {
  canvas: HTMLCanvasElement;
  scale?: number;
};

const config = {
  speed: 1.4,
  particleSize: 20,
  decelerationCoefficient: 0.99,
  pointsCount: 500,
} as const;

export const createGravitySimulator = ({ canvas, scale = DEFAULT_CANVAS_SCALE }: Params) => {
  const context = canvas.getContext('2d');
  assert(context);

  let particles: Particle[] = [];
  let mouse: Vector = [canvas.width / 2, canvas.height / 2];
  const halfParticleSize = config.particleSize / 2;

  const clear = (): void => {
    context.fillStyle = COLORS.DARK;
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  const isParticleOutOfBounds = (particle: Particle): { x: boolean, y: boolean } => {
    const isOutOfX = (
      particle.position[0] + halfParticleSize >= canvas.width
      && particle.velocity[0] > 0
    ) || (
      particle.position[0] - halfParticleSize < 0
      && particle.velocity[0] < 0
    );

    const isOutOfY = (
      particle.position[1] + halfParticleSize >= canvas.height
      && particle.velocity[1] > 0
    ) || (
      particle.position[1] - halfParticleSize < 0
      && particle.velocity[1] < 0
    );

    return {
      x: isOutOfX,
      y: isOutOfY,
    };
  };

  const getUpdatedParticle = ({ position, velocity }: Particle): Particle => {
    const angle = getVectorAngle(subtractVector(mouse, position));

    const particle = getMovedParticle({
      position,
      acceleration: polarToCartesianVector(config.speed, angle),
      velocity: multiplyVectorByNumber(velocity, config.decelerationCoefficient),
    });

    const isOutOfBounds = isParticleOutOfBounds(particle);

    if (isOutOfBounds.x) {
      particle.velocity[0] *= -1;
    }

    if (isOutOfBounds.y) {
      particle.velocity[1] *= -1;
    }

    return particle;
  };

  const updateParticles = (): void => {
    particles = particles.map(getUpdatedParticle);
  };

  const setupParticles = (count: number): void => {
    particles = [];

    for (let i = 0; i < count; i += 1) {
      particles.push({
        position: [canvas.width * Math.random(), canvas.height * Math.random()],
        velocity: [Math.random() * 10 - 5, Math.random() * 10 - 5],
        acceleration: [0, 0],
      });
    }
  };
  const { run, stop } = getRenderLoop(() => {
    clear();
    updateParticles();

    context.fillStyle = COLORS.LIGHT;
    particles.forEach(({ position: [x, y] }) => {
      context.beginPath();
      context.arc(
        x,
        y,
        halfParticleSize,
        0,
        Math.PI * 2,
      );
      context.fill();
    });
  });

  const render = () => {
    setupParticles(config.pointsCount);

    run();
  };

  const onMouseMove = ({ offsetX, offsetY }: MouseEvent) => {
    mouse = multiplyVectorByNumber([offsetX, offsetY], scale);
  }

  canvas.addEventListener('mousemove', onMouseMove);

  render();

  const cleanup = () => {
    stop();
    canvas.removeEventListener('mousemove', onMouseMove);
  }

  return {
    cleanup,
  }
};
