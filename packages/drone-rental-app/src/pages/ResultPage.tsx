import {useNavigate} from 'react-router-dom';
import {Header} from '../components/Header';
import {useStore} from '../store/useStore';

export const ResultPage = () => {
    const navigate = useNavigate();
    const {verificationData, resetVerification} = useStore();

    if (!verificationData) {
        return null;
    }

    console.log(verificationData);

    const isVerified = verificationData.status === 'verified';

    return (
        <div className='min-h-screen bg-white'>
            <Header title='Verification Result' />

            <div className='max-w-3xl mx-auto px-6 py-8'>
                <div className='border border-amber-200 rounded-lg p-6'>
                    <div className='text-center mb-6'>
                        <div
                            className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                                isVerified
                                    ? 'bg-green-100 text-green-600'
                                    : 'bg-red-100 text-red-600'
                            }`}>
                            {isVerified ? (
                                <svg
                                    className='w-8 h-8'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M5 13l4 4L19 7'
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className='w-8 h-8'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M6 18L18 6M6 6l12 12'
                                    />
                                </svg>
                            )}
                        </div>
                        <h2
                            className={`text-2xl font-bold mb-2 ${
                                isVerified ? 'text-green-600' : 'text-red-600'
                            }`}>
                            {isVerified
                                ? 'Verification Successful'
                                : 'Verification Failed'}
                        </h2>
                        <p className='text-gray-600'>
                            Verification Score: {verificationData.score}/100
                        </p>
                    </div>

                    <div className='space-y-4 mb-6'>
                        <div>
                            <h3 className='text-sm font-semibold mb-2'>
                                Selfie
                            </h3>
                            <img
                                src={verificationData.selfieUrl}
                                alt='Captured selfie'
                                className='w-32 h-32 object-cover rounded-md border border-amber-200'
                            />
                        </div>

                        <div>
                            <h3 className='text-sm font-semibold mb-2'>
                                Phone Number
                            </h3>
                            <p className='text-sm text-gray-700'>
                                {verificationData.phone}
                            </p>
                        </div>

                        <div>
                            <h3 className='text-sm font-semibold mb-2'>
                                Address
                            </h3>
                            <div className='text-sm text-gray-700'>
                                <p>{verificationData.address.street}</p>
                                <p>
                                    {verificationData.address.city},{' '}
                                    {verificationData.address.state}{' '}
                                    {verificationData.address.postalCode}
                                </p>
                                <p>{verificationData.address.country}</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex gap-4'>
                        {isVerified ? (
                            <button
                                onClick={() => navigate('/checkout')}
                                className='flex-1 py-2 bg-amber-400 text-black rounded-md hover:bg-amber-500 transition-colors font-medium'>
                                Proceed to Checkout
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={() => navigate('/verify')}
                                    className='flex-1 py-2 bg-amber-400 text-black rounded-md hover:bg-amber-500 transition-colors font-medium'>
                                    Retry Verification
                                </button>
                                <button
                                    onClick={() => {
                                        resetVerification();
                                        navigate('/browse');
                                    }}
                                    className='flex-1 py-2 border border-amber-200 rounded-md hover:bg-gray-50 transition-colors font-medium'>
                                    Cancel
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
