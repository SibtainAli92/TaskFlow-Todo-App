# Feature Specification: Comprehensive Frontend Redesign & UI System

**Feature Branch**: `002-frontend-ui-fix`
**Created**: 2026-01-15
**Updated**: 2026-02-07
**Status**: In Progress
**Scope**: Comprehensive frontend redesign including dark mode, landing page, design system overhaul, component library, and animation system

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Experience Modern Landing Page (Priority: P0)

As a first-time visitor, I want to see an engaging landing page with clear value proposition, features, and call-to-action so that I understand what the application offers and am motivated to sign up.

**Why this priority**: The landing page is the first impression and primary conversion point. Without it, users cannot discover or understand the product value.

**Independent Test**: Can be fully tested by accessing the root path (/) and verifying all landing sections render with proper content, animations, and responsive behavior.

**Acceptance Scenarios**:

1. **Given** I am a first-time visitor, **When** I load the homepage, **Then** I see a hero section with headline, description, CTA buttons, and hero image with smooth fade-in animations
2. **Given** I am viewing the landing page, **When** I scroll down, **Then** I see Features, How It Works, Testimonials, and final CTA sections with scroll-triggered animations
3. **Given** I am on the landing page, **When** I click "Get Started", **Then** I am navigated to the signup page
4. **Given** I am on mobile, **When** I view the landing page, **Then** all sections adapt to mobile layout with proper spacing and touch-friendly elements

---

### User Story 2 - Toggle Dark Mode (Priority: P0)

As a user, I want to toggle between light and dark themes so that I can use the application comfortably in different lighting conditions and according to my preference.

**Why this priority**: Dark mode is a critical accessibility and user preference feature. Theme persistence ensures consistent user experience across sessions.

**Independent Test**: Can be fully tested by clicking the theme toggle button and verifying theme changes persist across page reloads and navigation.

**Acceptance Scenarios**:

1. **Given** I am viewing any page, **When** I click the theme toggle button, **Then** the entire interface switches between light and dark mode with smooth transitions
2. **Given** I have selected dark mode, **When** I refresh the page or navigate to another page, **Then** dark mode persists via localStorage
3. **Given** I am using dark mode, **When** I view any component, **Then** all colors, backgrounds, borders, and text adapt appropriately with proper contrast ratios (WCAG AA compliant)
4. **Given** I have no theme preference stored, **When** I first visit the site, **Then** the system respects my OS/browser theme preference (prefers-color-scheme)

---

### User Story 3 - Navigate with Modern Design System (Priority: P0)

As a user, I want to interact with a modern, cohesive design system using Indigo/Pink color palette and Inter font so that I have a premium, professional experience.

**Why this priority**: The design system defines the entire visual identity and user experience. Inconsistent design creates confusion and reduces trust.

**Independent Test**: Can be fully tested by inspecting CSS custom properties, typography, and color usage across all pages and components.

**Acceptance Scenarios**:

1. **Given** I am viewing any page, **When** I inspect the design, **Then** I see consistent use of Indigo (primary) and Pink (accent) colors throughout, replacing all previous blue colors
2. **Given** I am reading text content, **When** I view typography, **Then** all text uses Inter font family with proper font weights (400, 500, 600, 700) and sizes from the type scale
3. **Given** I am interacting with UI elements, **When** I hover or focus on interactive elements, **Then** I see smooth micro-interactions with 60fps performance
4. **Given** I am viewing spacing and layout, **When** I inspect elements, **Then** spacing follows the 4px/8px grid system consistently

---

### User Story 4 - Use Enhanced Dashboard (Priority: P1)

As an authenticated user, I want to access a redesigned dashboard with sidebar navigation and statistics cards so that I can efficiently manage my tasks and see my progress at a glance.

**Why this priority**: The dashboard is the primary workspace. Enhanced UI with stats and better navigation improves productivity and user satisfaction.

**Independent Test**: Can be fully tested by logging in and verifying dashboard layout, sidebar navigation, stats cards, and task list rendering.

**Acceptance Scenarios**:

1. **Given** I am logged in, **When** I access the dashboard, **Then** I see a sidebar with navigation links, user profile section, and theme toggle
2. **Given** I am viewing the dashboard, **When** I look at the main content area, **Then** I see statistics cards showing total tasks, completed tasks, pending tasks, and completion rate
3. **Given** I am on mobile, **When** I view the dashboard, **Then** the sidebar collapses into a hamburger menu with smooth slide-in animation
4. **Given** I am viewing my tasks, **When** I interact with task items, **Then** I see enhanced task cards with priority indicators, due dates, and smooth hover effects

---

### User Story 5 - Experience Smooth Animations (Priority: P1)

As a user, I want to see smooth, performant animations throughout the interface so that the application feels polished and responsive.

**Why this priority**: Animations provide visual feedback, guide attention, and create a premium feel. CSS-only animations ensure 60fps performance without JavaScript overhead.

**Independent Test**: Can be fully tested by interacting with various UI elements and scrolling through pages while monitoring performance metrics.

**Acceptance Scenarios**:

1. **Given** I am scrolling through the landing page, **When** sections come into view, **Then** I see smooth fade-in and slide-up animations triggered by scroll position
2. **Given** I am interacting with buttons, **When** I hover or click, **Then** I see subtle scale, shadow, and color transitions completing in 200-300ms
3. **Given** I am viewing page transitions, **When** I navigate between pages, **Then** content fades in smoothly without layout shifts
4. **Given** I am using the application, **When** I monitor performance, **Then** all animations maintain 60fps with no jank or layout thrashing

---

### User Story 6 - Authenticate with Redesigned Auth Pages (Priority: P1)

As a user, I want to sign up and log in through beautifully designed authentication pages so that my first interaction with the application is professional and trustworthy.

**Why this priority**: Auth pages are critical conversion points. Poor design reduces trust and signup rates.

**Independent Test**: Can be fully tested by accessing /signup and /login pages and verifying layout, form styling, validation feedback, and responsive behavior.

**Acceptance Scenarios**:

1. **Given** I am accessing the signup page, **When** I view the form, **Then** I see a centered card layout with proper spacing, input styling, and clear CTAs
2. **Given** I am filling out auth forms, **When** I interact with inputs, **Then** I see proper focus states, validation feedback, and error messages with appropriate styling
3. **Given** I am on mobile, **When** I view auth pages, **Then** forms adapt to mobile layout with touch-friendly input sizes and proper keyboard handling
4. **Given** I am viewing auth pages in dark mode, **When** I inspect the design, **Then** all form elements have proper contrast and visibility

---

### Edge Cases

- What happens when localStorage is disabled and theme preference cannot be persisted?
- How does the system handle browsers that don't support CSS custom properties (IE11)?
- What occurs when animations are disabled via prefers-reduced-motion?
- How does the landing page behave when JavaScript is disabled (progressive enhancement)?
- What happens when the user rapidly toggles between light and dark mode?
- How does the system handle very long task titles or descriptions in the enhanced task cards?
- What occurs when the viewport is extremely narrow (< 320px) or extremely wide (> 2560px)?

## Requirements *(mandatory)*

### Functional Requirements

> **Constitution gates (must be explicitly addressed in FRs when applicable):**
> - JWT auth on every API call (`Authorization: Bearer <token>`)
> - 401 for missing/invalid token; 403 for authenticated-but-forbidden
> - User isolation: no cross-user data exposure; never trust client-provided `user_id`
> - Context7 grounding required for architectural/implementation decisions

#### Theme System (Dark Mode)

- **FR-001**: System MUST implement a complete dark mode theme system using CSS custom properties (--color-*, --bg-*, --text-*) that affects all UI elements
- **FR-002**: System MUST persist theme preference in localStorage under key 'theme' with values 'light' or 'dark'
- **FR-003**: System MUST respect OS/browser theme preference (prefers-color-scheme) when no stored preference exists
- **FR-004**: System MUST provide a theme toggle button accessible from all pages (in header/sidebar) with smooth transition animations (200ms)
- **FR-005**: System MUST ensure all color combinations in both themes meet WCAG AA contrast requirements (4.5:1 for normal text, 3:1 for large text)
- **FR-006**: System MUST apply theme changes immediately without page reload using data-theme attribute on document root

#### Landing Page

- **FR-007**: System MUST render a public landing page at root path (/) with five main sections: Hero, Features, How It Works, Testimonials, and Final CTA
- **FR-008**: Hero section MUST include headline, description, two CTA buttons ("Get Started", "Learn More"), and hero image with fade-in animation on load
- **FR-009**: Features section MUST display 3-4 feature cards with icons, titles, and descriptions in a responsive grid layout
- **FR-010**: How It Works section MUST show 3-4 numbered steps with icons and descriptions explaining the user journey
- **FR-011**: Testimonials section MUST display 2-3 user testimonials with avatars, names, and quotes in card format
- **FR-012**: Final CTA section MUST include compelling headline and primary CTA button with prominent styling
- **FR-013**: All landing sections MUST implement scroll-triggered fade-in and slide-up animations using CSS only (Intersection Observer for trigger)
- **FR-014**: Landing page MUST be fully responsive with mobile (< 768px), tablet (768-1024px), and desktop (> 1024px) layouts

#### Design System

- **FR-015**: System MUST replace all blue colors with Indigo as primary color (indigo-50 through indigo-950) and Pink as accent color (pink-50 through pink-950)
- **FR-016**: System MUST use Inter font family exclusively with font weights 400 (regular), 500 (medium), 600 (semibold), and 700 (bold)
- **FR-017**: System MUST define typography scale with sizes: xs (12px), sm (14px), base (16px), lg (18px), xl (20px), 2xl (24px), 3xl (30px), 4xl (36px), 5xl (48px)
- **FR-018**: System MUST implement spacing system based on 4px/8px grid with values: 1 (4px), 2 (8px), 3 (12px), 4 (16px), 6 (24px), 8 (32px), 12 (48px), 16 (64px)
- **FR-019**: System MUST define CSS custom properties for all design tokens (colors, spacing, typography, shadows, borders) in globals.css
- **FR-020**: System MUST implement consistent border radius values: sm (4px), md (8px), lg (12px), xl (16px), 2xl (24px), full (9999px)
- **FR-021**: System MUST define shadow system: sm, md, lg, xl with appropriate blur and opacity values for both light and dark modes

#### Component Library

- **FR-022**: System MUST implement 25+ reusable components organized in /components directory with subdirectories: layout/, ui/, landing/, tasks/
- **FR-023**: Layout components MUST include: Header, Footer, Sidebar, Container, PageLayout with consistent structure and responsive behavior
- **FR-024**: UI primitive components MUST include: Button (variants: primary, secondary, outline, ghost), Input, Textarea, Select, Checkbox, Radio, Badge, Card, Modal, Toast, Spinner, Avatar, Divider
- **FR-025**: Landing components MUST include: Hero, Features, HowItWorks, Testimonials, CTASection with proper prop interfaces
- **FR-026**: Task components MUST include: TaskCard, TaskList, TaskForm, TaskFilters, TaskStats with enhanced styling and interactions
- **FR-027**: All components MUST support both light and dark themes without additional props
- **FR-028**: All interactive components MUST include proper hover, focus, active, and disabled states with smooth transitions

#### Animation System

- **FR-029**: System MUST implement CSS-only animations without JavaScript animation libraries to ensure 60fps performance
- **FR-030**: System MUST use CSS transforms (translate, scale) and opacity for animations, avoiding layout-triggering properties (width, height, top, left)
- **FR-031**: System MUST implement scroll-triggered animations using Intersection Observer API with CSS class toggles
- **FR-032**: System MUST define animation utilities in globals.css: fade-in, slide-up, slide-down, scale-in with configurable durations
- **FR-033**: System MUST respect prefers-reduced-motion media query by disabling or reducing animations for users with motion sensitivity
- **FR-034**: System MUST implement micro-interactions on buttons, cards, and interactive elements with max 300ms duration
- **FR-035**: System MUST use CSS will-change property sparingly and only during active animations to optimize performance

#### Enhanced Dashboard

- **FR-036**: System MUST implement sidebar navigation with links to Dashboard, Tasks, Profile, Settings, and Logout
- **FR-037**: Sidebar MUST include user profile section showing avatar, name, and email at the top
- **FR-038**: Sidebar MUST collapse to hamburger menu on mobile (< 768px) with slide-in/out animation
- **FR-039**: Dashboard MUST display statistics cards showing: Total Tasks, Completed Tasks, Pending Tasks, Completion Rate (%) in a responsive grid
- **FR-040**: Statistics cards MUST include icons, large numbers, labels, and subtle background colors with hover effects
- **FR-041**: Dashboard MUST show recent tasks list with enhanced TaskCard components including priority indicators and due dates
- **FR-042**: Dashboard layout MUST use CSS Grid with sidebar (250px fixed on desktop, full-width drawer on mobile) and main content area

#### Redesigned Auth Pages

- **FR-043**: System MUST redesign /signup and /login pages with centered card layout (max-width 400px) on neutral background
- **FR-044**: Auth forms MUST include proper input styling with labels, placeholders, focus states, and validation feedback
- **FR-045**: Auth pages MUST display error messages inline below inputs with red color and icon
- **FR-046**: Auth pages MUST include links to alternate auth page (signup ↔ login) and password reset
- **FR-047**: Auth pages MUST be fully responsive and maintain proper spacing and readability on all screen sizes
- **FR-048**: Auth pages MUST support both light and dark themes with proper form element contrast

#### Architecture & Performance

- **FR-049**: System MUST load global CSS correctly in App Router root layout (app/layout.tsx) with proper import order
- **FR-050**: System MUST apply Tailwind CSS directives (@tailwind base, components, utilities) in globals.css
- **FR-051**: System MUST implement CSS Modules for component-scoped styling where appropriate to prevent style conflicts
- **FR-052**: System MUST follow Next.js App Router styling best practices with proper CSS loading and optimization
- **FR-053**: System MUST implement proper error, loading, and empty state UI patterns with consistent styling
- **FR-054**: System MUST ensure total CSS bundle size remains under 100KB (gzipped) for optimal performance
- **FR-055**: System MUST achieve Lighthouse performance score of 90+ on landing page and 85+ on authenticated pages

### Key Entities

- **Theme System**: Represents the dark/light mode implementation including CSS custom properties, localStorage persistence, OS preference detection, and theme toggle mechanism
- **Landing Page**: Represents the public-facing homepage with Hero, Features, How It Works, Testimonials, and CTA sections with scroll animations
- **Design System**: Represents the unified styling approach including Indigo/Pink color palette, Inter typography, spacing system, shadows, and border radius tokens
- **Component Library**: Represents the collection of 25+ reusable components organized by category (layout, ui, landing, tasks) with consistent theming and interactions
- **Animation System**: Represents the CSS-only animation framework including scroll-triggered animations, micro-interactions, and performance optimizations
- **Dashboard Layout**: Represents the authenticated user workspace with sidebar navigation, statistics cards, and enhanced task management interface
- **Auth Pages**: Represents the redesigned signup and login pages with centered card layouts and enhanced form styling
- **Styling Architecture**: Represents the organizational structure for CSS files, global styles, CSS modules, and Tailwind configuration

## Success Criteria *(mandatory)*

### Measurable Outcomes

#### Landing Page
- **SC-001**: Landing page renders all 5 sections (Hero, Features, How It Works, Testimonials, CTA) with proper content and layout (100% section completion)
- **SC-002**: Scroll-triggered animations activate smoothly when sections enter viewport with no jank or layout shifts (60fps maintained)
- **SC-003**: Landing page is fully responsive across mobile (320px-767px), tablet (768px-1023px), and desktop (1024px+) breakpoints (100% layout adaptation)
- **SC-004**: Landing page achieves Lighthouse performance score of 90+ and accessibility score of 95+ (verified via Lighthouse audit)

#### Theme System
- **SC-005**: Theme toggle switches between light and dark modes instantly with smooth transitions (< 200ms transition time)
- **SC-006**: Theme preference persists across page reloads and browser sessions via localStorage (100% persistence rate)
- **SC-007**: All color combinations in both themes meet WCAG AA contrast requirements (4.5:1 for normal text, 3:1 for large text, verified via contrast checker)
- **SC-008**: System respects OS theme preference (prefers-color-scheme) when no stored preference exists (100% OS preference detection)

#### Design System
- **SC-009**: All blue colors replaced with Indigo/Pink palette across 100% of UI elements (verified via CSS audit)
- **SC-010**: Inter font loads successfully and applies to all text elements with proper font weights (400, 500, 600, 700)
- **SC-011**: Spacing follows 4px/8px grid system consistently across all components (100% spacing consistency)
- **SC-012**: CSS custom properties defined for all design tokens (colors, spacing, typography, shadows, borders) and used consistently (verified via CSS inspection)

#### Component Library
- **SC-013**: 25+ reusable components implemented and organized in proper directory structure (layout/, ui/, landing/, tasks/)
- **SC-014**: All interactive components include proper hover, focus, active, and disabled states with smooth transitions (100% state coverage)
- **SC-015**: All components support both light and dark themes without additional props (100% theme compatibility)
- **SC-016**: Component library maintains consistent API patterns and prop interfaces (verified via code review)

#### Animation System
- **SC-017**: All animations maintain 60fps performance with no dropped frames (verified via Chrome DevTools Performance panel)
- **SC-018**: Animations use only transform and opacity properties, avoiding layout-triggering properties (verified via CSS audit)
- **SC-019**: System respects prefers-reduced-motion by disabling or reducing animations (100% accessibility compliance)
- **SC-020**: Micro-interactions complete within 300ms for optimal perceived performance (verified via timing measurements)

#### Enhanced Dashboard
- **SC-021**: Dashboard displays sidebar navigation with all required links and user profile section (100% navigation completeness)
- **SC-022**: Statistics cards show accurate data for Total Tasks, Completed Tasks, Pending Tasks, and Completion Rate (100% data accuracy)
- **SC-023**: Sidebar collapses to hamburger menu on mobile with smooth slide-in/out animation (< 300ms animation duration)
- **SC-024**: Dashboard layout adapts properly across all screen sizes with no horizontal scroll or layout breaks (100% responsive coverage)

#### Redesigned Auth Pages
- **SC-025**: Auth pages display centered card layout with proper spacing and visual hierarchy (verified via visual inspection)
- **SC-026**: Form validation provides immediate inline feedback with appropriate error styling (< 100ms feedback delay)
- **SC-027**: Auth pages are fully responsive and maintain readability on all screen sizes (320px to 2560px)
- **SC-028**: Auth pages support both light and dark themes with proper form element contrast (WCAG AA compliant)

#### Performance & Accessibility
- **SC-029**: Total CSS bundle size remains under 100KB gzipped (verified via build analysis)
- **SC-030**: First Contentful Paint (FCP) occurs within 1.5 seconds on 3G connection (verified via Lighthouse)
- **SC-031**: Largest Contentful Paint (LCP) occurs within 2.5 seconds on 3G connection (verified via Lighthouse)
- **SC-032**: Cumulative Layout Shift (CLS) score below 0.1 across all pages (verified via Lighthouse)
- **SC-033**: All pages achieve accessibility score of 95+ on Lighthouse audit (keyboard navigation, ARIA labels, color contrast)
- **SC-034**: Application remains functional with JavaScript disabled for critical paths (progressive enhancement verified)

#### User Experience
- **SC-035**: Users can complete primary tasks (signup, login, create task, toggle theme) without visual distractions or layout issues (95% task completion rate)
- **SC-036**: User satisfaction score increases by 30%+ compared to previous design (measured via user feedback survey)
- **SC-037**: Page load times remain under 3 seconds on average connection for all pages (verified via analytics)
- **SC-038**: Zero visual regressions reported in production after deployment (verified via visual regression testing and user reports)

---

## Non-Functional Requirements *(mandatory)*

### Performance

- **NFR-001**: First Contentful Paint (FCP) MUST occur within 1.5 seconds on 3G connection (1.6 Mbps)
- **NFR-002**: Largest Contentful Paint (LCP) MUST occur within 2.5 seconds on 3G connection
- **NFR-003**: Time to Interactive (TTI) MUST be under 3.5 seconds on 3G connection
- **NFR-004**: Total CSS bundle size MUST remain under 100KB gzipped after minification
- **NFR-005**: All animations MUST maintain 60fps with no dropped frames (verified via Chrome DevTools Performance panel)
- **NFR-006**: Cumulative Layout Shift (CLS) MUST be below 0.1 across all pages
- **NFR-007**: Theme toggle MUST complete within 200ms including all CSS custom property updates
- **NFR-008**: Page navigation MUST feel instant with content appearing within 100ms (using Next.js prefetching)

### Accessibility

- **NFR-009**: All pages MUST achieve WCAG 2.1 Level AA compliance (minimum)
- **NFR-010**: All color combinations MUST meet contrast ratio requirements (4.5:1 for normal text, 3:1 for large text and UI components)
- **NFR-011**: All interactive elements MUST be keyboard accessible with visible focus indicators
- **NFR-012**: All images MUST have appropriate alt text; decorative images MUST use alt=""
- **NFR-013**: All forms MUST have proper labels, ARIA attributes, and error announcements for screen readers
- **NFR-014**: System MUST respect prefers-reduced-motion by disabling or significantly reducing animations
- **NFR-015**: All pages MUST be navigable using only keyboard (Tab, Enter, Escape, Arrow keys)
- **NFR-016**: Lighthouse accessibility score MUST be 95+ for all pages

### Browser Compatibility

- **NFR-017**: System MUST support modern browsers: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **NFR-018**: System MUST provide graceful degradation for browsers without CSS custom properties support
- **NFR-019**: System MUST provide fallback fonts if Inter font fails to load (system-ui, -apple-system, sans-serif)
- **NFR-020**: System MUST handle browsers with JavaScript disabled for critical paths (progressive enhancement)

### Responsive Design

- **NFR-021**: System MUST support viewport widths from 320px (iPhone SE) to 2560px (large desktop)
- **NFR-022**: System MUST implement mobile-first responsive design with breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- **NFR-023**: System MUST ensure touch targets are minimum 44x44px on mobile devices (WCAG 2.1 Level AAA)
- **NFR-024**: System MUST prevent horizontal scrolling on all screen sizes
- **NFR-025**: System MUST adapt typography sizes for mobile (reduce by 10-20%) to maintain readability

### Maintainability

- **NFR-026**: All CSS custom properties MUST be defined in a single source (globals.css) for easy theme management
- **NFR-027**: All components MUST follow consistent naming conventions (PascalCase for components, kebab-case for CSS classes)
- **NFR-028**: All magic numbers MUST be replaced with design tokens (spacing, colors, typography)
- **NFR-029**: Component library MUST have clear directory structure with separation of concerns (layout/, ui/, landing/, tasks/)
- **NFR-030**: All components MUST have TypeScript interfaces for props with JSDoc comments

### Security

- **NFR-031**: System MUST NOT expose sensitive data in CSS class names or data attributes
- **NFR-032**: System MUST sanitize user-generated content before rendering to prevent XSS attacks
- **NFR-033**: Theme preference in localStorage MUST be validated before application to prevent injection attacks

---

## Technical Architecture

### Directory Structure

```
app/
├── (auth)/
│   ├── login/
│   │   └── page.tsx          # Redesigned login page
│   └── signup/
│       └── page.tsx          # Redesigned signup page
├── (dashboard)/
│   ├── layout.tsx            # Dashboard layout with sidebar
│   ├── page.tsx              # Dashboard home with stats
│   └── tasks/
│       └── page.tsx          # Enhanced tasks page
├── layout.tsx                # Root layout with theme provider
├── page.tsx                  # Landing page
└── globals.css               # Global styles with design tokens

components/
├── layout/
│   ├── Header.tsx            # Header with theme toggle
│   ├── Footer.tsx            # Footer component
│   ├── Sidebar.tsx           # Dashboard sidebar navigation
│   ├── Container.tsx         # Content container wrapper
│   └── PageLayout.tsx        # Page layout wrapper
├── ui/
│   ├── Button.tsx            # Button with variants
│   ├── Input.tsx             # Input field
│   ├── Textarea.tsx          # Textarea field
│   ├── Select.tsx            # Select dropdown
│   ├── Checkbox.tsx          # Checkbox input
│   ├── Radio.tsx             # Radio input
│   ├── Badge.tsx             # Badge component
│   ├── Card.tsx              # Card container
│   ├── Modal.tsx             # Modal dialog
│   ├── Toast.tsx             # Toast notification
│   ├── Spinner.tsx           # Loading spinner
│   ├── Avatar.tsx            # User avatar
│   └── Divider.tsx           # Divider line
├── landing/
│   ├── Hero.tsx              # Hero section
│   ├── Features.tsx          # Features section
│   ├── HowItWorks.tsx        # How it works section
│   ├── Testimonials.tsx      # Testimonials section
│   └── CTASection.tsx        # Call-to-action section
├── tasks/
│   ├── TaskCard.tsx          # Enhanced task card
│   ├── TaskList.tsx          # Task list container
│   ├── TaskForm.tsx          # Task creation/edit form
│   ├── TaskFilters.tsx       # Task filtering UI
│   └── TaskStats.tsx         # Task statistics cards
└── providers/
    └── ThemeProvider.tsx     # Theme context provider

lib/
└── hooks/
    └── useTheme.ts           # Theme management hook

public/
└── fonts/
    └── inter/                # Inter font files
```

### CSS Architecture

**globals.css Structure:**
```css
/* 1. Tailwind directives */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 2. Font imports */
@import url('...');

/* 3. CSS Custom Properties (Design Tokens) */
:root {
  /* Colors - Light Mode */
  --color-primary-*: ...;
  --color-accent-*: ...;
  --bg-*: ...;
  --text-*: ...;

  /* Spacing */
  --spacing-*: ...;

  /* Typography */
  --font-*: ...;
  --text-*: ...;

  /* Shadows */
  --shadow-*: ...;

  /* Borders */
  --radius-*: ...;
  --border-*: ...;
}

[data-theme="dark"] {
  /* Colors - Dark Mode overrides */
}

/* 4. Base styles */
/* 5. Animation utilities */
/* 6. Utility classes */
```

### Theme System Architecture

**Theme Provider Flow:**
1. ThemeProvider component wraps app in root layout
2. On mount, check localStorage for 'theme' key
3. If no stored theme, check prefers-color-scheme media query
4. Apply theme by setting data-theme attribute on document.documentElement
5. Provide toggleTheme function via React Context
6. All CSS custom properties update automatically via data-theme selector

**Theme Toggle Flow:**
1. User clicks theme toggle button
2. toggleTheme function called from context
3. New theme value stored in localStorage
4. data-theme attribute updated on document root
5. CSS transitions handle smooth color changes (200ms)

### Animation System Architecture

**Scroll Animation Flow:**
1. Define animation keyframes in globals.css (fade-in, slide-up, etc.)
2. Apply animation classes with initial state (opacity: 0, transform: translateY(20px))
3. Use Intersection Observer API to detect when elements enter viewport
4. Add 'animate' class to trigger CSS animation
5. Animation runs once using CSS (no JavaScript animation loop)

**Performance Optimizations:**
- Use transform and opacity only (GPU-accelerated)
- Apply will-change during animation only
- Use requestAnimationFrame for class additions
- Respect prefers-reduced-motion media query

---

## Component Inventory & Traceability

### Layout Components

| Component | Purpose | Used In | Theme Support | Responsive |
|-----------|---------|---------|---------------|------------|
| Header | Top navigation with logo, links, theme toggle | All pages | Yes | Yes |
| Footer | Bottom footer with links and copyright | All pages | Yes | Yes |
| Sidebar | Dashboard navigation with user profile | Dashboard pages | Yes | Yes (collapses on mobile) |
| Container | Content width constraint wrapper | All pages | Yes | Yes |
| PageLayout | Standard page layout wrapper | All pages | Yes | Yes |

### UI Primitive Components

| Component | Variants | Props | Theme Support | Accessibility |
|-----------|----------|-------|---------------|---------------|
| Button | primary, secondary, outline, ghost | onClick, disabled, loading, size | Yes | Full keyboard support, ARIA |
| Input | text, email, password, number | value, onChange, error, label | Yes | Labels, error announcements |
| Textarea | - | value, onChange, error, label, rows | Yes | Labels, error announcements |
| Select | - | options, value, onChange, label | Yes | Keyboard navigation |
| Checkbox | - | checked, onChange, label | Yes | Keyboard support, ARIA |
| Radio | - | checked, onChange, label, name | Yes | Keyboard support, ARIA |
| Badge | default, success, warning, error | children, variant | Yes | Semantic colors |
| Card | - | children, className | Yes | Proper contrast |
| Modal | - | isOpen, onClose, title, children | Yes | Focus trap, Escape key |
| Toast | success, error, info, warning | message, type, duration | Yes | ARIA live region |
| Spinner | - | size | Yes | ARIA label |
| Avatar | - | src, alt, fallback | Yes | Alt text required |
| Divider | horizontal, vertical | orientation | Yes | Semantic markup |

### Landing Components

| Component | Sections | Animations | Responsive | Theme Support |
|-----------|----------|------------|------------|---------------|
| Hero | Headline, description, CTAs, image | Fade-in on load | Yes | Yes |
| Features | 3-4 feature cards with icons | Slide-up on scroll | Yes | Yes |
| HowItWorks | 3-4 numbered steps | Slide-up on scroll | Yes | Yes |
| Testimonials | 2-3 testimonial cards | Fade-in on scroll | Yes | Yes |
| CTASection | Headline, CTA button | Fade-in on scroll | Yes | Yes |

### Task Components

| Component | Purpose | Features | Theme Support | Responsive |
|-----------|---------|----------|---------------|------------|
| TaskCard | Display single task | Priority indicator, due date, hover effects | Yes | Yes |
| TaskList | Display task collection | Empty state, loading state | Yes | Yes |
| TaskForm | Create/edit tasks | Validation, error handling | Yes | Yes |
| TaskFilters | Filter tasks | Status, priority, date filters | Yes | Yes |
| TaskStats | Display statistics | Total, completed, pending, rate | Yes | Yes |

---

## Implementation Phases

### Phase 1: Foundation (Priority: P0)
**Estimated Effort: 2-3 days**

- Set up design tokens in globals.css (CSS custom properties)
- Implement theme system (ThemeProvider, useTheme hook, toggle button)
- Replace blue colors with Indigo/Pink palette globally
- Integrate Inter font family
- Update Tailwind configuration with new color palette
- Test theme switching and persistence

**Acceptance:**
- [ ] Theme toggles between light/dark modes smoothly
- [ ] Theme preference persists in localStorage
- [ ] All design tokens defined and documented
- [ ] Inter font loads correctly with all weights
- [ ] No blue colors remain in codebase

### Phase 2: Component Library (Priority: P0)
**Estimated Effort: 3-4 days**

- Implement layout components (Header, Footer, Sidebar, Container, PageLayout)
- Implement UI primitive components (Button, Input, Textarea, Select, Checkbox, Radio, Badge, Card, Modal, Toast, Spinner, Avatar, Divider)
- Ensure all components support both themes
- Add proper TypeScript interfaces and prop validation
- Test component library in isolation

**Acceptance:**
- [ ] All 25+ components implemented and functional
- [ ] All components support light/dark themes
- [ ] All interactive components have proper states (hover, focus, active, disabled)
- [ ] TypeScript interfaces defined for all component props
- [ ] Components organized in proper directory structure

### Phase 3: Landing Page (Priority: P0)
**Estimated Effort: 2-3 days**

- Implement landing page components (Hero, Features, HowItWorks, Testimonials, CTASection)
- Set up scroll-triggered animations with Intersection Observer
- Ensure full responsiveness across all breakpoints
- Add proper content and imagery
- Test animations and performance

**Acceptance:**
- [ ] All 5 landing sections render correctly
- [ ] Scroll animations trigger smoothly at 60fps
- [ ] Landing page fully responsive (320px to 2560px)
- [ ] Lighthouse performance score 90+
- [ ] All CTAs navigate correctly

### Phase 4: Enhanced Dashboard (Priority: P1)
**Estimated Effort: 2-3 days**

- Implement dashboard layout with sidebar navigation
- Create statistics cards with task data
- Enhance task components (TaskCard, TaskList, TaskForm, TaskFilters, TaskStats)
- Implement mobile sidebar collapse with hamburger menu
- Test dashboard functionality and responsiveness

**Acceptance:**
- [ ] Dashboard displays sidebar with navigation and user profile
- [ ] Statistics cards show accurate task data
- [ ] Sidebar collapses on mobile with smooth animation
- [ ] Enhanced task components render correctly
- [ ] Dashboard fully responsive

### Phase 5: Redesigned Auth Pages (Priority: P1)
**Estimated Effort: 1-2 days**

- Redesign signup page with centered card layout
- Redesign login page with centered card layout
- Enhance form styling with proper validation feedback
- Ensure full responsiveness and theme support
- Test auth flow end-to-end

**Acceptance:**
- [ ] Auth pages display centered card layout
- [ ] Form validation provides inline feedback
- [ ] Auth pages fully responsive
- [ ] Auth pages support both themes
- [ ] Auth flow works correctly

### Phase 6: Animation System (Priority: P1)
**Estimated Effort: 1-2 days**

- Define animation utilities in globals.css
- Implement scroll-triggered animations
- Add micro-interactions to interactive elements
- Optimize animations for 60fps performance
- Test with prefers-reduced-motion

**Acceptance:**
- [ ] All animations maintain 60fps
- [ ] Scroll animations trigger correctly
- [ ] Micro-interactions feel smooth and responsive
- [ ] Animations respect prefers-reduced-motion
- [ ] No layout thrashing or jank

### Phase 7: Testing & Optimization (Priority: P1)
**Estimated Effort: 2-3 days**

- Run Lighthouse audits on all pages
- Test accessibility with keyboard navigation and screen readers
- Test responsiveness across all breakpoints and devices
- Optimize CSS bundle size
- Fix any visual regressions or bugs
- Conduct user acceptance testing

**Acceptance:**
- [ ] Lighthouse scores meet targets (Performance 90+, Accessibility 95+)
- [ ] All pages keyboard accessible
- [ ] No visual regressions
- [ ] CSS bundle under 100KB gzipped
- [ ] All success criteria met

---

## Testing Strategy

### Visual Regression Testing
- Capture screenshots of all pages in both light and dark modes
- Test across multiple viewport sizes (mobile, tablet, desktop)
- Compare against baseline screenshots to detect unintended changes
- Tools: Percy, Chromatic, or manual screenshot comparison

### Accessibility Testing
- Keyboard navigation testing (Tab, Enter, Escape, Arrow keys)
- Screen reader testing (NVDA, JAWS, VoiceOver)
- Color contrast verification (WebAIM Contrast Checker)
- Lighthouse accessibility audits
- WAVE accessibility evaluation

### Performance Testing
- Lighthouse performance audits on all pages
- Chrome DevTools Performance panel for animation profiling
- Network throttling tests (3G, 4G, WiFi)
- CSS bundle size analysis
- Core Web Vitals monitoring (FCP, LCP, CLS, TTI)

### Cross-Browser Testing
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

### Responsive Testing
- Physical device testing (iPhone, iPad, Android phones/tablets)
- Browser DevTools responsive mode
- Test breakpoints: 320px, 375px, 768px, 1024px, 1440px, 2560px
- Orientation testing (portrait and landscape)

### Theme Testing
- Toggle between light and dark modes on all pages
- Verify theme persistence across page reloads
- Test OS preference detection
- Verify all components render correctly in both themes
- Check color contrast in both themes

### User Acceptance Testing
- Task completion testing (signup, login, create task, toggle theme)
- User feedback collection via surveys
- Usability testing with 5-10 users
- A/B testing if applicable

---

## Open Questions

None at this time. All requirements are clearly defined and testable. If ambiguities arise during implementation, they should be documented and resolved through the Human-as-Tool clarification protocol.

---

## Risks & Mitigation

### Risk 1: Performance Degradation
**Impact**: High | **Probability**: Medium

**Description**: Adding extensive animations and design system could increase CSS bundle size and negatively impact page load times.

**Mitigation**:
- Monitor CSS bundle size throughout development (target: < 100KB gzipped)
- Use CSS-only animations to avoid JavaScript overhead
- Implement code splitting for landing page components
- Run Lighthouse audits after each phase
- Use PurgeCSS/Tailwind JIT to remove unused styles

### Risk 2: Browser Compatibility Issues
**Impact**: Medium | **Probability**: Low

**Description**: CSS custom properties and modern CSS features may not work in older browsers.

**Mitigation**:
- Define minimum browser support requirements (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Provide fallback values for CSS custom properties where critical
- Test in all supported browsers during development
- Use PostCSS autoprefixer for vendor prefixes
- Document browser support in README

### Risk 3: Accessibility Violations
**Impact**: High | **Probability**: Low

**Description**: Complex animations and theme switching could create accessibility barriers for users with disabilities.

**Mitigation**:
- Respect prefers-reduced-motion media query
- Ensure WCAG AA contrast ratios in both themes
- Test with keyboard navigation and screen readers
- Run automated accessibility audits (Lighthouse, axe)
- Include accessibility testing in every phase

### Risk 4: Theme Switching Bugs
**Impact**: Medium | **Probability**: Medium

**Description**: Theme switching could cause visual glitches, flash of unstyled content, or localStorage issues.

**Mitigation**:
- Implement theme provider at root level before any content renders
- Use CSS transitions for smooth theme changes
- Handle localStorage errors gracefully (fallback to OS preference)
- Test theme switching extensively across all pages
- Add loading state if theme initialization is async

### Risk 5: Scope Creep
**Impact**: Medium | **Probability**: Medium

**Description**: Comprehensive redesign could expand beyond defined scope, delaying delivery.

**Mitigation**:
- Strictly follow phased implementation plan
- Mark all requirements as P0, P1, or P2 priority
- Defer P2 features if timeline is at risk
- Conduct phase reviews before moving to next phase
- Use task tracking to monitor progress

---

## Dependencies

### External Dependencies
- **Inter Font**: Google Fonts or self-hosted font files
- **Next.js 14+**: App Router, Image optimization, Font optimization
- **React 18+**: Context API for theme provider
- **Tailwind CSS 3+**: Utility classes and configuration
- **TypeScript 5+**: Type safety for components

### Internal Dependencies
- **Better Auth**: Authentication system must be functional for auth page testing
- **Task API**: Backend API must be available for dashboard and task components
- **Database**: SQLite database must be accessible for task data

### Team Dependencies
- **Design Assets**: Hero images, feature icons, testimonial avatars (if not using placeholders)
- **Content**: Copy for landing page sections (headline, descriptions, testimonials)
- **Backend Team**: API endpoints must remain stable during frontend redesign

---

## Glossary

- **CSS Custom Properties**: CSS variables (--variable-name) that can be dynamically changed and inherited
- **Design Tokens**: Named values for design decisions (colors, spacing, typography) stored as CSS custom properties
- **Dark Mode**: Alternative color scheme with dark backgrounds and light text for low-light environments
- **Micro-interactions**: Small, subtle animations that provide feedback for user actions (button hover, input focus)
- **Scroll-triggered Animations**: Animations that activate when elements enter the viewport during scrolling
- **Progressive Enhancement**: Building core functionality first, then adding enhancements for modern browsers
- **Prefers-reduced-motion**: CSS media query that detects user's OS-level preference for reduced animations
- **WCAG**: Web Content Accessibility Guidelines - standards for accessible web content
- **Core Web Vitals**: Google's metrics for user experience (LCP, FID, CLS)
- **CSS-only Animations**: Animations defined purely in CSS without JavaScript, using keyframes and transitions
- **Theme Provider**: React Context provider that manages theme state and provides toggle function
- **Intersection Observer**: Browser API for detecting when elements enter/exit the viewport
