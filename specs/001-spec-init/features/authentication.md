# Feature Specification: Authentication

## Purpose
Define authentication requirements including user signup, signin, JWT token issuance, expiration, logout, and failure handling.

## Scope
- User account creation (signup)
- User session establishment (signin)
- JWT token issuance and attachment
- Token expiration behavior
- Session termination (logout)
- Authentication failure scenarios

## Constraints
- All authentication operations MUST be handled by Better Auth on the frontend
- JWT tokens MUST be issued upon successful signin
- JWT tokens MUST be sent via `Authorization: Bearer <token>` header for API requests
- Token expiration MUST be enforced by the backend
- Shared secret `BETTER_AUTH_SECRET` MUST be used for signing and verification
- No password or secret may be committed to the repository

## Functional Requirements

### Signup (FR-AUTH-001)
- Unauthenticated user MUST be able to create an account
- Account creation MUST require an email address
- Account creation MUST require a password
- Email address MUST be validated for format (not uniqueness at this stage)
- Password MUST meet minimum complexity requirements
- Upon successful signup, user MUST be automatically signed in
- JWT token MUST be issued immediately after signup

### Signin (FR-AUTH-002)
- Registered user MUST be able to sign in with email and password
- Credentials MUST be validated against stored user data
- Upon successful signin, JWT token MUST be issued
- Failed signin with invalid credentials MUST NOT reveal which field was incorrect

### JWT Token Issuance (FR-AUTH-003)
- JWT MUST be issued after successful signup or signin
- Token MUST contain user identification
- Token MUST have an expiration time
- Token MUST be signed using `BETTER_AUTH_SECRET`
- Token MUST be cryptographically secure and tamper-resistant

### Token Expiration (FR-AUTH-004)
- JWT MUST have a defined expiration time
- Expired token MUST be rejected by the backend
- Backend MUST return 401 Unauthorized for expired tokens
- Frontend MUST handle token expiration by prompting re-authentication

### Logout (FR-AUTH-005)
- Authenticated user MUST be able to logout
- Logout MUST invalidate the current session on the frontend
- No server-side token revocation is required at this phase
- After logout, JWT token MUST no longer be sent with API requests

## Auth Failure Scenarios

### Invalid Credentials (FR-AUTH-FAIL-001)
- Signin with invalid email or password MUST fail
- Error message MUST NOT indicate whether email or password was incorrect
- Error MUST be presented to the user without exposing system internals

### Account Not Found (FR-AUTH-FAIL-002)
- Signin with non-existent email address MUST fail
- Error message MUST not reveal that the email does not exist

### Token Absence (FR-AUTH-FAIL-003)
- API request without `Authorization` header MUST return 401 Unauthorized
- API request with `Authorization` header missing token MUST return 401 Unauthorized
- API request with invalid `Authorization` header format MUST return 401 Unauthorized

### Token Invalidity (FR-AUTH-FAIL-004)
- API request with tampered or malformed token MUST return 401 Unauthorized
- API request with token signed with incorrect secret MUST return 401 Unauthorized

### Token Expiration (FR-AUTH-FAIL-005)
- API request with expired token MUST return 401 Unauthorized
- Frontend MUST respond by redirecting to signin or prompting re-authentication

## Security Requirements
- Passwords MUST be hashed using a secure hashing algorithm
- JWT signing secret MUST be configurable via environment variable
- Token expiration time MUST be reasonable (balance security vs usability)
