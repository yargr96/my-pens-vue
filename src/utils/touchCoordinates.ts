import type { Vector } from '@/utils/vector.ts';

export const getTouchCoordinates = (e: MouseEvent | TouchEvent): Vector => {
  if ('offsetX' in e) {
    return [e.offsetX, e.offsetY];
  } else {
    return [e.touches[0].clientX, e.touches[0].clientY];
  }
};
