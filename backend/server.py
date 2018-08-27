import os
from flask import Flask, redirect, send_from_directory
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app)

data_length = int(os.environ.get('BUFFER_SIZE', 10000))
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

@app.route('/')
def root():
    return redirect('/paint3d')

@app.route('/paint3d')
def send_static_index():
    return send_from_directory('../build', 'index.html')

@app.route('/paint3d/<path:path>')
def send_static(path):
    return send_from_directory('../build', path)

if __name__ == '__main__':
    socketio.run(app)
