export type Color =
  |[number, number, number]
  | [number, number, number, number];

export type Radius = number;

export type Order = number;
export type Position2d = [number, number];
export type Position3d = [number, number, number];

export enum Shape {
  RECTANGLE,
  RECTANGLE_BORDER,
}

export type Stroke2d = [Order, Position2d, Radius, Color, Shape];
export type Stroke3d = [Position3d, Radius, Color, Shape] | null;

export interface CameraDirection {
  alpha: number;
  beta: number;
  dist: number;
}
