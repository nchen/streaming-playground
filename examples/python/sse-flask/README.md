# SSE Flask Example

A minimal example demonstrating Server-Sent Events (SSE) implementation using Flask. The server pushes current time to clients every second.

## Requirements

- Python 3.x
- Flask

## Installation

```bash
pip install flask
```

## Running the Server

```bash
python main.py
```

## Testing

1. Open your browser and visit http://localhost:3000
2. You'll see the server time updating automatically every second
3. Check the Network tab in browser DevTools to observe the SSE connection details

## Project Structure

- `main.py` - Flask server implementation
- `templates/index.html` - Frontend page
```

Let me update the Python code as well:

```python:examples/python/sse-flask/main.py
from flask import Flask, Response, render_template
from datetime import datetime
import time

app = Flask(__name__)

@app.route('/')
def index():
    """Serve the index page"""
    return render_template('index.html')

@app.route('/streaming')
def streaming():
    """SSE endpoint that streams the current time"""
    def generate():
        while True:
            current_time = datetime.now().strftime('%H:%M:%S')
            yield f"data: {current_time}\n\n"
            time.sleep(1)
    
    return Response(generate(), mimetype='text/event-stream')

if __name__ == '__main__':
    app.run(debug=True, port=3000)
```

```html:examples/python/sse-flask/templates/index.html
<!DOCTYPE html>
<html>
<head>
    <title>SSE Flask Demo</title>
</head>
<body>
    <h1>Server-Sent Events Demo</h1>
    <div id="time"></div>

    <script>
        // Create an EventSource instance to connect to the streaming endpoint
        const evtSource = new EventSource('/streaming');
        const timeDiv = document.getElementById('time');
        
        // Handle incoming messages
        evtSource.onmessage = function(event) {
            timeDiv.textContent = event.data;
        };
        
        // Handle connection errors
        evtSource.onerror = function(err) {
            console.error("EventSource failed:", err);
        };
    </script>
</body>
</html>