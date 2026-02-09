# UI Components Specification

## Purpose
Define the logical UI components, their auth-aware behavior, and state handling expectations.

## Scope
- Auth-aware UI components
- Task-related UI components
- State handling expectations
- Component responsibilities

## Constraints
- Components MUST NOT contain JSX or styling details
- Components MUST be auth-aware (handle loading, authenticated, unauthorized states)
- Components MUST propagate JWT token to API client on every request
- No implementation details (frameworks, libraries, syntax)

## Auth-Aware Components

### Auth State Component
- **Purpose**: Manage authentication state across the application
- **Responsibilities**:
  - Track current authentication status (unauthenticated, authenticating, authenticated)
  - Store and retrieve JWT token
  - Clear token on logout
  - Provide token to API client for authenticated requests
- **State Requirements**:
  - `isAuthenticated`: Boolean flag
  - `isLoading`: Boolean flag for async auth operations
  - `token`: JWT string or null
- **Behavior**:
  - When `isAuthenticated` is `false`, redirect to signin page for protected routes
  - When token is missing but `isAuthenticated` is `true`, redirect to signin
  - On logout, clear token and redirect to signin

### API Client Component
- **Purpose**: Abstract API communication with automatic JWT attachment
- **Responsibilities**:
  - Attach JWT token to every request via `Authorization: Bearer <token>` header
  - Handle 401 responses by clearing token and redirecting to signin
  - Handle 403 responses by showing unauthorized access error
  - Handle 404 responses by showing not found error
  - Handle other errors with user-friendly messages
- **State Requirements**:
  - Retrieve token from Auth State Component
  - Cache responses where appropriate (optional)
- **Behavior**:
  - Every API call MUST include the JWT token
  - If 401 is received, logout and redirect
  - If 403 is received, show unauthorized error
  - Network errors MUST be surfaced to the user

## Task-Related Components

### Task List Component
- **Purpose**: Display a list of tasks for the authenticated user
- **Responsibilities**:
  - Fetch tasks from API on mount
  - Display task items
  - Show loading state while fetching
  - Show empty state if no tasks exist
  - Show error state if fetch fails
- **State Requirements**:
  - `tasks`: Array of task objects
  - `isLoading`: Boolean flag
  - `error`: Error message or null
- **Behavior**:
  - Trigger fetch when component mounts
  - Re-fetch after create, update, or delete operations
  - Filter tasks by completion status if filtering UI is present

### Task Item Component
- **Purpose**: Display a single task with completion toggle
- **Responsibilities**:
  - Display task title and description
  - Show completion status indicator
  - Allow toggling completion status
  - Navigate to task details if separate view exists
- **State Requirements**:
  - `task`: Task object
  - `isToggling`: Boolean flag during toggle operation
- **Behavior**:
  - Toggle completion status on user interaction
  - Update visual state during and after toggle
  - Disable interaction while `isToggling` is true

### Task Form Component
- **Purpose**: Create or edit a task
- **Responsibilities**:
  - Accept task title input
  - Accept optional description input
  - Validate inputs (title required)
  - Submit create or update request to API
  - Show validation errors
- **State Requirements**:
  - `title`: String value
  - `description`: String value or null
  - `isSubmitting`: Boolean flag
  - `errors`: Validation error messages
- **Behavior**:
  - Prevent submission while `isSubmitting` is true
  - Show validation error if title is empty on submit
  - Clear form after successful create
  - Update form values for edit mode
  - Show success or error feedback after submission

### Task Delete Confirmation Component
- **Purpose**: Confirm task deletion
- **Responsibilities**:
  - Display confirmation prompt
  - Allow cancellation
  - Trigger delete on confirmation
- **State Requirements**:
  - `isOpen`: Boolean flag
  - `isDeleting`: Boolean flag
- **Behavior**:
  - Show confirmation dialog when `isOpen` is true
  - Disable actions while `isDeleting` is true
  - Close after successful delete or cancellation
  - Show error message if delete fails

## State Handling Expectations

### Authentication State
- Authentication state MUST be globally accessible
- Token MUST be persisted (e.g., local storage) for session persistence
- State MUST update immediately on login/logout

### Task State
- Task lists SHOULD be cached locally to reduce redundant API calls
- Task updates MUST trigger revalidation of cached data
- Optimistic updates MAY be applied with rollback on error

### Error State
- Errors MUST be displayed to the user in a clear, non-technical format
- Errors from API (400, 403, 404) MUST be handled by API client
- Network errors MUST be distinguished from validation errors
