# UI Pages Specification

## Purpose
Define the App Router page structure, protected vs public routes, auth redirect behavior, and page responsibilities.

## Scope
- App Router page structure
- Public routes (no authentication required)
- Protected routes (authentication required)
- Auth redirect behavior
- Page responsibilities and navigation

## Constraints
- Pages MUST NOT contain JSX or implementation details
- Protected pages MUST enforce authentication
- Unauthenticated access to protected pages MUST redirect to signin
- Navigation MUST be defined in terms of user flows

## Page Structure

### Public Routes (No Authentication Required)

#### Signup Page
- **Purpose**: Allow new users to create an account
- **URL**: `/signup`
- **Authentication**: Not required
- **Responsibilities**:
  - Collect user email and password
  - Validate email format and password strength
  - Submit signup request to authentication handler
  - Display success or error messages
  - Redirect to home page after successful signup
- **Navigation**:
  - Link to signin page for existing users

#### Signin Page
- **Purpose**: Allow registered users to sign in
- **URL**: `/signin`
- **Authentication**: Not required
- **Responsibilities**:
  - Collect user email and password
  - Submit signin request to authentication handler
  - Display success or error messages
  - Redirect to home page after successful signin
  - Preserve intended destination for redirect after signin
- **Navigation**:
  - Link to signup page for new users

### Protected Routes (Authentication Required)

#### Home / Dashboard Page
- **Purpose**: Display the user's task list and provide task management actions
- **URL**: `/`
- **Authentication**: Required (redirect to signin if unauthenticated)
- **Responsibilities**:
  - Display list of user's tasks
  - Provide task creation action (open task form)
  - Display task items with completion toggle
  - Provide task edit action for each task
  - Provide task delete action for each task
  - Show loading state while fetching tasks
  - Show empty state if user has no tasks
  - Show error state if task fetch fails
- **Navigation**:
  - Link to signin page (for logout action)
  - Link to task details page (if separate task details view exists)

#### Task Details Page (Optional)
- **Purpose**: Display full details of a single task
- **URL**: `/tasks/{task_id}`
- **Authentication**: Required (redirect to signin if unauthenticated)
- **Responsibilities**:
  - Display task title, description, and completion status
  - Allow editing task details
  - Provide task completion toggle
  - Provide task delete action with confirmation
  - Show loading state while fetching task
  - Show error state if task fetch fails
  - Show 404 state if task not found
  - Show 403 state if user is not task owner
- **Navigation**:
  - Link back to home page
  - Link to signin page (for logout action)

#### Account Settings Page (Optional)
- **Purpose**: Allow user to manage account settings
- **URL**: `/account`
- **Authentication**: Required (redirect to signin if unauthenticated)
- **Responsibilities**:
  - Display user email (read-only)
  - Provide logout action
  - Provide account deletion action (optional, with confirmation)
- **Navigation**:
  - Link back to home page

## Auth Redirect Behavior

### Access to Protected Routes
- If user is unauthenticated, redirect to `/signin`
- Preserve intended destination (return URL) for redirect after signin
- After successful signin, redirect to the originally intended destination

### Access to Public Routes While Authenticated
- Authenticated users accessing `/signup` or `/signin` MUST be redirected to `/`
- No need to sign out when accessing public routes while authenticated

### Logout Behavior
- Logout MUST clear JWT token
- Logout MUST redirect to `/signin`
- Logout MUST NOT preserve intended destination

## Page Responsibilities Summary

| Page | Auth Required | Primary Action | Key Sub-Actions |
|------|---------------|----------------|-----------------|
| Signup | No | Create account | Validate, submit, redirect |
| Signin | No | Sign in | Validate, submit, redirect with return URL |
| Home | Yes | Manage tasks | List, create, edit, delete, toggle |
| Task Details | Yes | View/edit task | Display, edit, delete, toggle |
| Account Settings | Yes | Manage account | Logout, (optional) delete account |

## Navigation Model
- Public pages accessible to anyone
- Protected pages accessible only to authenticated users
- Authenticated users redirected from public auth pages to home
- Unauthenticated users redirected from protected pages to signin
- Return URL preservation for seamless post-signin redirect
