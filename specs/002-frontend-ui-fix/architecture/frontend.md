# Frontend Architecture Guardrails

## Overview
This specification defines the architectural constraints and guardrails for frontend development to ensure maintainable, scalable, and consistent styling practices.

## Client vs Server Component Boundaries
### Client Components
- Use `'use client'` directive when component uses:
  - useState, useEffect, or other React hooks
  - Browser APIs (localStorage, sessionStorage, etc.)
  - Event handlers with client-side logic
  - Third-party libraries requiring browser environment
- Client components MAY contain styling logic
- Client components MAY use CSS Modules for scoped styles

### Server Components (Default)
- Server components run only on the server
- Server components MAY import and use CSS Modules
- Server components MAY import global CSS
- Server components SHOULD pass styling props to child client components
- Server components MUST NOT access browser-only APIs

## Styling Logic Location
### Allowed Styling Locations
- CSS Modules for component-scoped styles
- Global CSS for application-wide styles
- Tailwind utility classes in JSX
- CSS-in-JS libraries in client components only
- Style props passed from server to client components

### Prohibited Styling Practices
- Inline styles except for dynamic values
- Direct DOM manipulation of styles
- Global style overrides without proper scoping
- Vendor-specific prefixes without autoprefixer
- Hardcoded pixel values without design system alignment

## UI State and Visual Feedback Handling
### State Management
- Use React state for UI state (open/close, active/inactive)
- Use context for shared UI state across components
- Use external state management for complex UI state
- Separate UI state from application/data state

### Visual Feedback Patterns
- Loading states with appropriate spinners or skeletons
- Hover, focus, and active states for interactive elements
- Error states with clear messaging
- Success states with positive reinforcement
- Disabled states with reduced opacity

## CSS Regression Prevention Rules
### Naming Conventions
- Use consistent class naming patterns
- Follow BEM methodology for complex components
- Use semantic class names that describe purpose
- Avoid generic names that could conflict

### Testing Requirements
- Visual regression tests for critical UI components
- Automated accessibility checks
- Cross-browser compatibility testing
- Responsive design testing across breakpoints

### Change Management
- Document significant styling changes
- Review CSS changes in code reviews
- Maintain consistent design system implementation
- Verify responsive behavior before merging
- Test in multiple browsers and devices

### Code Organization
- Organize CSS files by feature or component
- Maintain clear separation between global and component styles
- Use consistent import ordering for styles
- Document custom properties and design tokens
- Keep style-related constants in centralized location