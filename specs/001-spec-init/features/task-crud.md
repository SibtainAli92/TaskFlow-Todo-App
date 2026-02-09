# Feature Specification: Task CRUD Operations

## Purpose
Define the requirements for task creation, reading, updating, deletion, listing, and completion toggling within a multi-user, user-isolated context.

## Scope
- Task creation with title and optional description
- Task listing for authenticated user
- Task retrieval by ID (owner only)
- Task updates (title, description, completion status)
- Task deletion (owner only)
- Completion toggle
- Multi-user behavior (strict ownership enforcement)

## Constraints
- All operations MUST require valid JWT authentication
- Users MUST only access tasks they own
- Task ownership MUST be enforced at API and data layers
- Operation on non-existent task MUST return 404 Not Found
- Attempted access to another user's task MUST return 403 Forbidden

## Functional Requirements

### Create Task (FR-TASK-001)
- Authenticated user MUST be able to create a task
- Task MUST contain a non-empty title
- Task MAY contain an optional description
- Task MUST be created with `completed` status set to `false`
- Task MUST be automatically associated with the authenticated user as owner
- System MUST return the created task including its generated ID

### List Tasks (FR-TASK-002)
- Authenticated user MUST be able to list only their own tasks
- Task list MUST contain all tasks owned by the authenticated user
- Task list MAY be returned in any order (no sort requirement)
- Task list MUST exclude tasks owned by other users
- Empty list MUST be returned if user has no tasks

### Get Task (FR-TASK-003)
- Authenticated user MUST be able to retrieve a specific task by ID
- User MUST be allowed to retrieve only tasks they own
- Attempted retrieval of another user's task MUST be denied
- Non-existent task ID MUST result in 404 Not Found

### Update Task (FR-TASK-004)
- Authenticated user MUST be able to update tasks they own
- User MAY update the task title
- User MAY update the task description
- User MAY toggle the `completed` status
- Attempted update of another user's task MUST be denied
- Partial updates MUST be allowed (no requirement to update all fields)
- Non-existent task ID MUST result in 404 Not Found

### Delete Task (FR-TASK-005)
- Authenticated user MUST be able to delete tasks they own
- Deletion MUST permanently remove the task from the system
- Attempted deletion of another user's task MUST be denied
- Non-existent task ID MUST result in 404 Not Found

### Completion Toggle (FR-TASK-006)
- Authenticated user MUST be able to toggle the `completed` status of their own tasks
- Toggle MUST invert the current status (true → false, false → true)
- Attempted toggle on another user's task MUST be denied
- Non-existent task ID MUST result in 404 Not Found

## Error Cases

### Authentication Errors
- Request without valid JWT MUST return 401 Unauthorized
- Request with expired JWT MUST return 401 Unauthorized

### Authorization Errors
- Attempted access to another user's task MUST return 403 Forbidden

### Not Found Errors
- Operation on non-existent task ID MUST return 404 Not Found

### Validation Errors
- Create task with empty title MUST return 400 Bad Request
- Update with invalid data MUST return 400 Bad Request

## Multi-User Behavior
- Users MUST be completely isolated from each other's tasks
- No API endpoint MUST expose tasks from multiple users
- No cross-user task operations are permitted
