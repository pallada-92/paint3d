import { range } from 'ramda';

import { Color, Position2d, Stroke2d } from '../types';

export const random = (min: number, max: number): number =>
  min + Math.random() * (max - min);

export const randomInt = (min: number, max: number): number =>
  Math.floor(random(min, max + 1));

export const randomColor = (): Color => [
  randomInt(0, 255),
  randomInt(0, 255),
  randomInt(0, 255),
  random(0, 1),
];

export const randomPosition2d = (
  width: number,
  height: number
): Position2d => [random(0, width), random(0, height)];

export const randomStrokes2d = (
  width: number,
  height: number,
  count: number
): Stroke2d[] =>
  range(0, count).map(
    () =>
      [
        randomPosition2d(width, height),
        random(2, 10),
        randomColor(),
      ] as Stroke2d
  );
