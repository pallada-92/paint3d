import * as React from 'react';

import { Position2d } from '../types';
import { color2string, vectorSub } from '../utils';
import {
  isLeftBtnClicked,
  isRightBtnClicked,
  mouseOffset,
} from '../utils/events';
import Canvas from './Canvas';

export interface IProps {
  width: number;
  height: number;
  onDraw: (pos: Position2d) => void;
  onRotate: (delta: Position2d) => void;
  onScroll: (delta: number) => void;
}

enum CursorShapeEnum {
  NORMAL,
  ROTATING,
  SCROLLING,
}

interface IState {
  mousePos: Position2d | null;
  lastRotatePos: Position2d | null;
  cursorShape: CursorShapeEnum;
}

const drawCursor = (
  ctx: CanvasRenderingContext2D,
  [mousePos, cursorShape]: [Position2d | null, CursorShapeEnum]
) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  if (mousePos === null) { return; }
  const [x, y] = mousePos;
  if (cursorShape === CursorShapeEnum.NORMAL) {
    ctx.strokeStyle = color2string([255, 0, 0]);
    const radius = 6;
    ctx.lineWidth = radius / 4;
    ctx.strokeRect(x - radius, y - radius, 2 * radius, 2 * radius);
  } else if (cursorShape === CursorShapeEnum.ROTATING) {
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2 * Math.PI);
    ctx.stroke();
  } else if (cursorShape === CursorShapeEnum.SCROLLING) {
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x - 4, y - 6);
    ctx.lineTo(x + 4, y - 6);
    ctx.lineTo(x + 8, y + 6);
    ctx.lineTo(x - 8, y + 6);
    ctx.closePath();
    ctx.stroke();
  }
};

class PointerCanvas extends React.Component<IProps, IState> {
  public state: IState = {
    mousePos: null,
    lastRotatePos: null,
    cursorShape: CursorShapeEnum.NORMAL,
  };

  public onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();

    const mousePos = mouseOffset(e);

    if (isLeftBtnClicked(e)) {
      this.props.onDraw(mousePos);
      this.setState({ mousePos, cursorShape: CursorShapeEnum.NORMAL });
    } else if (isRightBtnClicked(e)) {
      this.setState({
        lastRotatePos: mouseOffset(e),
        cursorShape: CursorShapeEnum.ROTATING,
      });
    }
  };

  public onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();

    const mousePos = mouseOffset(e);

    if (isLeftBtnClicked(e)) {
      this.props.onDraw(mousePos);
      this.setState({ mousePos, cursorShape: CursorShapeEnum.NORMAL });
    } else if (isRightBtnClicked(e)) {
      this.setState(({ lastRotatePos }) => {
        if (lastRotatePos !== null) {
          this.props.onRotate(vectorSub(mousePos, lastRotatePos));
        }
        return {
          mousePos,
          lastRotatePos: mousePos,
          cursorShape: CursorShapeEnum.ROTATING,
        };
      });
    } else {
      this.setState({ mousePos, cursorShape: CursorShapeEnum.NORMAL });
    }
  };

  public onMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    this.setState({
      cursorShape: CursorShapeEnum.NORMAL,
      lastRotatePos: null,
    });
  };

  public onContextMenu = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
  };

  public onMouseLeave = (e: React.MouseEvent<HTMLCanvasElement>) => {
    this.setState({
      mousePos: null,
    });
  };

  public onWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    this.setState({
      cursorShape: CursorShapeEnum.SCROLLING,
    });
    this.props.onScroll(e.deltaY);
  };

  public render() {
    const { width, height } = this.props;
    return (
      <Canvas
        width={width}
        height={height}
        draw={drawCursor}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseLeave={this.onMouseLeave}
        onContextMenu={this.onContextMenu}
        onMouseUp={this.onMouseUp}
        onWheel={this.onWheel}
        style={{ cursor: 'none', position: 'absolute', top: 0, left: 0 }}
      >
        {[this.state.mousePos, this.state.cursorShape]}
      </Canvas>
    );
  }
}

export default PointerCanvas;
