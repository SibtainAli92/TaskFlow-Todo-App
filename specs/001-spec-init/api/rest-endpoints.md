# API Specification: REST Endpoints

## Purpose
Define the RESTful API contract for task operations including methods, headers, authentication requirements, and response behavior.

## Scope
- Task management endpoints (create, list, get, update, delete)
- Completion toggle endpoint
- Authentication requirements for all endpoints
- HTTP status code semantics
- Request and response structure (high-level)

## Constraints
- All endpoints MUST require valid JWT authentication
- JWT MUST be provided via `Authorization: Bearer <token>` header
- Missing or invalid token MUST result in 401 Unauthorized
- Cross-user access MUST result in 403 Forbidden
- Non-existent resources MUST result in 404 Not Found
- Invalid requests MUST result in 400 Bad Request

## Endpoint: Create Task

### Request
- **Method**: `POST`
- **Path**: `/api/tasks`
- **Headers**:
  - `Authorization: Bearer <token>` (required)
  - `Content-Type: application/json` (required)
- **Body** (JSON):
  - `title` (string, required): Non-empty task title
  - `description` (string, optional): Task description

### Response (Success)
- **Status**: `201 Created`
- **Body** (JSON):
  - `id` (string): Generated task identifier
  - `title` (string): Task title
  - `description` (string): Task description or null
  - `completed` (boolean): Always `false` for new tasks
  - `owner_id` (string): ID of task owner (authenticated user)
  - `created_at` (string): Timestamp of creation

### Response (Error)
- **Status**: `400 Bad Request` (validation failure)
- **Status**: `401 Unauthorized` (missing/invalid token)

## Endpoint: List Tasks

### Request
- **Method**: `GET`
- **Path**: `/api/tasks`
- **Headers**:
  - `Authorization: Bearer <token>` (required)

### Response (Success)
- **Status**: `200 OK`
- **Body** (JSON):
  - `tasks` (array): List of task objects, each containing:
    - `id` (string)
    - `title` (string)
    - `description` (string or null)
    - `completed` (boolean)
    - `owner_id` (string)
    - `created_at` (string)
    - `updated_at` (string)

### Response (Error)
- **Status**: `401 Unauthorized` (missing/invalid token)
- **Status**: `200 OK` with empty array if user has no tasks

## Endpoint: Get Task

### Request
- **Method**: `GET`
- **Path**: `/api/tasks/{task_id}`
- **Headers**:
  - `Authorization: Bearer <token>` (required)
- **Path Parameters**:
  - `task_id` (string): Task identifier

### Response (Success)
- **Status**: `200 OK`
- **Body** (JSON): Task object with all fields

### Response (Error)
- **Status**: `401 Unauthorized` (missing/invalid token)
- **Status**: `403 Forbidden` (task owned by another user)
- **Status**: `404 Not Found` (task does not exist)

## Endpoint: Update Task

### Request
- **Method**: `PATCH` or `PUT`
- **Path**: `/api/tasks/{task_id}`
- **Headers**:
  - `Authorization: Bearer <token>` (required)
  - `Content-Type: application/json` (required)
- **Path Parameters**:
  - `task_id` (string): Task identifier
- **Body** (JSON):
  - `title` (string, optional): New task title
  - `description` (string, optional): New task description
  - `completed` (boolean, optional): Completion status

### Response (Success)
- **Status**: `200 OK`
- **Body** (JSON): Updated task object with all fields

### Response (Error)
- **Status**: `400 Bad Request` (validation failure)
- **Status**: `401 Unauthorized` (missing/invalid token)
- **Status**: `403 Forbidden` (task owned by another user)
- **Status**: `404 Not Found` (task does not exist)

## Endpoint: Delete Task

### Request
- **Method**: `DELETE`
- **Path**: `/api/tasks/{task_id}`
- **Headers**:
  - `Authorization: Bearer <token>` (required)
- **Path Parameters**:
  - `task_id` (string): Task identifier

### Response (Success)
- **Status**: `204 No Content`

### Response (Error)
- **Status**: `401 Unauthorized` (missing/invalid token)
- **Status**: `403 Forbidden` (task owned by another user)
- **Status**: `404 Not Found` (task does not exist)

## Endpoint: Toggle Task Completion

### Request
- **Method**: `POST` or `PATCH`
- **Path**: `/api/tasks/{task_id}/toggle` or `/api/tasks/{task_id}`
- **Headers**:
  - `Authorization: Bearer <token>` (required)
- **Path Parameters**:
  - `task_id` (string): Task identifier
- **Body** (optional): May include `{ "completed": boolean }`

### Response (Success)
- **Status**: `200 OK`
- **Body** (JSON): Updated task object with inverted `completed` status

### Response (Error)
- **Status**: `401 Unauthorized` (missing/invalid token)
- **Status**: `403 Forbidden` (task owned by another user)
- **Status**: `404 Not Found` (task does not exist)

## General Response Format

### Error Response Body (JSON)
```json
{
  "error": {
    "code": "string",
    "message": "human-readable error message"
  }
}
```

## HTTP Status Code Semantics
- `200 OK`: Successful operation with data response
- `201 Created`: Resource successfully created
- `204 No Content`: Successful operation with no response body
- `400 Bad Request`: Invalid request data or format
- `401 Unauthorized`: Authentication missing or invalid
- `403 Forbidden`: Authenticated but unauthorized access
- `404 Not Found`: Resource does not exist
