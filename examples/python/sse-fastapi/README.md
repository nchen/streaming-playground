# SSE FastAPI Example

A minimal example demonstrating Server-Sent Events (SSE) implementation using FastAPI. The server pushes current time to clients every second.

## Requirements

- Python 3.7+
- FastAPI
- Uvicorn
- Jinja2

## Installation

Install required packages:
```bash
pip install fastapi uvicorn jinja2
```

## Running the Server

Start the server using Python module syntax:
```bash
python -m uvicorn main:app --reload --port 3000
```

## Features

- Real-time server time updates
- Asynchronous streaming response
- Built-in OpenAPI documentation at /docs
- High-performance ASGI server
- Efficient memory usage with generators

## Testing

1. Visit http://localhost:3000 in your browser
2. Watch the server time update every second
3. Inspect the SSE connection in DevTools Network tab

## Project Structure

- `main.py` - FastAPI server implementation
- `templates/index.html` - Frontend page

## Development

The server runs in development mode with hot reload enabled. For production deployment, remove the --reload flag and consider using process managers like Gunicorn.