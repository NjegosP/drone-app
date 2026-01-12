# SkyRent Drones - Demo Application

A drone rental application demonstrating integration with the Identity Verification SDK.

## Features

- Browse and select drones from two categories (Filming & Cargo)
- Add drones to cart with customizable rental duration
- Complete identity verification before checkout
- Step-by-step verification flow (Selfie → Phone → Address)
- View verification results with pass/fail status
- Complete checkout with verified identity information

## Prerequisites

- Node.js 18+
- npm or yarn

## Installation

```bash
npm install
```

## Running the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## User Flow

1. **Browse Drones**: Select drones from the catalog and add them to your cart
2. **Proceed to Verification**: Click "Proceed to Verification" from the cart
3. **Identity Verification**:
   - Capture a selfie using your webcam
   - Enter your phone number with country code
   - Fill in your complete address
4. **View Results**: See your verification score (random 0-100)
   - Score ≥ 50: Proceed to checkout
   - Score < 50: Retry verification or cancel
5. **Checkout**: Review your order and verified identity, then complete rental

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS 4
- Zustand (state management)
- Vite (build tool)
- Identity Verification SDK (local dependency)

## Project Structure

```
src/
├── components/     # Reusable UI components
├── data/          # Static data (drone inventory)
├── pages/         # Main application pages
├── store/         # Zustand state management
└── types.ts       # TypeScript type definitions
```
