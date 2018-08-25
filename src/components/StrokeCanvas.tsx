import * as React from 'react';

import { Stroke2d } from '../types';
import Canvas from './Canvas';
import { drawStroke } from '../utils';

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
