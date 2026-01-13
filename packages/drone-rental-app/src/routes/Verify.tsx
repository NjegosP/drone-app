import {
    AddressForm,
    PhoneInput,
    SelfieCapture,
    getIdentityData,
    type Address,
} from 'identity-verification-sdk';
import {useState, useRef} from 'react';
import {redirect, Form, useNavigation} from 'react-router';
import {Header} from '../components/Header';
import {useStore} from '../store/useStore';

export const verifyAction = async ({request}: {request: Request}) => {
    const formData = await request.formData();
    const selfieUrl = formData.get('selfieUrl') as string;
    const phone = formData.get('phone') as string;
    const address = JSON.parse(formData.get('address') as string) as Address;

    try {
        const verificationResult = await getIdentityData({
            selfieUrl,
            phone,
            address,
        });

        useStore.getState().setVerificationData(verificationResult);
        useStore.getState().setAddress(address);
        return redirect('/result');
    } catch (error) {
        console.error('Verification error:', error);
        throw error;
    }
};

type VerificationStep = 'selfie' | 'phone' | 'address';

export const Verify = () => {
    const navigation = useNavigation();
    const formRef = useRef<HTMLFormElement>(null);
    const [currentVerifyStep, setCurrentVerifyStep] =
        useState<VerificationStep>('selfie');
    const [pendingAddress, setPendingAddress] = useState<Address | null>(null);
    const {selfieUrl, phone, setSelfieUrl, setPhone} = useStore();

    const isSubmitting = navigation.state === 'submitting';

    const handleSelfieCapture = (imageData: string) => {
        setSelfieUrl(imageData);
        setCurrentVerifyStep('phone');
    };

    const handlePhoneSubmit = (data: {phoneNumber: string}) => {
        setPhone(data.phoneNumber);
        setCurrentVerifyStep('address');
    };

    const handleAddressSubmit = (data: Address) => {
        console.log(data);
        setPendingAddress(data);
        // Submit the form programmatically
        setTimeout(() => formRef.current?.requestSubmit(), 0);
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
                <Form ref={formRef} method='post'>
                    <input
                        type='hidden'
                        name='selfieUrl'
                        value={selfieUrl || ''}
                    />
                    <input type='hidden' name='phone' value={phone || ''} />
                    <input
                        type='hidden'
                        name='address'
                        value={pendingAddress ? JSON.stringify(pendingAddress) : ''}
                    />
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
                                {isSubmitting && (
                                    <div className='mt-4 text-center text-sm text-gray-600'>
                                        Verifying your identity...
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </Form>
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
