# Drone Rental Application - Monorepo

## Project Overview

This monorepo contains two packages:

1. **identity-verification-sdk** - A reusable React SDK for identity verification with selfie capture, phone validation, and address collection
2. **drone-rental-app** - A demo application showcasing the SDK in a real-world drone rental scenario

## Architecture

```
drone-app/
├── packages/
│   ├── identity-verification-sdk/    # Reusable verification SDK
│   │   ├── lib/                       # SDK source code
│   │   ├── assets/                    # Icons and assets
│   │   └── README.md                  # SDK documentation
│   └── drone-rental-app/              # Demo application
│       ├── src/                       # App source code
│       └── README.md                  # App documentation
└── package.json                       # Workspace configuration
```

## Getting Started

### Prerequisites

-   Node.js 18+
-   npm

### Installation

Install dependencies for all packages:

```bash
npm install
```

Build the SDK

```bash
npm run build -w identity-verification-sdk
```

### Development Workflow

#### Option 1: Run the Demo App

The demo app automatically uses the local SDK package:

```bash
cd packages/drone-rental-app
npm run dev
```

Visit `http://localhost:5173` to see the complete drone rental flow with identity verification.

#### Option 2: Develop the SDK

To work on the SDK with hot reloading:

```bash
cd packages/identity-verification-sdk
npm run dev
```

This watches for changes and rebuilds the SDK automatically.

To run the SDK's standalone demo:

```bash
cd packages/identity-verification-sdk
npm run demo
```

## Package Documentation

-   [Identity Verification SDK](./packages/identity-verification-sdk/README.md) - Complete API reference and SDK usage
-   [Drone Rental App](./packages/drone-rental-app/README.md) - Demo application documentation

## Features

### Identity Verification SDK

-   Selfie capture with face detection and quality validation
-   International phone number input with validation
-   Address collection form with country support
-   TypeScript support with full type definitions
-   Tailwind CSS styling
-   Error handling and loading states

### Drone Rental Demo App

-   Browse and select drones from catalog
-   Shopping cart functionality
-   Complete identity verification flow
-   Verification results with scoring
-   Checkout process with verified identity

## Tech Stack

-   **React 19** - UI framework
-   **TypeScript** - Type safety
-   **Tailwind CSS 4** - Styling
-   **Vite** - Build tool and dev server
-   **tsup** - TypeScript library bundler (SDK)
-   **Zustand** - State management (demo app)
-   **react-hook-form** - Form management
-   **Zod** - Schema validation

## Workspace Structure

This project uses npm workspaces for monorepo management. The workspace configuration allows:

-   Shared dependencies across packages
-   Local package linking (drone-rental-app uses the local SDK)
-   Unified dependency installation
-   Independent versioning per package

## Testing

Run tests for the SDK:

```bash
cd packages/identity-verification-sdk
npm test
```

## Considerations & comments

If this was a real world project we could've added numerous necessary features

-   Persist form data in localStorage or IndexedDB to prevent loss on page refresh or accidental navigation.
-   Add support for multiple languages using a library like react-i18next.
-   Extract client (drone-rental-app) buttons, typography etc. into common folder
-   Integrate caching for data like country lists, previous phone inputs, or other API responses using libraries like React Query or SWR.
-   Put more accent on a11y, especially on the SDK side. Ensure all interactive elements are keyboard navigable and properly labeled.
-   Provide a hook into validation for custom validation (country specific validation, state/region validation etc.)

## License

MIT
