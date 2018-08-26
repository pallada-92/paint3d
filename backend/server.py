from flask import Flask
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app)

data_length = 5
data = [None] * data_length
pointer = 0

@socketio.on('connect')
def handle_connect():
    emit('set-all', data)

@socketio.on('stroke')
def handle_message(stroke):
    global pointer
    emit('set-stroke', [pointer, stroke], broadcast=True)
    data[pointer] = stroke
    pointer = (pointer + 1) % data_length

if __name__ == '__main__':
    socketio.run(app)
