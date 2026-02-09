from fastapi.testclient import TestClient
from src.main import app

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to hackathon-todo API"}

def test_auth_endpoints_exist():
    # Test that auth endpoints are available (will return 422 for missing data, not 404)
    response = client.post("/api/auth/register")
    assert response.status_code in [400, 422]  # Either validation error or bad request

    response = client.post("/api/auth/login")
    assert response.status_code in [400, 422]  # Either validation error or bad request

def test_tasks_endpoints_require_auth():
    # Test that task endpoints require authentication
    response = client.get("/api/tasks")
    assert response.status_code == 401  # Unauthorized

    response = client.post("/api/tasks", json={"title": "Test"})
    assert response.status_code == 401  # Unauthorized