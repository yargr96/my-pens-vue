import { getGradient, gradientPoints } from '@/modules/fractal-sets/gradient.ts';
import {
  type BelongsToFractalSet,
  belongsToSet,
  ITERATIONS_COUNT,
} from '@/modules/fractal-sets/belongsToSet.ts';
import { addVectors, areSimilarVectors, subtractVector, type Vector } from '@/utils/vector.ts';
import { assert } from '@/utils/assert.ts';
import { createCoordinates } from '@/modules/fractal-sets/createCoordinates.ts';
import { iterativeRender } from '@/modules/fractal-sets/iterativeRender.ts';
import { isTouchDevice } from '@/utils/isTouchDevice.ts';
import { getTouchCoordinates } from '@/utils/touchCoordinates.ts';

type Params = {
  canvas: HTMLCanvasElement;
};

const gradient = getGradient(gradientPoints, ITERATIONS_COUNT);
const BACKGROUND_COLOR = gradient[0];

const C: Vector = [0.14, 0.6];

const belongsToJuliaSet = (z: Vector): BelongsToFractalSet => belongsToSet(z, C);
const belongsToMandelbrotSet = (c: Vector): BelongsToFractalSet => belongsToSet([0, 0], c);

const PADDING = 20;
const COORDINATE_SQUARE_MATH_SIZE = 4;

export const createFractalSets = ({ canvas }: Params) => {
  const context = canvas.getContext('2d');
  assert(context);

  const coordinatesSquareSize = Math.min(canvas.width, canvas.height) - PADDING * 2;
  const pixelsPerOneMathCoordinateDefault = coordinatesSquareSize / COORDINATE_SQUARE_MATH_SIZE;
  const canvasCenterCoordinates: Vector = [canvas.width / 2, canvas.height / 2];
  const coordinatesCenterDefault: Vector = canvasCenterCoordinates;

  let belongsTo = belongsToMandelbrotSet;

  const coordinates = createCoordinates({
    coordinatesCenter: coordinatesCenterDefault,
    pixelsPerOneMathCoordinate: pixelsPerOneMathCoordinateDefault,
    canvas,
  });

  const render = ({ isLowQuality = false } = {}): void => {
    const renderingBounds = [
      coordinates.getBoundingCanvasCoordinates([-2, 2]),
      coordinates.getBoundingCanvasCoordinates([2, -2]),
    ];

    context.fillStyle = BACKGROUND_COLOR;
    context.fillRect(0, 0, canvas.width, canvas.height);

    iterativeRender({
      start: renderingBounds[0],
      end: renderingBounds[1],
      isLowQuality,
      callback: ([x, y], step) => {
        const mathCoordinates = coordinates.toMathCoordinates([x, y]);
        const belongs = belongsTo(mathCoordinates);

        context.fillStyle = belongs.value ? '#000' : gradient[belongs.stepsCount];
        context.fillRect(x, y, step, step);
      },
    });
  };

  const selectSet = (set: 'mandelbrot' | 'julia') => {
    belongsTo = set === 'mandelbrot' ? belongsToMandelbrotSet : belongsToJuliaSet;
    coordinates.setPixelsPerOneMathCoordinate(pixelsPerOneMathCoordinateDefault);
    coordinates.setCoordinatesCenter(coordinatesCenterDefault);
    render();
  };

  const setZoom = (zoom: number) => {
    const centerAsMathCoords = coordinates.toMathCoordinates(canvasCenterCoordinates);
    coordinates.setPixelsPerOneMathCoordinate(coordinates.getPixelsPerOneMathCoordinate() * zoom);
    coordinates.setCenterToMathCoordinates(centerAsMathCoords);
    render();
  };

  let isMouseDown = false;
  let startMouseCoordinates: Vector;
  let coordinatesChanged = false;
  let imageData: ImageData | undefined;
  let deltaCoordinates: Vector | undefined;

  const handleMouseDown = (e: MouseEvent | TouchEvent) => {
    isMouseDown = true;
    startMouseCoordinates = getTouchCoordinates(e);
  };

  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isMouseDown) {
      return;
    }

    const [offsetX, offsetY] = getTouchCoordinates(e);

    deltaCoordinates = subtractVector([offsetX, offsetY], startMouseCoordinates);
    if (areSimilarVectors(deltaCoordinates, [0, 0])) {
      return;
    }

    coordinatesChanged = true;

    imageData = imageData ?? context.getImageData(0, 0, canvas.width, canvas.height);
    context.fillStyle = BACKGROUND_COLOR;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.putImageData(imageData, ...deltaCoordinates);
  };

  const handleMouseUp = () => {
    if (!isMouseDown) {
      return;
    }

    isMouseDown = false;

    if (coordinatesChanged) {
      coordinates.setCoordinatesCenter(
        addVectors(coordinates.getCoordinatesCenter(), deltaCoordinates!),
      );
      deltaCoordinates = undefined;
      imageData = undefined;
      coordinatesChanged = false;

      render();
    }
  };

  if (isTouchDevice()) {
    canvas.addEventListener('touchstart', handleMouseDown);
    canvas.addEventListener('touchmove', handleMouseMove);
    window.addEventListener('touchend', handleMouseUp);
  } else {
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }

  const cleanup = () => {
    window.removeEventListener('mouseup', handleMouseUp);
    window.removeEventListener('touchend', handleMouseUp);
  };

  render();

  return {
    selectSet,
    setZoom,
    cleanup,
  };
};
