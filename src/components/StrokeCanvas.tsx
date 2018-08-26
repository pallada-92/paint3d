import * as React from 'react';

import { Stroke2d, Shape } from '../types';
import Canvas from './Canvas';
import { color2string } from '../utils';

const drawStroke = (
  ctx: CanvasRenderingContext2D,
  [order, [x, y], radius, color, shape]: Stroke2d
) => {
  if (shape === Shape.RECTANGLE) {
    ctx.fillStyle = color2string(color);
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  } else if (shape === Shape.RECTANGLE_BORDER) {
    ctx.strokeStyle = color2string(color);
    ctx.lineWidth = radius / 4;
    ctx.strokeRect(x - radius, y - radius, radius * 2, radius * 2);
  }
};

const draw = (ctx: CanvasRenderingContext2D, data: Stroke2d[]) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  data.forEach(stroke => drawStroke(ctx, stroke));
};

export interface IProps {
  width: number;
  height: number;
  data: Stroke2d[];
}

const StrokeCanvas = ({ width, height, data }: IProps) => (
  <Canvas width={width} height={height} draw={draw}>
    {data}
  </Canvas>
);

export default StrokeCanvas;
