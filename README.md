
# Guidelines

This document provides essential guidelines for consistency and better development experience.

## 1. **File & Folder Naming**
- **File Names**: Use **kebab-case** for files and folders.
  - Example: `my-component.tsx`, `use-fetch-data.ts`.
  
- **Folder Structure**: Follow a **feature-based** structure.
  ```
  src/
    ├── components/   # Reusable components
    ├── features/     # Feature-specific code
    ├── hooks/        # Custom hooks
    ├── services/     # API calls, data fetching
    ├── utils/        # Helper functions
    └── styles/       # Global styles
  ```

## 2. **Naming Conventions**
- **Variables**: Use **camelCase** for variables.
  - Example: `const userName = 'John';`
  
- **Functions**: Use **camelCase** for function names.
  - Example: `function fetchData() {}`, `const handleClick = () => {};`.

- **Components**: Use **PascalCase** for component names.
  - Example: `UserProfile`, `LoginForm`.

- **Props**: Use **camelCase** for prop names.
  - Example: `const UserProfile = ({ userName, userAge }: UserProfileProps) => {};`.

## 3. **Component Functions**
- Use `const` with arrow functions for components.
  - Example: `const MyComponent = () => {};`.

## 4. **Custom Hooks**
- Custom hooks should start with `use` and use **camelCase**.
  - Example: `useFetchData`, `useUserAuthentication`.

## 5. **Exports**
- Always use **named exports** for components and functions.
  - Example: `export const MyComponent = () => {};`.

## 6. **CSS/Styling**
- Use **CSS-in-JS** or **SCSS** for styles.
- Global styles go into the `styles` folder.

## 7. **Testing**
- Write unit tests for components and functions.
- Use **Vitest** for testing.
  - Example: `import { render, screen } from '@testing-library/react';`

## 8. **Absolute Imports**
- Use `@/` for absolute imports in the codebase.
  - Example: `import MyComponent from '@/components/MyComponent';`
