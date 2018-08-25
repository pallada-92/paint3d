export type Color = [number, number, number] | [number, number, number, number];

export type Radius = number;

export type Position2d = [number, number];
export type Position3d = [number, number, number];

export type Stroke2d = [Position2d, Radius, Color];
export type Stroke3d = [Position3d, Radius, Color];
