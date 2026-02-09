# Quickstart Guide: Frontend UI/UX and CSS System Fixes

## Overview
This guide provides a quick reference for implementing the frontend UI/UX and CSS system fixes. Follow these steps to resolve CSS loading issues and establish a consistent, responsive design system.

## Prerequisites
- Node.js and npm/yarn installed
- Next.js 14.0.4+ project with App Router
- Tailwind CSS configured in the project

## Step 1: Fix Global CSS Loading

### Update Root Layout
1. Open `app/layout.tsx`
2. Add CSS import at the top of the file:
```typescript
import './globals.css'
```

### Configure Global Styles
1. Open `app/globals.css`
2. Add Tailwind directives:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Add any custom base styles here */
body {
  /* Your custom body styles */
}
```

## Step 2: Implement Design System

### Typography Scale
Apply the following typography classes in your components:
- H1: `text-4xl` (2.5rem)
- H2: `text-3xl` (2rem)
- H3: `text-2xl` (1.5rem)
- H4: `text-xl` (1.25rem)
- Body: `text-base` (1rem)
- Small: `text-sm` (0.875rem)

### Spacing System
Use Tailwind spacing classes based on the 4px grid:
- `space-x-1`, `space-y-1`: 0.25rem (4px)
- `space-x-2`, `space-y-2`: 0.5rem (8px)
- `space-x-3`, `space-y-3`: 0.75rem (12px)
- `space-x-4`, `space-y-4`: 1rem (16px)
- And so on...

### Color Palette
Use these Tailwind color classes:
- Primary: `text-blue-500`, `bg-blue-500`, `border-blue-500`
- Secondary: `text-gray-500`, `bg-gray-100`
- Success: `text-green-500`, `bg-green-100`
- Warning: `text-amber-500`, `bg-amber-100`
- Error: `text-red-500`, `bg-red-100`

## Step 3: Create Component-Specific Styles

### Using CSS Modules
For component-specific styles:
1. Create `[component-name].module.css` alongside your component
2. Import in your component:
```tsx
import styles from './ComponentName.module.css'
```
3. Apply styles:
```tsx
<div className={styles.container}>...</div>
```

## Step 4: Implement Responsive Design

### Breakpoints
- Mobile: Use default styles (mobile-first)
- Tablet: Use `md:` prefix (768px and above)
- Desktop: Use `lg:` prefix (1024px and above)

### Example Responsive Component
```tsx
<div className="flex flex-col md:flex-row gap-4">
  <div className="w-full md:w-1/2">Content for left side</div>
  <div className="w-full md:w-1/2">Content for right side</div>
</div>
```

## Step 5: Add Common Components

### Button Component
```tsx
// Reusable button component with variants
const Button = ({ variant = 'primary', size = 'medium', children, ...props }) => {
  const baseClasses = 'rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';
  const variantClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-white text-blue-500 border border-blue-500 hover:bg-blue-50',
  };
  const sizeClasses = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

## Step 6: Implement State Handling

### Loading State
```tsx
const [isLoading, setIsLoading] = useState(false);

return (
  <div>
    {isLoading ? (
      <div className="animate-pulse">Loading...</div>
    ) : (
      <div>Your content here</div>
    )}
  </div>
);
```

### Error State
```tsx
const [error, setError] = useState(null);

return (
  <div>
    {error && (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error.message}
      </div>
    )}
    {/* Your content here */}
  </div>
);
```

## Testing Checklist

### Before Deployment
- [ ] CSS loads correctly on all pages
- [ ] No visual regressions on desktop
- [ ] Mobile layout works properly
- [ ] Tablet layout works properly
- [ ] All interactive elements have hover/focus states
- [ ] Forms have proper error states
- [ ] Loading states display correctly
- [ ] Color contrast meets accessibility standards
- [ ] Touch targets are at least 44px on mobile

### Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

## Troubleshooting

### CSS Not Loading
1. Verify `app/layout.tsx` imports the CSS file
2. Check that `app/globals.css` has the Tailwind directives
3. Restart development server after changes

### Responsive Issues
1. Check that Tailwind config is properly set up
2. Verify breakpoints are being applied correctly
3. Test in browser dev tools using device simulation

### Component Styling Issues
1. Verify CSS Modules are being imported correctly
2. Check that class names are being applied properly
3. Look for specificity conflicts