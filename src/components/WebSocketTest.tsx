import * as React from 'react';
import * as io from 'socket.io-client';

interface IProps { }

interface IState {
  data: any[];
}

class WebSocketTest extends React.Component<IProps, IState> {
  state: IState = { data: [] };

  socket: SocketIOClient.Socket;

  componentDidMount() {
    this.socket = io.connect('http://95.179.131.108:5555');
    this.socket.on('set-all', (data: any[]) => {
      this.setState({ data });
    });
    this.socket.on('set-stroke', ([position, stroke]: [number, any]) => {
      this.setState(({ data }) => {
        const newData = data.slice();
        newData[position] = stroke;
        return { data: newData };
      });
    });
  }

  sendStroke = (value: any) => {
    this.socket.emit('stroke', value);
  };

  render = () => (
    <React.Fragment>
      {JSON.stringify(this.state.data)}
      {['A', 'B'].map(letter => (
        <input
          key={letter}
          type="button"
          value={`SEND ${letter}`}
          onClick={() => this.sendStroke(letter)}
        />
      ))}
    </React.Fragment>
  );
}

export default WebSocketTest;
