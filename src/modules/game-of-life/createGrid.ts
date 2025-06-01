import { subtractVector, type Vector } from '@/utils/vector';

type GridColors = {
  colorBackground: string;
  colorGrid: string;
  colorCell: string;
};

type GridParams = {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  cellSize: number;
  showGrid: boolean;
  colors: GridColors;
};

export type GridSize = {
  xCellsCount: number;
  yCellsCount: number;
};

type GridSizeParams = GridSize & {
  gridWidth: number;
  gridHeight: number;
  offsetLeft: number;
  offsetTop: number;
};

type GetCellByCoordinates = (coordinates: Vector) => Vector | undefined;

export type Grid = {
  renderGrid: () => void;
  renderCell: (cell: Vector) => void;
  gridSizeParams: GridSizeParams;
  getCellByCoordinates: GetCellByCoordinates;
};

const getGridSizeParams = (canvas: HTMLCanvasElement, cellSize: number): GridSizeParams => {
  const xCellsCount = Math.floor(canvas.width / cellSize);
  const yCellsCount = Math.floor(canvas.height / cellSize);

  const gridWidth = cellSize * xCellsCount;
  const gridHeight = cellSize * yCellsCount;

  const offsetLeft = (canvas.width - gridWidth) / 2;
  const offsetTop = (canvas.height - gridHeight) / 2;

  return {
    xCellsCount,
    yCellsCount,
    gridWidth,
    gridHeight,
    offsetLeft,
    offsetTop,
  };
};

const getCellPadding = (cellSize: number): number => {
  if (cellSize < 10) {
    return 0;
  }

  if (cellSize < 20) {
    return 1;
  }

  return 2;
};

const useGrid = ({
  canvas,
  context,
  cellSize,
  showGrid,
  colors: { colorBackground, colorGrid, colorCell },
}: GridParams): Grid => {
  const gridSizeParams: GridSizeParams = getGridSizeParams(canvas, cellSize);

  const renderGrid = (): void => {
    context.fillStyle = colorBackground;
    context.fillRect(0, 0, canvas.width, canvas.height);

    if (!showGrid) {
      return;
    }

    const { xCellsCount, yCellsCount, gridWidth, gridHeight, offsetLeft, offsetTop } =
      gridSizeParams;

    context.strokeStyle = colorGrid;

    context.beginPath();

    for (let i = 0; i <= xCellsCount; i += 1) {
      const xCoordinate = cellSize * i;
      context.moveTo(xCoordinate + offsetLeft, offsetTop);
      context.lineTo(xCoordinate + offsetLeft, gridHeight + offsetTop);
    }

    for (let i = 0; i <= yCellsCount; i += 1) {
      const yCoordinate = cellSize * i;
      context.moveTo(offsetLeft, yCoordinate + offsetTop);
      context.lineTo(gridWidth + offsetLeft, yCoordinate + offsetTop);
    }

    context.stroke();
  };

  const renderCell = (cell: Vector): void => {
    const { offsetTop, offsetLeft } = gridSizeParams;

    const cellPadding = getCellPadding(cellSize);
    const cellRenderingSize = cellSize - cellPadding * 2;

    const position: Vector = [
      cell[0] * cellSize + offsetLeft + cellPadding,
      cell[1] * cellSize + offsetTop + cellPadding,
    ];

    context.fillStyle = colorCell;
    context.fillRect(...position, cellRenderingSize, cellRenderingSize);
  };

  const getCellByCoordinates: GetCellByCoordinates = (coordinates) => {
    const coordinatesWithoutOffset = subtractVector(coordinates, [
      gridSizeParams.offsetLeft,
      gridSizeParams.offsetTop,
    ]);

    if (coordinatesWithoutOffset[0] < 0 || coordinatesWithoutOffset[1] < 0) {
      return undefined;
    }

    const cell: Vector = [
      Math.floor(coordinatesWithoutOffset[0] / cellSize),
      Math.floor(coordinatesWithoutOffset[1] / cellSize),
    ];

    if (cell[0] >= gridSizeParams.xCellsCount || cell[1] >= gridSizeParams.yCellsCount) {
      return undefined;
    }

    return cell;
  };

  return {
    gridSizeParams,
    renderGrid,
    renderCell,
    getCellByCoordinates,
  };
};

export default useGrid;
