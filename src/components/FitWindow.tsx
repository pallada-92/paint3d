import * as React from 'react';

interface IProps {
  children: (width: number, height: number) => any;
}

class FitWindow extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    window.addEventListener('resize', this.resize);
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  public resize = () => {
    this.setState({});
  };

  public render = () =>
    this.props.children(window.innerWidth, window.innerHeight);
}

export default FitWindow;
