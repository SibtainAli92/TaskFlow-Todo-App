# Design System Documentation

This document outlines the design system implemented for the hackathon-todo application, following the specifications from the data-model.md.

## Typography Scale

| Size | Value | Usage |
|------|-------|-------|
| H1 | 2.5rem (40px) | Primary page titles |
| H2 | 2rem (32px) | Section headers |
| H3 | 1.5rem (24px) | Subsection headers |
| H4 | 1.25rem (20px) | Minor headers |
| Body | 1rem (16px) | Main content text |
| Small | 0.875rem (14px) | Secondary text, captions |

### Font Weights
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

### Line Heights
- Body text: 1.5
- Headings: 1.25

## Spacing System

Based on 4px base unit (0.25rem):

| Unit | Value | Pixel Equivalent |
|------|-------|------------------|
| 0 | 0 | 0px |
| 1 | 0.25rem | 4px |
| 2 | 0.5rem | 8px |
| 3 | 0.75rem | 12px |
| 4 | 1rem | 16px |
| 5 | 1.25rem | 20px |
| 6 | 1.5rem | 24px |
| 8 | 2rem | 32px |
| 10 | 2.5rem | 40px |
| 12 | 3rem | 48px |
| 16 | 4rem | 64px |

## Color Palette

### Primary Colors
- Primary 500: #3B82F6
- Primary 600: #2563EB
- Primary 700: #1D4ED8

### Secondary Colors
- Secondary 300: #D1D5DB
- Secondary 400: #9CA3AF
- Secondary 500: #6B7280

### Functional Colors
- Success 500: #10B981 (Green)
- Warning 500: #F59E0B (Amber)
- Error 500: #EF4444 (Red)

### Background Colors
- Background Card: #FFFFFF (White)
- Background Light: #F9FAFB
- Background Accent: #F3F4F6

### Text Colors
- Text Dark: #1F2937
- Text Medium: #6B7280
- Text Light: #9CA3AF

## Component Specifications

### Button Component

#### Variants
- **Primary**: For primary actions
- **Secondary**: For secondary actions
- **Tertiary**: For subtle actions
- **Success**: For positive actions
- **Warning**: For cautionary actions
- **Error**: For destructive actions

#### Sizes
- **Small**: 0.25rem 0.5rem padding, 0.875rem text
- **Medium**: 0.5rem 1rem padding, 1rem text
- **Large**: 0.75rem 1.25rem padding, 1.125rem text

#### States
- Default: Normal appearance
- Hover: Enhanced appearance
- Active: Pressed appearance
- Disabled: Reduced opacity
- Loading: With spinner indicator

### Input Field Component

#### Variants
- Text
- Password
- Email
- Select
- Textarea

#### States
- Default: Normal appearance
- Focus: Highlighted border
- Error: Red border
- Disabled: Reduced opacity

#### Padding
- Vertical: 0.5rem
- Horizontal: 0.75rem

### Card Component

#### Variants
- **Default**: Standard card with white background and gray border
- **Elevated**: Card with shadow for emphasis
- **Outlined**: Transparent background with gray border

#### Padding
- Consistent internal spacing (1.5rem)

## Breakpoints

- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px and above
- Large Desktop: 1440px and above

## Border Radius

- Small: 0.25rem (4px)
- Medium: 0.375rem (6px)
- Large: 0.5rem (8px)

## Shadows

- Small: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
- Medium: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
- Large: 0 10px 15px -3px rgba(0, 0, 0, 0.1)

## Usage Guidelines

### CSS Custom Properties
The design system defines CSS custom properties that can be used directly in stylesheets:
- `--color-primary-500`, `--color-primary-600`, etc.
- `--font-size-h1`, `--font-size-h2`, etc.
- `--spacing-1`, `--spacing-2`, etc.

### Tailwind Classes
The design system is mapped to Tailwind classes:
- `text-primary-500`, `text-primary-600`, etc.
- `bg-primary-500`, `bg-primary-600`, etc.
- `border-primary-500`, `border-primary-600`, etc.
- `text-h1`, `text-h2`, etc. (custom size classes)
- `space-1`, `space-2`, etc. (custom spacing classes)

### Component Usage
Always use the standardized components instead of raw HTML elements to ensure consistency:
- Use `<Button />` instead of `<button>`
- Use `<Card />` instead of div with manual styling
- Use `<Input />` instead of raw input elements