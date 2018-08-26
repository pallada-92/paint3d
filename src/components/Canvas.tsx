import * as React from 'react';

interface IProps<Data> {
  width: number;
  height: number;
  draw: (ctx: CanvasRenderingContext2D, data: Data) => void;
  children: Data;
  onMouseDown?: React.MouseEventHandler<HTMLCanvasElement>;
  onMouseMove?: React.MouseEventHandler<HTMLCanvasElement>;
  onMouseUp?: React.MouseEventHandler<HTMLCanvasElement>;
  onContextMenu?: React.MouseEventHandler<HTMLCanvasElement>;
  onWheel?: React.WheelEventHandler<HTMLCanvasElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLCanvasElement>;
  style?: any;
}

class Canvas<Data> extends React.Component<IProps<Data>> {
  public canvas: HTMLCanvasElement;

  public redraw() {
    const ctx = this.canvas.getContext('2d');
    if (ctx) {
      this.props.draw(ctx, this.props.children);
    }
  }

  public updateSize() {
    const {
      canvas,
      props: { width, height },
    } = this;

    // https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
    const dpi = window.devicePixelRatio || 1;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = width * dpi;
    canvas.height = height * dpi;
    const ctx = this.canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpi, dpi);
    }
  }

  public componentDidUpdate(prevProps: IProps<Data>) {
    if (
      prevProps.width !== this.props.width ||
      prevProps.height !== this.props.height
    ) {
      this.updateSize();
    }

    if (prevProps.children !== this.props.children) {
      this.redraw();
    }
  }

  public ref = (canvas: HTMLCanvasElement | null) => {
    if (canvas === null) {
      return;
    }
    this.canvas = canvas;
    this.updateSize();
    this.redraw();
  };

  public render() {
    const { width, height, draw, children, ...rest } = this.props;
    return <canvas ref={this.ref} {...rest} />;
  }
}

export default Canvas;
