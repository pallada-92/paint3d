import os, sys
from flask import Flask, redirect, send_from_directory
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app)

data_length = int(os.environ.get('BUFFER_SIZE', 5000))
data = [None] * data_length
pointer = 0

def print_char(char):
    print(char, end='')
    sys.stdout.flush()

@socketio.on('connect')
def handle_connect():
    emit('set-all', data)
    print_char('|')

@socketio.on('stroke')
def handle_message(stroke):
    global pointer
    emit('set-stroke', [pointer, stroke], broadcast=True)
    data[pointer] = stroke
    pointer = (pointer + 1) % data_length
    if pointer % 100 == 0:
        print_char('*')

@app.route('/')
def root():
    return redirect('/paint3d')

@app.route('/paint3d')
def send_static_index():
    print_char('0')
    return send_from_directory('../build', 'index.html')

@app.route('/paint3d/<path:path>')
def send_static(path):
    return send_from_directory('../build', path)

if __name__ == '__main__':
    socketio.run(app)
