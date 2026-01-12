import {
    AddressForm,
    PhoneInput,
    SelfieCapture,
    getIdentityData,
    type Address,
} from 'identity-verification-sdk';
import {useState} from 'react';
import {useStore} from '../store/useStore';

type VerificationStep = 'selfie' | 'phone' | 'address';

export const VerifyPage = () => {
    const [currentVerifyStep, setCurrentVerifyStep] =
        useState<VerificationStep>('selfie');
    const [isLoading, setIsLoading] = useState(false);
    const {
        selfieUrl,
        phone,
        address,
        verificationData,
        setSelfieUrl,
        setPhone,
        setAddress,
        setVerificationData,
        setCurrentStep,
    } = useStore();

    const handleSelfieCapture = (imageData: string) => {
        setSelfieUrl(imageData);
        setCurrentVerifyStep('phone');
    };

    console.log('VD', verificationData);

    const handlePhoneSubmit = (data: {phoneNumber: string}) => {
        setPhone(data.phoneNumber);
        setCurrentVerifyStep('address');
    };

    console.log(address);

    const handleAddressSubmit = async (address: Address) => {
        console.log(address);
        setAddress(address);
        setIsLoading(true);

        try {
            const verificationResult = await getIdentityData({
                selfieUrl: selfieUrl!,
                phone: phone!,
                address,
            });

            setVerificationData(verificationResult);
            setCurrentStep('result');
        } catch (error) {
            console.error('Verification error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='min-h-screen bg-white'>
            <header className='border-b border-amber-200 bg-white sticky top-0 z-10'>
                <div className='max-w-7xl mx-auto px-6 py-4'>
                    <h1 className='text-2xl font-bold'>
                        Identity Verification
                    </h1>
                    <p className='text-sm text-gray-600'>
                        Complete verification to proceed with checkout
                    </p>
                </div>
            </header>

            <div className='max-w-3xl mx-auto px-6 py-8'>
                <div className='mb-8'>
                    <div className='flex items-center justify-between mb-4'>
                        <div className='flex items-center gap-2'>
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                    currentVerifyStep === 'selfie'
                                        ? 'bg-amber-400 text-black'
                                        : selfieUrl
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-200 text-gray-600'
                                }`}>
                                1
                            </div>
                            <span className='text-sm font-medium'>Selfie</span>
                        </div>
                        <div className='flex-1 h-px bg-gray-200 mx-4' />
                        <div className='flex items-center gap-2'>
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                    currentVerifyStep === 'phone'
                                        ? 'bg-amber-400 text-black'
                                        : phone
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-200 text-gray-600'
                                }`}>
                                2
                            </div>
                            <span className='text-sm font-medium'>Phone</span>
                        </div>
                        <div className='flex-1 h-px bg-gray-200 mx-4' />
                        <div className='flex items-center gap-2'>
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                    currentVerifyStep === 'address'
                                        ? 'bg-amber-400 text-black'
                                        : address
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-200 text-gray-600'
                                }`}>
                                3
                            </div>
                            <span className='text-sm font-medium'>Address</span>
                        </div>
                    </div>
                </div>

                <div className='border border-amber-200 rounded-lg p-6'>
                    {currentVerifyStep === 'selfie' && (
                        <div>
                            <h2 className='text-xl font-semibold mb-4'>
                                Capture Your Selfie
                            </h2>
                            <SelfieCapture onCapture={handleSelfieCapture} />
                        </div>
                    )}

                    {currentVerifyStep === 'phone' && (
                        <div>
                            <h2 className='text-xl font-semibold mb-4'>
                                Enter Your Phone Number
                            </h2>
                            <PhoneInput onSubmit={handlePhoneSubmit} />
                        </div>
                    )}

                    {currentVerifyStep === 'address' && (
                        <div>
                            <h2 className='text-xl font-semibold mb-4'>
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
