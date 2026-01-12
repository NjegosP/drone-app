import {
    AddressForm,
    PhoneInput,
    SelfieCapture,
    getIdentityData,
    type Address,
} from 'identity-verification-sdk';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Header} from '../components/Header';
import {useStore} from '../store/useStore';

type VerificationStep = 'selfie' | 'phone' | 'address';

export const VerifyPage = () => {
    const navigate = useNavigate();
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

    const handleAddressSubmit = async (data: Address) => {
        console.log(data);
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

            <div className='max-w-3xl mx-auto px-6 py-8 w-full'>
                <div className='mb-8'>
                    <div className='flex items-center justify-between mb-4'>
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

                <div className='border border-amber-200 rounded-lg p-6 m-auto w-full'>
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
                        <div className='m-auto border-amber-950 border-2'>
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

const Step = ({
    number,
    title,
    isSelected,
}: {
    number: number;
    title: string;
    isSelected: boolean;
}) => (
    <div className='flex items-center gap-2'>
        <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                isSelected
                    ? 'bg-amber-400 text-black'
                    : 'bg-gray-200 text-gray-600'
            }`}>
            {number}
        </div>
        <span className='text-sm font-medium'>{title}</span>
    </div>
);

const Separator = () => <div className='flex-1 h-px bg-gray-200 mx-4' />;
