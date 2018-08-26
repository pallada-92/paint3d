import * as React from 'react';
import * as io from 'socket.io-client';
import { values } from 'ramda';

import { Stroke3d, Shape } from '../types';

interface IArgs {
  addStroke: (stroke: Stroke3d) => void;
  data: Stroke3d[];
}

interface IProps {
  children: (args: IArgs) => any;
}

interface IState {
  version: number;
}

class Synchronizer extends React.Component<IProps, IState> {
  data: Stroke3d[] = [];

  pendingData: { [stroke: string]: any } = {};

  state: IState = { version: -1 };

  socket: SocketIOClient.Socket;

  incVersion = () => {
    this.setState(({ version }) => ({
      version: version + 1,
    }));
  };

  constructor(props: IProps) {
    super(props);

    this.socket = io.connect('http://95.179.131.108:5555');
    this.socket.on('set-all', (data: any[]) => {
      this.data = data;
      this.incVersion();
    });
    this.socket.on('set-stroke', ([position, stroke]: [number, any]) => {
      this.data[position] = stroke;
      const strokeString = JSON.stringify(stroke);
      if (strokeString in this.pendingData) {
        delete this.pendingData[strokeString];
      }
      this.incVersion();
    });
  }

  addStroke = (stroke: Stroke3d) => {
    if (stroke === null) {
      return;
    }
    const [[x, y, z], radius, [r, g, b], shape] = stroke;
    const intStroke = [
      [Math.floor(x), Math.floor(y), Math.floor(z)],
      Math.floor(radius),
      [Math.floor(r), Math.floor(g), Math.floor(b)],
      shape,
    ] as Stroke3d;
    this.socket.emit('stroke', intStroke);
    const strokeString = JSON.stringify(intStroke);
    if (intStroke) {
      intStroke[3] = Shape.RECTANGLE_BORDER;
    }
    this.pendingData[strokeString] = intStroke;
    this.incVersion();
  };

  componentWillUnmount() {
    this.socket.close();
  }

  getData = () => this.data.concat(values(this.pendingData));

  render() {
    return this.props.children({
      addStroke: this.addStroke,
      data: this.getData(),
    });
  }
}

export default Synchronizer;
