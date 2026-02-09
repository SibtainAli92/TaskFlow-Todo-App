# Data Model: hackathon-todo

## Overview
This document defines the data model for the hackathon-todo application, including entities, relationships, and validation rules derived from the feature requirements.

## Entities

### User Entity
- **Purpose**: Represents a registered user account with authentication credentials
- **Fields**:
  - `id` (UUID/string): Primary key, unique identifier for the user
  - `email` (string): User's email address, must be unique and valid email format
  - `password_hash` (string): Securely hashed password using bcrypt or similar
  - `created_at` (datetime): Timestamp of account creation (auto-generated)
  - `updated_at` (datetime): Timestamp of last update (auto-generated, updated on changes)

- **Validation Rules**:
  - Email must be in valid email format
  - Email must be unique across all users
  - Email cannot be empty
  - Password hash must exist for active accounts

- **Relationships**:
  - One-to-Many: User has many Tasks (as owner)

### Task Entity
- **Purpose**: Represents a task item owned by a user
- **Fields**:
  - `id` (UUID/string): Primary key, unique identifier for the task
  - `title` (string): Non-empty task title, maximum length 255 characters
  - `description` (string, nullable): Optional task description, maximum length 1000 characters
  - `completed` (boolean): Flag indicating completion status, default false
  - `owner_id` (foreign key): Reference to the User who owns this task
  - `created_at` (datetime): Timestamp of task creation (auto-generated)
  - `updated_at` (datetime): Timestamp of last update (auto-generated, updated on changes)

- **Validation Rules**:
  - Title must not be empty or whitespace only
  - Title must be less than 255 characters
  - Owner ID must reference an existing User
  - Owner ID cannot be null

- **Relationships**:
  - Many-to-One: Task belongs to one User (as owner)

## Relationships

### User to Tasks (One-to-Many)
- A User MAY own zero or more Tasks
- A Task MUST belong to exactly one User
- When a User is deleted, all associated Tasks MUST be deleted (cascade delete)
- When a Task is deleted, the User remains unchanged

### Task Ownership Constraint
- Every Task MUST have an `owner_id` that references an existing User
- Queries for Tasks MUST be filtered by `owner_id` matching the authenticated user
- Cross-user access to Tasks MUST be prevented at both API and database levels

## State Transitions

### Task State Transitions
- **Creation**: New task is created with `completed = false`
- **Update**: Task properties (title, description) can be modified by owner
- **Toggle Completion**: `completed` status can be toggled by owner (true ↔ false)
- **Deletion**: Task is permanently removed, accessible only by owner until deletion

### User Account States
- **Active**: User account exists and can access the system
- **Pending**: Not applicable for this phase (no email verification required)

## Indexing Strategy

### User Entity Indexes
- Primary Key Index on `id` (automatically created)
- Unique Index on `email` (enforces uniqueness constraint, speeds up login)

### Task Entity Indexes
- Primary Key Index on `id` (automatically created)
- Foreign Key Index on `owner_id` (speeds up user-specific queries)
- Composite Index on (`owner_id`, `created_at`) (optimizes user task listing by creation date)
- Index on `completed` (optimizes queries for completed/incomplete tasks if needed)

## Business Logic Constraints

### User Isolation
- Users can only access their own tasks
- API endpoints MUST filter tasks by authenticated user's ID
- Database queries MUST include owner filter to prevent unauthorized access
- No mechanism should allow cross-user task access

### Data Integrity
- Referential integrity: Task `owner_id` must reference an existing User
- Not-null constraints: Critical fields (title, owner_id) cannot be null
- Length constraints: Prevent extremely long values that could cause performance issues

### Access Control
- Authentication required for all task operations
- Authorization based on task ownership
- Proper HTTP status codes for access violations (401, 403, 404)

## API Implications

### Query Patterns
- Most common: Retrieve all tasks for a specific user
- Secondary: Retrieve specific task by ID with ownership validation
- Less common: Filter tasks by completion status for a specific user

### Performance Considerations
- Indexes support efficient user-specific queries
- Foreign key constraints maintain data integrity
- Cascade deletes prevent orphaned records

## Extension Points

### Future Schema Extensions
- Additional task attributes (due_date, priority, tags) can be added without breaking changes
- Task categories or projects could be implemented with additional relationships
- Collaborative features could be added with appropriate permissions schema

### Audit Trail Potential
- created_at and updated_at timestamps provide basic audit capability
- Additional audit fields could be added in future phases if needed

## Security Considerations

### Data Exposure Prevention
- Database queries MUST filter by owner_id to prevent data leakage
- API responses MUST only include user's own tasks
- Direct database access (if needed for admin functions) MUST still respect ownership

### Authentication Integration
- User identity from JWT MUST be used for ownership validation
- Never trust user_id from request body or URL without JWT validation
- Database-level constraints provide backup protection against application logic errors

## Validation Summary

### At Creation
- User: Email format validation, uniqueness check
- Task: Title non-empty, owner_id references valid user

### At Update
- User: Email uniqueness maintained if changed
- Task: Ownership validation, title length limits

### At Access
- User: JWT validation, user existence check
- Task: Ownership validation (authenticated user matches owner_id)