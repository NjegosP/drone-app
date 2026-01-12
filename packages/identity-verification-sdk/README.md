# Identity Verification SDK

A React SDK for identity verification with selfie capture, phone validation, and address collection.

## Features

- **SelfieCapture**: Camera-based selfie capture component
- **PhoneInput**: International phone number input with validation
- **AddressForm**: Complete address collection with country selection
- **getIdentityData**: API integration for identity verification

## Installation

```bash
npm install identity-verification-sdk
```

## Usage

```tsx
import {
  SelfieCapture,
  PhoneInput,
  AddressForm,
  getIdentityData,
  type Address,
} from 'identity-verification-sdk';

// Capture selfie
<SelfieCapture onCapture={(imageData) => console.log(imageData)} />

// Collect phone number
<PhoneInput onSubmit={(data) => console.log(data.phoneNumber)} />

// Collect address
<AddressForm onSubmit={(address) => console.log(address)} />

// Verify identity
const result = await getIdentityData({
  selfieUrl: '...',
  phone: '+1234567890',
  address: { ... }
});
```

## Development

### Build the SDK

```bash
npm run build
```

### Watch mode (for development)

```bash
npm run dev
```

### Run the demo app

The SDK includes a demo app that showcases all components:

```bash
npm run demo
```

This will start a Vite dev server at `http://localhost:5173` with a complete identity verification flow.

### Run tests

```bash
npm test
```

## Demo App

The `src/` directory contains a demo application that demonstrates all SDK components in a complete verification flow:

1. Selfie capture
2. Phone number input
3. Address collection
4. Result display

You can use this as a reference implementation or for testing during development.

## License

MIT
