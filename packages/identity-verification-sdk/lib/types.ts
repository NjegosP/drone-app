export interface Address {
    streetAddress: string;
    city: string;
    stateProvince: string;
    country: string;
    zipCode: string;
}

export interface IdentityData {
    selfieUrl: string;
    phone: string;
    address: Address;
    score: number;
    status: 'verified' | 'failed';
}

export interface SelfieCaptureProp {
    onCapture: (imageData: string) => void;
    onError?: (error: string | DOMException) => void;
}

export interface PhoneInputProps {
    value: string;
    onChange: (phone: string) => void;
    onValidation?: (isValid: boolean) => void;
}

export interface AddressFormProps {
    onSubmit: (address: Address) => void;
    initialValues?: Partial<Address>;
}
