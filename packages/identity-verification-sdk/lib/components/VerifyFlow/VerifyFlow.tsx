import {useState} from 'react';
import {StepIndicator, type ModuleConfig} from '../../common';
import type {Address, IdentityData} from '../../types';
import {getIdentityData} from '../../utils/getIdentityData';
import {AddressForm} from '../AddressForm/AddressForm';
import type {AddressFormType} from '../AddressForm/types';
import {PhoneInput} from '../PhoneInput/PhoneInput';
import type {NormalizedPhoneNumber} from '../PhoneInput/types';
import {SelfieCapture} from '../SelfieCapture/SelfieCapture';

interface CollectedData {
    selfieUrl?: string;
    phone?: string;
    address?: Address;
}

interface VerifyFlowProps {
    flowConfig: ModuleConfig[];
    onComplete: (data: IdentityData) => void;
    onError?: (error: string) => void;
}

export const VerifyFlow = ({flowConfig, onComplete, onError}: VerifyFlowProps) => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [collectedData, setCollectedData] = useState<CollectedData>({});
    const [isLoading, setIsLoading] = useState(false);

    const currentModule = flowConfig[currentStepIndex].module;
    const isLastStep = currentStepIndex === flowConfig.length - 1;

    const goToNextStep = async (data: Partial<CollectedData>) => {
        const updatedData = {...collectedData, ...data};
        setCollectedData(updatedData);

        if (isLastStep) {
            setIsLoading(true);
            try {
                const result = await getIdentityData({
                    selfieUrl: updatedData.selfieUrl!,
                    phone: updatedData.phone!,
                    address: updatedData.address!,
                });
                onComplete(result);
            } catch (error) {
                onError?.(error instanceof Error ? error.message : 'Verification failed');
            } finally {
                setIsLoading(false);
            }
        } else {
            setCurrentStepIndex(prev => prev + 1);
        }
    };

    const handleSelfieSubmit = (imageData: string) => {
        goToNextStep({selfieUrl: imageData});
    };

    const handleSelfieError = (error: string | DOMException) => {
        const errorMessage = typeof error === 'string' ? error : error.message;
        onError?.(errorMessage);
    };

    const handlePhoneSubmit = (data: NormalizedPhoneNumber) => {
        goToNextStep({phone: data.phoneNumber});
    };

    const handleAddressSubmit = (data: AddressFormType) => {
        goToNextStep({address: data});
    };

    const renderModule = () => {
        switch (currentModule) {
            case 'selfie':
                return (
                    <SelfieCapture
                        onCapture={handleSelfieSubmit}
                        onError={handleSelfieError}
                    />
                );
            case 'phone':
                return <PhoneInput onSubmit={handlePhoneSubmit} />;
            case 'address':
                return <AddressForm onSubmit={handleAddressSubmit} />;
            default:
                return null;
        }
    };

    if (isLoading) {
        return (
            <div className='flex flex-col items-center justify-center py-8'>
                <div className='w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin' />
                <p className='mt-4 text-sm text-gray-600'>Verifying your identity...</p>
            </div>
        );
    }

    return (
        <div className='flex flex-col'>
            <StepIndicator flowConfig={flowConfig} currentModule={currentModule} />
            {renderModule()}
        </div>
    );
};
