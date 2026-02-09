# API Contracts: Frontend-Backend Authentication Interface

**Feature**: 001-fix-frontend-auth
**Date**: 2026-01-13

## Overview

This document defines the API contracts between the frontend and backend for authentication-related functionality that needs to be properly implemented to fix current issues.

## Authentication Endpoints

### User Registration
- **Endpoint**: `POST /api/auth/register`
- **Purpose**: Register a new user account
- **Request Headers**:
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securePassword123",
    "confirmPassword": "securePassword123"
  }
  ```
- **Success Response**: `201 Created`
- **Error Responses**:
  - `400 Bad Request` - Invalid input
  - `409 Conflict` - User already exists

### User Login
- **Endpoint**: `POST /api/auth/login`
- **Purpose**: Authenticate user and return JWT token
- **Request Headers**:
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securePassword123"
  }
  ```
- **Success Response**: `200 OK`
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "email": "user@example.com"
    }
  }
  ```
- **Error Responses**:
  - `400 Bad Request` - Invalid input
  - `401 Unauthorized` - Invalid credentials

### User Logout
- **Endpoint**: `POST /api/auth/logout`
- **Purpose**: Log out user and invalidate session
- **Request Headers**:
  - `Authorization: Bearer {token}`
- **Success Response**: `200 OK`
- **Error Responses**:
  - `401 Unauthorized` - Invalid or expired token

## Protected Endpoints

### Get User Profile
- **Endpoint**: `GET /api/auth/me`
- **Purpose**: Get authenticated user's profile information
- **Request Headers**:
  - `Authorization: Bearer {token}`
- **Success Response**: `200 OK`
  ```json
  {
    "id": "user_id",
    "email": "user@example.com",
    "createdAt": "2023-01-01T00:00:00Z"
  }
  ```
- **Error Responses**:
  - `401 Unauthorized` - Missing or invalid token
  - `403 Forbidden` - Valid token but insufficient permissions

## Frontend-Backend Integration Contract

### JWT Token Transmission
- Frontend must include JWT in `Authorization: Bearer <token>` header for all protected API calls
- Backend will return 401 for missing/invalid tokens
- Backend will return 403 for authenticated users without sufficient permissions

### Error Response Format
The backend will return standardized error responses:
```json
{
  "error": {
    "message": "User-friendly error message",
    "code": "ERROR_CODE",
    "details": "Optional additional details"
  }
}
```

### Success Response Format
For successful requests, the backend will return:
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Optional success message"
}
```

## Client Configuration

### Better Auth Integration
- Frontend client must be configured with the backend URL
- JWT tokens must be handled properly between client and server
- Session management must be consistent between frontend and backend

### Frontend Environment Variables
The frontend must have the following environment variables configured:
- `NEXT_PUBLIC_BETTER_AUTH_URL` - Backend API URL for Better Auth integration