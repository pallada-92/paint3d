export type Color = [number, number, number] | [number, number, number, number];

export type Radius = number;

export type Order = number;
export type Position2d = [number, number];
export type Position3d = [number, number, number];

export type Stroke2d = [Order, Position2d, Radius, Color];
export type Stroke3d = [Position3d, Radius, Color];

export type CameraDirection = {
  alpha: number,
  beta: number,
  dist: number,
};
