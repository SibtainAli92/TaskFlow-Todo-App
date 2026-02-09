# UI/UX Design System Specification

## Overview
This specification defines the consistent design system for typography, spacing, colors, and UI components to ensure a professional and cohesive user experience.

## Typography Scale
- Base font size: 16px (1rem)
- Heading scale:
  - H1: 2.5rem (40px) - Primary page titles
  - H2: 2rem (32px) - Section headers
  - H3: 1.5rem (24px) - Subsection headers
  - H4: 1.25rem (20px) - Minor headers
  - Body: 1rem (16px) - Main content text
  - Small: 0.875rem (14px) - Secondary text, captions
- Font weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- Line height: 1.5 for body text, 1.25 for headings

## Spacing System
- Base spacing unit: 4px (0.25rem)
- Spacing scale: 0, 0.25rem, 0.5rem, 0.75rem, 1rem, 1.25rem, 1.5rem, 2rem, 2.5rem, 3rem, 4rem
- Use rem units for consistent scaling
- Maintain consistent rhythm with spacing units
- Apply spacing consistently between elements and sections

## Color Palette
- Primary: Blue shades (#3B82F6, #2563EB, #1D4ED8)
- Secondary: Gray shades (#6B7280, #9CA3AF, #D1D5DB)
- Success: Green (#10B981)
- Warning: Amber (#F59E0B)
- Error: Red (#EF4444)
- Background: White (#FFFFFF) and light gray (#F9FAFB)
- Text: Dark gray (#1F2937) for primary, medium gray (#6B7280) for secondary

## Button and Input Consistency
### Buttons
- Primary: Blue background, white text, rounded corners (0.375rem)
- Secondary: White background, blue border and text
- Size variants: Small (0.75rem padding), Medium (1rem padding), Large (1.25rem padding)
- Disabled state: Reduced opacity (0.5)
- Hover states: Slight color variation

### Input Fields
- Border: Light gray (#D1D5DB), 1px width
- Padding: 0.5rem vertical, 0.75rem horizontal
- Rounded corners: 0.375rem
- Focus state: Blue border and ring
- Error state: Red border

## Visual Hierarchy Principles
- Use font size and weight to establish hierarchy
- Apply spacing to separate sections clearly
- Use color to highlight important elements
- Maintain consistent alignment and grouping
- Emphasize primary actions and important information

## Error, Loading, and Empty States
### Error States
- Display error messages in red with icon
- Highlight problematic fields with red border
- Provide clear, actionable error messages
- Show inline validation where appropriate

### Loading States
- Use spinner or skeleton screens for loading content
- Disable interactive elements during loading
- Provide clear loading indicators
- Show progress where operations take time

### Empty States
- Use friendly illustrations or icons
- Provide clear explanation of the empty state
- Include CTAs to help users get started
- Offer contextual help or suggestions