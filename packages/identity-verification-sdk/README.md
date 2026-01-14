# Identity Verification SDK

A React SDK for identity verification with selfie capture, phone validation, and address collection.

## Features

-   **SelfieCapture**: Camera-based selfie capture component
-   **PhoneInput**: International phone number input with validation
-   **AddressForm**: Complete address collection with country selection
-   **getIdentityData**: API integration for identity verification

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

// Capture selfie with error handling
<SelfieCapture
  onCapture={(imageData) => console.log(imageData)}
  onError={(error) => console.error(error)}
  videoConstraints={{ width: 1280, height: 720, facingMode: 'user' }}
/>

// Collect phone number
<PhoneInput onSubmit={(data) => console.log(data.phoneNumber)} />

// Collect address
<AddressForm onSubmit={(address) => console.log(address)} />


// Use the whole configurable flow
 <VerifyFlow
    flowConfig={[
        {module: 'selfie'},
        {module: 'phone'},
        {module: 'address'},
    ]}
    onComplete={handleComplete}
    onError={handleError}
/>

// Verify identity
const result = await getIdentityData({
  selfieUrl: '...',
  phone: '+1234567890',
  address: { ... }
});
```

## API Reference

### SelfieCapture

Component for capturing selfies using the device camera with built-in face detection and quality validation.

**Props:**

-   `onCapture: (imageData: string) => void` - Callback fired when a valid selfie is captured. Receives base64 image data.
-   `onError?: (error: string | DOMException) => void` - Optional callback for handling errors (camera permissions, image processing failures).
-   `videoConstraints?: MediaTrackConstraints` - Optional webcam configuration (resolution, facing mode, etc.).

**Features:**

-   Built-in face guide overlay
-   Image quality validation
-   Automatic error handling for camera permissions
-   Loading states during processing
-   Retake functionality

### PhoneInput

International phone number input with validation.

**Props:**

-   `onSubmit: (data: { phoneNumber: string }) => void` - Callback fired when a valid phone number is submitted.

**Features:**

-   Country code selection with flags
-   Real-time validation using libphonenumber-js
-   Support for international formats

### AddressForm

Complete address collection form.

**Props:**

-   `onSubmit: (address: Address) => void` - Callback fired when form is submitted with valid data.
-   `initialValues?: Partial<Address>` - Optional initial form values.

**Address Type:**

```tsx
interface Address {
    streetAddress: string;
    city: string;
    stateProvince: string;
    country: string;
    zipCode: string;
}
```

### getIdentityData

Utility function to submit verification data and receive identity verification results.

**Parameters:**

```tsx
{
    selfieUrl: string;
    phone: string;
    address: Address;
}
```

**Returns:**

```tsx
Promise<IdentityData>;

interface IdentityData {
    selfieUrl: string;
    phone: string;
    address: Address;
    score: number; // 0-100 verification confidence score
    status: 'verified' | 'failed';
}
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
