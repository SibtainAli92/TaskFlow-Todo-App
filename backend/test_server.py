import sys
import traceback
from src.main import app
import uvicorn

print("Attempting to start the server...")
try:
    # Try to import and initialize everything
    print("App imported successfully")

    # Run the server
    print("Starting server on 127.0.0.1:8000")
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")
except Exception as e:
    print(f"Error occurred: {e}")
    traceback.print_exc()
    sys.exit(1)