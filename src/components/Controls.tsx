import { mat4, vec3, vec4 } from 'gl-matrix';
import { clamp, sortBy } from 'ramda';
import * as React from 'react';

import {
  ICameraDirection,
  Position2d,
  Position3d,
  Shape,
  Stroke2d,
  Stroke3d,
} from '../types';

interface IArgs {
  onDraw: (pos: Position2d) => void;
  onRotate: (delta: Position2d) => void;
  onScroll: (delta: number) => void;
  data: Stroke2d[];
}

interface IProps {
  data3d: Stroke3d[];
  width: number;
  height: number;
  children: (args: IArgs) => any;
  addStroke: (stroke: Stroke3d) => void;
}

interface IState {
  target: Position3d;
  direction: ICameraDirection;
}

const FOV = 90;

const NEAR = 10;

const FAR = 10000;

const getInitialTarget = () => [FAR / 2, FAR / 2, FAR / 2] as Position3d;

class Controls extends React.Component<IProps, IState> {
  public state: IState = {
    target: getInitialTarget(),
    direction: {
      alpha: 0,
      beta: 0,
      dist: 5000,
    },
  };

  public getMatrix = () => {
    const {
      target: [tx, ty, tz],
      direction: { alpha, beta, dist },
    } = this.state;
    const { width, height } = this.props;

    const matrix = mat4.create();
    mat4.perspective(
      matrix,
      (FOV / 180) * Math.PI,
      width / height,
      NEAR,
      FAR
    );
    mat4.translate(matrix, matrix, vec3.fromValues(0, 0, -dist));
    mat4.rotateX(matrix, matrix, beta);
    mat4.rotateY(matrix, matrix, alpha);
    mat4.translate(matrix, matrix, vec3.fromValues(-tx, -ty, -tz));

    return matrix;
  };

  public transformData = (data3d: Stroke3d[], matrix: mat4): Stroke2d[] => {
    const vector = vec4.create();
    const res: Stroke2d[] = [];
    const { width, height } = this.props;

    this.props.data3d.forEach(stroke => {
      if (stroke === null) {
        return;
      }
      const [[x, y, z], radius, color, shape] = stroke;
      vec4.set(vector, x, y, z, 1);
      vec4.transformMat4(vector, vector, matrix);
      const rx = vector[0];
      const ry = vector[1];
      const rw = vector[3];
      if (rw < 0) {
        return;
      }
      const u = (rx / rw + 0.5) * width;
      const v = (ry / rw + 0.5) * height;
      const elem = [
        -rw,
        [u, v],
        (1000 * radius) / rw,
        color,
        shape,
      ] as Stroke2d;
      res.push(elem);
    });

    return sortBy(v => v[0], res);
  };

  public getData = () =>
    this.transformData(this.props.data3d, this.getMatrix());

  public onDraw = (pos: Position2d) => {
    const matrix = this.getMatrix();
    const [tx, ty, tz] = this.state.target;
    const v1 = vec4.fromValues(tx, ty, tz, 1);
    vec4.transformMat4(v1, v1, matrix);
    mat4.invert(matrix, matrix);
    const { width, height } = this.props;
    const m = 1;
    const vector = vec4.fromValues(
      (pos[0] / width - 0.5) * m,
      (pos[1] / height - 0.5) * m,
      m * 0.9978,
      m
    );
    vec4.transformMat4(vector, vector, matrix);
    const w = 1 / vector[3];
    const pos3d = [vector[0] * w, vector[1] * w, vector[2] * w] as Position3d;
    this.props.addStroke([pos3d, 10, [255, 0, 0], Shape.RECTANGLE]);
  };

  public onRotate = ([dx, dy]: Position2d) => {
    this.setState(({ direction: { alpha, beta, dist } }: IState) => ({
      direction: {
        alpha: alpha - dx / 100,
        beta: clamp(-Math.PI / 2, Math.PI / 2, beta + dy / 100),
        dist,
      },
    }));
  };

  public onScroll = (delta: number) => {
    if (delta === 0) {
      return;
    }
    this.setState(() => {
      const matrix = this.getMatrix();
      const vector = vec4.fromValues(0, 0, 5000, 5000);
      mat4.invert(matrix, matrix);
      vec4.transformMat4(vector, vector, matrix);
      const c1 = 1 + delta / 100;
      const c2 = (1 - c1) * (1 / vector[3]);
      const [tx, ty, tz] = this.state.target;
      return {
        target: [
          c1 * tx + c2 * vector[0],
          c1 * ty + c2 * vector[1],
          c1 * tz + c2 * vector[2],
        ],
      };
    });
  };

  public render() {
    return this.props.children({
      onDraw: this.onDraw,
      onRotate: this.onRotate,
      onScroll: this.onScroll,
      data: this.getData(),
    });
  }
}

export default Controls;
