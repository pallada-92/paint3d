import * as React from 'react';

import { Stroke3d } from '../types';

interface IArgs {
  addStroke: (stroke: Stroke3d) => void;
  data: Stroke3d[];
}

interface IProps {
  initialData: Stroke3d[];
  children: (args: IArgs) => any;
}

interface IState {
  pointer: number;
}

class Synchronizer extends React.Component<IProps, IState> {
  data: Stroke3d[] = [];

  constructor(props: IProps) {
    super(props);

    this.state = {
      pointer: 0,
    };

    this.data = this.props.initialData;
  }

  addStroke = (stroke: Stroke3d) => {
    this.setState(() => {
      const { pointer } = this.state;
      this.data[pointer] = stroke;
      return {
        pointer: (pointer + 1) % this.data.length,
      };
    });
  };

  render() {
    return this.props.children({
      addStroke: this.addStroke,
      data: this.data,
    });
  }
}

export default Synchronizer;
