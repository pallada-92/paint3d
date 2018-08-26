import { range } from 'ramda';

import {
  Color,
  Position2d,
  Position3d,
  Shape,
  Stroke2d,
  Stroke3d,
} from '../types';

export const random = (min: number, max: number): number =>
  min + Math.random() * (max - min);

export const randomInt = (min: number, max: number): number =>
  Math.floor(random(min, max + 1));

export const randomColor = (): Color => [
  randomInt(0, 255),
  randomInt(0, 255),
  randomInt(0, 255),
  random(1, 1),
];

export const randomPosition2d = (
  width: number,
  height: number
): Position2d => [random(0, width), random(0, height)];

export const randomPosition3d = (
  width: number,
  height: number,
  depth: number
): Position3d => [random(0, width), random(0, height), random(0, depth)];

export const randomShape = () =>
  [Shape.RECTANGLE, Shape.RECTANGLE_BORDER][randomInt(0, 1)];

export const randomStrokes2d = (
  width: number,
  height: number,
  count: number
): Stroke2d[] =>
  range(0, count).map(
    () =>
      [
        random(0, 1),
        randomPosition2d(width, height),
        random(2, 10),
        randomColor(),
        randomShape(),
      ] as Stroke2d
  );

export const randomStrokes3d = (
  width: number,
  height: number,
  depth: number,
  count: number
): Stroke3d[] =>
  range(0, count).map(
    () =>
      [
        randomPosition3d(width, height, depth),
        random(2, 10),
        randomColor(),
        randomShape(),
      ] as Stroke3d
  );
