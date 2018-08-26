import { Color, Position2d } from '../types';

export const color2string = ([r, g, b, a]: Color) =>
  a == null
    ? `rgb(${r}, ${g}, ${b})`
    : `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;

export const vectorSub = ([x0, y0]: Position2d, [x1, y1]: Position2d) =>
  [x1 - x0, y1 - y0] as Position2d;
