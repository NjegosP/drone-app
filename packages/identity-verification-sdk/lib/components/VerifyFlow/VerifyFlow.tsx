import {useRef, useState} from 'react';
import type {Address} from '../../types';
import {AddressForm} from '../AddressForm/AddressForm';
import type {AddressFormType} from '../AddressForm/types';
import {PhoneInput} from '../PhoneInput/PhoneInput';
import type {NormalizedPhoneNumber} from '../PhoneInput/types';
import {SelfieCapture} from '../SelfieCapture/SelfieCapture';
import {StepIndicator} from 'lib/common';

type VerificationStep = 'selfie' | 'phone' | 'address';

interface VerifyFlowProps {
    onComplete: (data: {
        selfieUrl: string;
        phone: string;
        address: Address;
    }) => void;
    onError?: (error: string) => void;
}

export const VerifyFlow = ({onComplete, onError}: VerifyFlowProps) => {
    const [currentStep, setCurrentStep] = useState<VerificationStep>('selfie');
    const [selfieUrl, setSelfieUrl] = useState<string | null>(null);
    const [phone, setPhone] = useState<string | null>(null);
    // const [address, setAddress] = useState<Address | null>(null);
    const [selfieError, setSelfieError] = useState<string | null>(null);

    const phoneSubmitRef = useRef<HTMLButtonElement | null>(null);
    const addressSubmitRef = useRef<HTMLButtonElement | null>(null);

    const handleSelfieCapture = (imageData: string) => {
        setSelfieUrl(imageData);
        setSelfieError(null);
    };

    const handleSelfieError = (error: string | DOMException) => {
        const errorMessage = typeof error === 'string' ? error : error.message;
        setSelfieError(errorMessage);
        onError?.(errorMessage);
    };

    const handlePhoneSubmit = (data: NormalizedPhoneNumber) => {
        setPhone(data.phoneNumber);
        setCurrentStep('address');
    };

    const handleAddressSubmit = (data: AddressFormType) => {
        // setAddress(data);
        if (selfieUrl && phone) {
            onComplete({
                selfieUrl,
                phone,
                address: data,
            });
        }
    };

    const handleContinue = () => {
        if (currentStep === 'selfie' && selfieUrl) {
            setCurrentStep('phone');
        } else if (currentStep === 'phone') {
            phoneSubmitRef.current?.click();
        } else if (currentStep === 'address') {
            addressSubmitRef.current?.click();
        }
    };

    const canContinue = () => {
        if (currentStep === 'selfie') return !!selfieUrl;
        if (currentStep === 'phone') return true;
        if (currentStep === 'address') return true;
        return false;
    };

    return (
        <div className='flex flex-col min-h-125'>
            <StepIndicator currentStep={currentStep} />
            <div className='flex-1 py-6'>
                {currentStep === 'selfie' && (
                    <div>
                        <h2 className='text-lg sm:text-xl font-semibold mb-4 text-center'>
                            Capture Your Selfie
                        </h2>
                        <SelfieCapture
                            onCapture={handleSelfieCapture}
                            onError={handleSelfieError}
                        />
                        {selfieError && (
                            <div className='mt-4 p-3 bg-red-50 border border-red-200 rounded-lg'>
                                <p className='text-red-700 text-sm text-center'>
                                    {selfieError}
                                </p>
                            </div>
                        )}
                    </div>
                )}
                {currentStep === 'phone' && (
                    <div>
                        <h2 className='text-lg sm:text-xl font-semibold mb-4'>
                            Enter Your Phone Number
                        </h2>
                        <PhoneInput
                            onSubmit={handlePhoneSubmit}
                            submitButtonRef={phoneSubmitRef}
                        />
                    </div>
                )}
                {currentStep === 'address' && (
                    <div>
                        <h2 className='text-lg sm:text-xl font-semibold mb-4'>
                            Enter Your Address
                        </h2>
                        <AddressForm
                            onSubmit={handleAddressSubmit}
                            submitButtonRef={addressSubmitRef}
                        />
                    </div>
                )}
            </div>

            <div className='border-t border-amber-200 pt-4'>
                <button
                    onClick={handleContinue}
                    disabled={!canContinue()}
                    className='w-full py-2.5 bg-amber-400 text-black rounded-md hover:bg-amber-500 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-amber-400'>
                    {currentStep === 'address' ? 'Submit' : 'Continue'}
                </button>
            </div>
        </div>
    );
};

const VerifyModule = ({title, component}) => {};
