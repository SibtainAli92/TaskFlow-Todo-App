# Page & Layout Structure Specification

## Overview
This specification defines the layout responsibilities and structure patterns for different page types in the application.

## App-Wide Layout Responsibilities
### Root Layout (app/layout.tsx)
- Contains the root HTML structure
- Imports global CSS
- Sets HTML lang attribute
- Wraps all content in html/body tags
- Provides app-wide context providers

### Main Layout Container
- Defines the main content area structure
- Implements responsive grid system
- Manages consistent spacing and margins
- Handles app-wide navigation elements
- Ensures consistent vertical rhythm

## Auth Page Layout Rules
### Login/Signup Pages
- Centered content container
- Maximum width of 400px for forms
- Clear visual separation between form and page
- Simple, focused design without distractions
- Prominent branding and logo placement
- Clear links to related auth actions

### Password Reset Pages
- Similar layout to login/signup
- Clear indication of current step in process
- Simple, distraction-free interface
- Clear messaging about the reset process

## Dashboard / Task Page Layout Rules
### Main Dashboard Layout
- Sidebar navigation (collapsible on mobile)
- Main content area with tasks list
- Header with user controls and search
- Responsive layout that adapts to screen size
- Consistent spacing and alignment

### Task Detail Pages
- Back navigation to dashboard
- Clear task information hierarchy
- Action buttons positioned logically
- Related information grouped appropriately
- Responsive layout for different screen sizes

### Task Creation/Editing
- Form with appropriate spacing
- Clear field labels and instructions
- Validation feedback
- Logical action button placement
- Responsive layout for different screen sizes

## Shared Components and Reuse Strategy
### Navigation Components
- Consistent header across all pages
- Responsive navigation that works on all devices
- Clear active state indicators
- Accessible navigation elements

### UI Components
- Reusable card components for content
- Consistent form elements across the application
- Shared modal and dialog patterns
- Common loading and error state components
- Standardized button and input components

### Layout Utilities
- Grid system utilities for consistent layouts
- Spacing utilities for consistent margins/padding
- Responsive utilities for different screen sizes
- Container components for consistent content width