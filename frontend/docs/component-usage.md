# Component Usage Guide

This guide explains how to use the standardized UI components in the hackathon-todo application.

## Button Component

### Import
```tsx
import { Button } from '../components/ui/button';
```

### Props
- `variant`: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'error'
- `size`: 'small' | 'medium' | 'large'
- `isLoading`: boolean (shows spinner)
- All standard button props

### Examples
```tsx
// Primary button
<Button variant="primary" size="medium">
  Submit
</Button>

// Secondary button with loading state
<Button variant="secondary" size="large" isLoading={true}>
  Processing...
</Button>

// Error button
<Button variant="error" size="small">
  Delete
</Button>
```

## Card Component

### Import
```tsx
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/card';
```

### Props
- `variant`: 'default' | 'elevated' | 'outlined'
- All standard div props

### Examples
```tsx
<Card variant="elevated">
  <CardHeader>
    <h2>Card Title</h2>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button variant="secondary">Action</Button>
  </CardFooter>
</Card>
```

## Input Component

### Import
```tsx
import { Input } from '../components/ui/input';
```

### Props
- `label`: string (optional)
- `error`: string (optional)
- `helperText`: string (optional)
- `required`: boolean
- `as`: 'input' | 'textarea' | 'select' (default: 'input')
- `rows`: number (for textarea)
- `options`: Array<{ value: string; label: string }> (for select)
- All standard input/textarea/select props

### Examples
```tsx
// Text input
<Input
  label="Username"
  placeholder="Enter your username"
  required
/>

// Textarea
<Input
  label="Description"
  as="textarea"
  rows={4}
  placeholder="Describe your task..."
/>

// Select
<Input
  label="Priority"
  as="select"
  options={[
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' }
  ]}
/>
```

## State Handling Components

### Import
```tsx
import { LoadingState, EmptyState, ErrorState, Skeleton } from '../components/ui/state-handling';
```

### LoadingState Props
- `message`: string (default: 'Loading...')
- `size`: 'small' | 'medium' | 'large'

### EmptyState Props
- `message`: string (required)
- `icon`: ReactNode (optional)
- `action`: { text: string; onClick: () => void } (optional)

### ErrorState Props
- `message`: string (required)
- `error`: Error | string (optional)
- `onRetry`: () => void (optional)
- `icon`: ReactNode (optional)

### Skeleton Props
- `count`: number (default: 1)
- `height`: string (default: 'h-4')
- `width`: string (default: 'w-full')
- `className`: string

### Examples
```tsx
// Loading state
<LoadingState message="Fetching tasks..." size="large" />

// Empty state with action
<EmptyState
  message="No tasks found"
  action={{
    text: "Create Task",
    onClick: () => setShowForm(true)
  }}
/>

// Error state with retry
<ErrorState
  message="Failed to load tasks"
  error={errorMessage}
  onRetry={retryLoad}
/>
```

## Best Practices

1. **Consistency**: Always use these standardized components instead of raw HTML elements
2. **Accessibility**: Components are built with accessibility in mind (proper ARIA labels, focus management)
3. **Responsiveness**: All components are responsive by default
4. **Theming**: Components automatically use the design system colors and spacing
5. **Variants**: Choose the appropriate variant based on the importance of the action
   - Primary: Main actions you want users to take
   - Secondary: Less important actions
   - Tertiary: Minimal importance actions
   - Success: Positive actions (save, submit)
   - Warning: Cautionary actions
   - Error: Destructive actions (delete, cancel)

## Styling Classes

The design system provides Tailwind classes that map to the design system:

### Colors
- `text-primary-500`, `text-primary-600`, etc.
- `bg-primary-500`, `bg-primary-600`, etc.
- `border-primary-500`, `border-primary-600`, etc.
- `text-text-dark`, `text-text-medium`, `text-text-light`
- `bg-background`, `bg-background-card`, `bg-background-accent`

### Typography
- `text-h1`, `text-h2`, `text-h3`, `text-h4`
- `text-base`, `text-sm`
- `font-regular`, `font-medium`, `font-semibold`, `font-bold`

### Spacing
- `space-1` through `space-16` (based on 4px increments)
- Standard Tailwind spacing classes also work

### Borders
- `rounded-sm`, `rounded-md`, `rounded-lg` (based on design system)