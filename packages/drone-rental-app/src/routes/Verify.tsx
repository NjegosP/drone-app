import {VerifyFlow, type IdentityData} from 'identity-verification-sdk';
import {useNavigate} from 'react-router';
import {useStore} from '../store/useStore';

export const Verify = () => {
    const navigate = useNavigate();
    const {setVerificationData} = useStore();

    const handleComplete = (data: IdentityData) => {
        setVerificationData(data);
        navigate('/result');
    };

    const handleError = (error: string) => {
        console.error('Verification error:', error);
    };

    return (
        <div className='max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8 w-full'>
            <div className='border border-amber-200 rounded-lg p-4 sm:p-6 m-auto w-full'>
                <VerifyFlow
                    flowConfig={[
                        {module: 'selfie'},
                        {module: 'phone'},
                        {module: 'address'},
                    ]}
                    onComplete={handleComplete}
                    onError={handleError}
                />
            </div>
        </div>
    );
};
