import createGrid, { type Grid } from '@/modules/game-of-life/createGrid.ts';
import {
  createFieldMatrix,
  type FieldMatrix,
  type FieldMatrixArray
} from '@/modules/game-of-life/createFieldMatrix.ts'
import { getRenderLoop, type RenderLoop } from '@/utils/getRenderLoop.ts'
import { assert } from '@/utils/assert.ts'
import type { Vector } from '@/utils/vector.ts'
import life from '@/modules/game-of-life/figures/life.ts'

type Params = {
  canvas: HTMLCanvasElement;
};

const config = {
  cellSize: 20,
  framesPerSecond: 10,
} as const;

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

  let grid: Grid = null;
  let fieldMatrix: FieldMatrix = null;
  let renderLoop: RenderLoop = null;

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

    renderLoop = getRenderLoop(() => {
      const isUpdated = fieldMatrix.updateGeneration();
      if (!isUpdated) {
        renderLoop.stop();
      }

      grid.renderGrid();
      renderMatrix(fieldMatrix.getMatrix(), grid.renderCell);
    }, { framesPerSecond: config.framesPerSecond });

    grid.renderGrid();
    fieldMatrix.putFigureToCenter(life);
    renderMatrix(fieldMatrix.getMatrix(), grid.renderCell);
  };

  render();
};
