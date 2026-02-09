# Frontend Styling Specification

## Overview
This specification defines how CSS is loaded, structured, and applied in the Next.js App Router to ensure consistent styling across the application.

## Global CSS Loading
- Global CSS files MUST be imported in the root layout (`app/layout.tsx`)
- Import global CSS file using: `import './globals.css'`
- Global styles apply to all routes in the application
- Global styles should not be removed when navigating between routes (known limitation in Next.js)

## Tailwind CSS Integration
- Tailwind CSS directives MUST be included in the global CSS file:
  - `@tailwind base;` - Base styles for all elements
  - `@tailwind components;` - Component-specific styles
  - `@tailwind utilities;` - Utility classes
- Tailwind configuration file (`tailwind.config.js`) MUST define template paths where Tailwind should scan for utility classes

## CSS Modules Structure
- Component-scoped styles MUST use CSS Modules with `.module.css` extension
- CSS Module files MUST be named as `[component-name].module.css`
- Import CSS Modules as JavaScript objects: `import styles from './Component.module.css'`
- Use class names from imported objects: `className={styles.className}`

## Folder Structure Rules
- Global styles: `app/globals.css`
- Component-specific styles: `app/[component]/[component].module.css`
- Page-specific styles: `app/[page]/[page].module.css`
- Shared component styles: `components/[component]/[component].module.css`

## Global vs Scoped Styles Guidelines
- Use global styles for:
  - Base element resets and normalization
  - Application-wide typography
  - Global color schemes
  - Cross-cutting layout patterns
- Use CSS Modules for:
  - Component-specific styling
  - Page-specific layouts
  - Isolated UI element customization
  - Preventing style conflicts

## Guaranteed CSS Application Rules
- Root layout MUST import global CSS file
- All component styles MUST be imported using CSS Modules pattern
- Critical CSS MUST be loaded synchronously to prevent flash of unstyled content
- CSS imports MUST be placed at the top of component files
- No inline styles SHOULD be used except for dynamic values