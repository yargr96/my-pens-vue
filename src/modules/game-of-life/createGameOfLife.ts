import createGrid, { type Grid } from '@/modules/game-of-life/createGrid.ts';
import {
  createFieldMatrix,
  type FieldMatrix,
  type FieldMatrixArray,
} from '@/modules/game-of-life/createFieldMatrix.ts';
import { type FramesPerSecond, getRenderLoop, type RenderLoop } from '@/utils/getRenderLoop.ts';
import { assert } from '@/utils/assert.ts';
import { areSimilarVectors, type Vector } from '@/utils/vector.ts';
import life from '@/modules/game-of-life/figures/life.ts';
import { getTouchCoordinates } from '@/utils/touchCoordinates.ts';
import { isTouchDevice } from '@/utils/isTouchDevice.ts';

type Params = {
  canvas: HTMLCanvasElement;
};

type Config = {
  cellSize: number;
  framesPerSecond: FramesPerSecond;
};

const renderMatrix = (fieldMatrix: FieldMatrixArray, renderCell: (cell: Vector) => void): void => {
  fieldMatrix.forEach((item, x) => {
    item.forEach((isAlive, y) => {
      if (!isAlive) {
        return;
      }

      renderCell([x, y]);
    });
  });
};

export const createGameOfLife = ({ canvas }: Params) => {
  const context = canvas.getContext('2d');
  assert(context);

  let grid: Grid;
  let fieldMatrix: FieldMatrix;
  let renderLoop: RenderLoop;

  const config: Config = {
    cellSize: 20,
    framesPerSecond: 10,
  };

  const render = () => {
    grid = createGrid({
      canvas,
      context,
      cellSize: config.cellSize,
      showGrid: config.cellSize >= 10,
      colors: {
        colorBackground: '#212529',
        colorGrid: '#343a40',
        colorCell: '#0d6efd',
      },
    });

    fieldMatrix = createFieldMatrix({
      gridSize: {
        xCellsCount: grid.gridSizeParams.xCellsCount,
        yCellsCount: grid.gridSizeParams.yCellsCount,
      },
    });

    renderLoop = getRenderLoop(
      () => {
        const isUpdated = fieldMatrix.updateGeneration();
        if (!isUpdated) {
          renderLoop.stop();
        }

        grid.renderGrid();
        renderMatrix(fieldMatrix.getMatrix(), grid.renderCell);
      },
      { framesPerSecond: config.framesPerSecond },
    );

    grid.renderGrid();
    fieldMatrix.putFigureToCenter(life);
    renderMatrix(fieldMatrix.getMatrix(), grid.renderCell);
  };

  render();

  const togglePlay = () => {
    renderLoop.toggle();
  };

  const clear = () => {
    renderLoop.stop();
    fieldMatrix.setEmptyMatrix();
    grid.renderGrid();
  };

  const randomFill = () => {
    grid.renderGrid();
    fieldMatrix.randomFill();
    renderMatrix(fieldMatrix.getMatrix(), grid.renderCell);
  };

  const setSize = (size: number): void => {
    if (config.cellSize === size) {
      return;
    }

    config.cellSize = size;
    render();
  };

  const setSpeed = (speed: FramesPerSecond) => {
    config.framesPerSecond = speed;
    renderLoop.setFramesPerSecond(speed);
  };

  let previousCell: Vector | undefined;
  let isMouseDown = false;

  const drawCell = (coordinates: Vector) => {
    const cell = grid.getCellByCoordinates(coordinates);

    if (!cell || (previousCell && areSimilarVectors(cell, previousCell))) {
      return;
    }

    previousCell = cell;
    fieldMatrix.setPoints([cell]);
    grid.renderGrid();
    renderMatrix(fieldMatrix.getMatrix(), grid.renderCell);
  };

  const handleMouseDown = (e: MouseEvent | TouchEvent) => {
    const [offsetX, offsetY] = getTouchCoordinates(e);

    isMouseDown = true;

    renderLoop.stop();
    drawCell([offsetX, offsetY]);
  };

  const handleMouseUp = (): void => {
    isMouseDown = false;
    previousCell = undefined;
  };

  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    const [offsetX, offsetY] = getTouchCoordinates(e);

    if (!isMouseDown) {
      if (previousCell) {
        previousCell = undefined;
      }

      return;
    }

    drawCell([offsetX, offsetY]);
  };

  if (isTouchDevice()) {
    canvas.addEventListener('touchstart', handleMouseDown);
    window.addEventListener('touchend', handleMouseUp);
    canvas.addEventListener('touchmove', handleMouseMove);
  } else {
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mousemove', handleMouseMove);
  }

  const cleanup = () => {
    window.removeEventListener('mouseup', handleMouseUp);
    window.removeEventListener('touchend', handleMouseUp);
  };

  return {
    togglePlay,
    clear,
    randomFill,
    setSize,
    setSpeed,
    cleanup,
  };
};
