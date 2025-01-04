This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Project Overview

system features
- User authentication with two-factor verification
- CRUD on commissions

## Tech Stack & Tools

### Core Technologies
- Nextjs
- TypeScript
- Tailwind CSS
- Axios
- React Hook Forms
- MUI

### Additional Libraries
- js-cookie
- web-push
- @next/bundle-analyzer

### Development Tools
- ESLint
- Prettier
- PostCSS
- Autoprefixer

src/
   ├── app/             # Application-level logic and routes
   │   ├── auth/        # Authentication-related pages and logic
   │   ├── dashboard/   # Dashboard-related pages and logic
   │   ├── actions.ts   # Centralized action handlers
   │   ├── layout.tsx   # General layout
   │   ├── page.tsx     # Default page
   │   └── unauthorized.tsx # Unauthorized access page
   │
   ├── assets/          # Static assets (fonts, images)
   │   └── favicon.ico
   │
   ├── axios/           # Axios HTTP client configuration
   │   └── index.ts
   │
   ├── components/      # Reusable UI components
   │   ├── auth/        # Components specific to auth
   │   ├── base/        # Base reusable components
   │   ├── commission/  # Components specific to commissions
   │   └── layout/      # Layout-specific components
   │
   ├── context/         # React context for global state
   │   ├── auth-context.tsx
   │   └── notify-context.tsx
   │
   ├── cookie/          # Cookie handling utilities
   │   └── index.ts
   │
   ├── hooks/           # Custom React hooks
   │
   ├── modules/         # Core functionality
   │   ├── api/         # API integration logic
   │   └── http/        # HTTP client setup
   │
   ├── pages/           # Page components
   │   ├── auth/        # Pages related to authentication
   │   └── commissions/ # Pages related to commissions
   │       ├── index.ts
   │       └── type.d.ts
   │
   ├── services/        # External services and logic
   │   ├── auth/
   │   │   ├── index.ts
   │   │   └── register-request.d.ts
   │
   ├── utils/           # Utility functions
   │   └── validations.ts
   │
   └── styles/          # Global and modular CSS
       ├── globals.css
       └── page.module.css


## Key Features

### 1. Authentication System
- Two-step verification process
- OTP verification with countdown timer
- Token-based authentication

### 2. State Management
project uses context for these:
- `AuthContext`: Authentication state
- `NotifyContext`: api error messages notification

### 3. Form Validation
use React hook forms for comprehensive validation:
- user registration
- User login

### 4. API Integration
Centralized API module with:
- Axios interceptors
- Error handling
- Response transformation
- Token management
- Request/Response typing

### 5. Styling System
- Tailwind CSS with custom configuration

### 6. Type Safety
- Strict TypeScript configuration
- Interface definitions for all data structures
- Type guards and utilities
- Proper type imports/exports

## Development Guidelines

### Code Style
- Use functional components with hooks
- Implement proper TypeScript interfaces
- Follow ESLint rules
- Use proper naming conventions
<!-- - Document complex functions -->

### Component Structure
- Keep components small and focused
- Use proper prop typing
- Implement error boundaries
- Use React.memo for optimization

### Performance Optimization
- Use proper React hooks
- Avoid unnecessary re-renders
- Optimize bundle size
- Use proper key props
