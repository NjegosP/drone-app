import {VerifyFlow, getIdentityData} from 'identity-verification-sdk';
import {useState} from 'react';
import {useNavigate} from 'react-router';
import {Header} from '../components/Header';
import {useStore} from '../store/useStore';

export const Verify = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const {setVerificationData} = useStore();

    const handleComplete = async (data: {
        selfieUrl: string;
        phone: string;
        address: {
            streetAddress: string;
            city: string;
            stateProvince: string;
            country: string;
            zipCode: string;
        };
    }) => {
        setIsLoading(true);

        try {
            const verificationResult = await getIdentityData({
                selfieUrl: data.selfieUrl,
                phone: data.phone,
                address: data.address,
            });

            setVerificationData(verificationResult);
            navigate('/result');
        } catch (error) {
            console.error('Verification error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleError = (error: string) => {
        console.error('Verification error:', error);
    };

    return (
        <div className='min-h-screen bg-white'>
            <Header
                title='Identity Verification'
                subtitle='Complete verification to proceed with checkout'
            />
            <div className='max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8 w-full'>
                <div className='border border-amber-200 rounded-lg p-4 sm:p-6 m-auto w-full'>
                    <VerifyFlow onComplete={handleComplete} onError={handleError} />
                    {isLoading && (
                        <div className='mt-4 text-center text-sm text-gray-600'>
                            Verifying your identity...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
