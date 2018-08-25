import { Color, Stroke2d } from '../types';

export const color2string = ([r, g, b, a]: Color) =>
  a == null
    ? `rgb(${r}, ${g}, ${b})`
    : `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;

export const drawStroke = (
  ctx: CanvasRenderingContext2D,
  [[x, y], radius, color]: Stroke2d
) => {
  ctx.fillStyle = color2string(color);
  ctx.fillRect(
    Math.round(x - radius),
    Math.round(y - radius),
    Math.round(radius * 2),
    Math.round(radius * 2)
  );
};
