import { COLORS } from '@/constants';
import {
  type Vector,
  addVectors,
  getPointBetween,
  polarToCartesianVector,
  CLOCK_ANGLE_OFFSET,
} from '@/utils/vector';
import { getRenderLoop, type RenderLoop } from '@/utils/getRenderLoop';
import { assert } from '@/utils/assert.ts';

type Params = {
  canvas: HTMLCanvasElement;
};

const CIRCLE_OFFSET = 100;

const getBasePoints = (count: number, centerCoordinate: Vector): Vector[] => {
  const radius: number = Math.min(...centerCoordinate) - CIRCLE_OFFSET;
  const angleStep: number = (2 * Math.PI) / count;

  const basePoints: Vector[] = [];

  for (let i = 0; i < count; i += 1) {
    const angle = angleStep * i + CLOCK_ANGLE_OFFSET;

    basePoints.push(addVectors(polarToCartesianVector(radius, angle), centerCoordinate));
  }

  return basePoints;
};

export const createSierpinskiTriangle = ({ canvas }: Params) => {
  const context = canvas.getContext('2d');
  assert(context);

  let basePointsCount = 3;
  const centerCoordinate: Vector = [canvas.width / 2, canvas.height / 2];

  let renderLoop: RenderLoop;

  const render = () => {
    context.fillStyle = COLORS.DARK;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = COLORS.LIGHT;

    const basePoints: Vector[] = getBasePoints(basePointsCount, centerCoordinate);

    basePoints.forEach(([x, y]) => {
      context.fillRect(x, y, 1, 1);
    });

    let lastPoint: Vector = basePoints[0];

    renderLoop = getRenderLoop(() => {
      for (let i = 0; i < 100; i += 1) {
        const nextPointIndex: number = Math.floor(Math.random() * basePoints.length);
        const nextPoint: Vector = basePoints[nextPointIndex];

        const newPoint: Vector = getPointBetween(lastPoint, nextPoint);
        context.fillRect(newPoint[0], newPoint[1], 2, 2);

        lastPoint = newPoint;
      }
    });

    renderLoop.run();
  };

  render();

  const setBasePointsCount = (count: number) => {
    basePointsCount = count;
    render();
  };

  const cleanup = () => {
    renderLoop.stop();
  };

  return {
    setBasePointsCount,
    cleanup,
  };
};
