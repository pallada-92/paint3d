/* tslint:disable:no-bitwise */

import { Position2d } from '../types';

// https://stackoverflow.com/a/42111623
export const mouseOffset = (e: React.MouseEvent): Position2d => {
  const target = e.target as HTMLElement;
  const rect = target.getBoundingClientRect();
  return [e.clientX - rect.left, e.clientY - rect.top];
};

export const isLeftBtnClicked = (e: React.MouseEvent): boolean =>
  Boolean(e.buttons & 1);

export const isRightBtnClicked = (e: React.MouseEvent): boolean =>
  Boolean(e.buttons & 2);
