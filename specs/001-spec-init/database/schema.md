# Database Schema Specification

## Purpose
Define the data model for users and tasks including relationships, ownership constraints, and indexing expectations.

## Scope
- User entity definition
- Task entity definition
- Relationship between users and tasks
- Ownership constraints
- Indexing requirements
- No SQL syntax

## Constraints
- Tasks MUST be owned by exactly one user
- Users MAY own zero or more tasks
- User isolation MUST be enforced at data level
- No cross-user task access via foreign keys or relationships

## Entities

### User
- **Purpose**: Represents a user account with authentication credentials
- **Attributes**:
  - `id` (unique identifier): Primary key for user
  - `email` (string, unique): User's email address
  - `password_hash` (string): Securely hashed password
  - `created_at` (timestamp): Account creation timestamp
  - `updated_at` (timestamp): Last update timestamp

### Task
- **Purpose**: Represents a task item owned by a user
- **Attributes**:
  - `id` (unique identifier): Primary key for task
  - `title` (string): Non-empty task title
  - `description` (string, nullable): Optional task description
  - `completed` (boolean): Completion status flag
  - `owner_id` (foreign key): Reference to owning User
  - `created_at` (timestamp): Task creation timestamp
  - `updated_at` (timestamp): Last update timestamp

## Relationships

### User to Tasks (One-to-Many)
- A User MAY have zero or more Tasks
- A Task MUST belong to exactly one User
- Deleting a User MUST delete all associated Tasks (cascade delete)

## Ownership Constraints

### Task Ownership
- Every Task MUST have exactly one `owner_id` referencing a User
- `owner_id` MUST NOT be nullable
- `owner_id` MUST reference an existing User ID (foreign key constraint)
- Tasks MUST be queryable only by their owner

### User Isolation
- Queries for Tasks MUST be filtered by `owner_id` matching authenticated user
- No direct or indirect relationship MUST allow access to another user's Tasks
- Task listing MUST be scoped to single user

## Indexing Expectations

### User Entity
- Unique index on `email` for login and uniqueness enforcement
- Primary key index on `id` (automatic)

### Task Entity
- Primary key index on `id` (automatic)
- Composite index on `owner_id` + `created_at` for user task listing performance
- Index on `completed` for filtering by completion status (optional)
- Foreign key index on `owner_id` for join performance

## Data Integrity

### Referential Integrity
- Task `owner_id` MUST reference an existing User
- Attempting to assign a Task to a non-existent User MUST fail
- Deleting a User MUST cascade delete all Tasks owned by that user

### Uniqueness
- User email addresses MUST be unique across all users
- Task IDs MUST be unique across all tasks

## Future Extensibility
- Schema design MUST support future Phase III chatbot features
- Avoid assumptions that would prevent task extensions (e.g., due dates, tags)
- Maintain flexibility for additional task attributes without breaking changes
