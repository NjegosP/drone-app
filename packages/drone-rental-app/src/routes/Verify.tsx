import {
    AddressForm,
    PhoneInput,
    SelfieCapture,
    getIdentityData,
    type Address,
} from 'identity-verification-sdk';
import {useState} from 'react';
import {useNavigate} from 'react-router';
import {Header} from '../components/Header';
import {useStore} from '../store/useStore';

type VerificationStep = 'selfie' | 'phone' | 'address';

export const Verify = () => {
    const navigate = useNavigate();
    const [currentVerifyStep, setCurrentVerifyStep] =
        useState<VerificationStep>('selfie');
    const [isLoading, setIsLoading] = useState(false);
    const [selfieError, setSelfieError] = useState<string | null>(null);
    const {
        selfieUrl,
        phone,
        address,
        verificationData,
        setSelfieUrl,
        setPhone,
        setAddress,
        setVerificationData,
    } = useStore();

    const handleSelfieCapture = (imageData: string) => {
        setSelfieUrl(imageData);
        setSelfieError(null);
        setCurrentVerifyStep('phone');
    };

    const handleSelfieError = (error: string | DOMException) => {
        const errorMessage = typeof error === 'string' ? error : error.message;
        setSelfieError(errorMessage);
        console.error('Selfie capture error:', errorMessage);
    };

    const handlePhoneSubmit = (data: {phoneNumber: string}) => {
        setPhone(data.phoneNumber);
        setCurrentVerifyStep('address');
    };

    const handleAddressSubmit = async (data: Address) => {
        setAddress(data);
        setIsLoading(true);

        try {
            const verificationResult = await getIdentityData({
                selfieUrl: selfieUrl!,
                phone: phone!,
                address: data,
            });

            setVerificationData(verificationResult);
            navigate('/result');
        } catch (error) {
            console.error('Verification error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='min-h-screen bg-white'>
            <Header
                title='Identity Verification'
                subtitle='Complete verification to proceed with checkout'
            />
            <StepIndicator currentVerifyStep={currentVerifyStep} />
            <div className='max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8 w-full'>
                <div className='border border-amber-200 rounded-lg p-4 sm:p-6 m-auto w-full'>
                    {currentVerifyStep === 'selfie' && (
                        <div>
                            <h2 className='text-lg sm:text-xl font-semibold mb-4'>
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
                    {currentVerifyStep === 'phone' && (
                        <div>
                            <h2 className='text-lg sm:text-xl font-semibold mb-4'>
                                Enter Your Phone Number
                            </h2>
                            <PhoneInput onSubmit={handlePhoneSubmit} />
                        </div>
                    )}
                    {currentVerifyStep === 'address' && (
                        <div>
                            <h2 className='text-lg sm:text-xl font-semibold mb-4'>
                                Enter Your Address
                            </h2>
                            <AddressForm onSubmit={handleAddressSubmit} />
                            {isLoading && (
                                <div className='mt-4 text-center text-sm text-gray-600'>
                                    Verifying your identity...
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const Step = ({
    number,
    title,
    isSelected,
}: {
    number: number;
    title: string;
    isSelected: boolean;
}) => (
    <div className='flex items-center gap-1 sm:gap-2'>
        <div
            className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
                isSelected
                    ? 'bg-amber-400 text-black'
                    : 'bg-gray-200 text-gray-600'
            }`}>
            {number}
        </div>
        <span className='text-xs sm:text-sm font-medium hidden sm:inline'>{title}</span>
    </div>
);

const Separator = () => <div className='flex-1 h-px bg-gray-200 mx-2 sm:mx-4' />;

const StepIndicator = ({
    currentVerifyStep,
}: {
    currentVerifyStep: VerificationStep;
}) => (
    <div className='mb-4 sm:mb-6 md:mb-8 px-4 sm:px-6 max-w-3xl mx-auto'>
        <div className='flex items-center justify-between'>
            <Step
                title='Selfie'
                number={1}
                isSelected={currentVerifyStep === 'selfie'}
            />
            <Separator />
            <Step
                title='Phone'
                number={2}
                isSelected={currentVerifyStep === 'phone'}
            />
            <Separator />
            <Step
                title='Address'
                number={3}
                isSelected={currentVerifyStep === 'address'}
            />
        </div>
    </div>
);
