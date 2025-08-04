from flask import Flask, Response, render_template
from datetime import datetime
import time

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/streaming')
def streaming():
    def generate():
        while True:
            current_time = datetime.now().strftime('%H:%M:%S')
            yield f"data: {current_time}\n\n"
            time.sleep(1)
    
    return Response(generate(), mimetype='text/event-stream')

if __name__ == '__main__':
    app.run(debug=True, port=3000)