import {Link, redirect} from 'react-router';
import {Header} from '../components/Header';
import {useStore} from '../store/useStore';

export const resultLoader = () => {
    const {verificationData} = useStore.getState();
    if (!verificationData) {
        return redirect('/browse');
    }
    return null;
};

export const Result = () => {
    const {verificationData, resetVerification} = useStore();

    const isVerified = verificationData.status === 'verified';

    return (
        <div className='min-h-screen bg-white'>
            <Header title='Verification Result' />

            <div className='max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8'>
                <div className='border border-amber-200 rounded-lg p-4 sm:p-6'>
                    <div className='text-center mb-4 sm:mb-6'>
                        <div
                            className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                                isVerified
                                    ? 'bg-green-100 text-green-600'
                                    : 'bg-red-100 text-red-600'
                            }`}>
                            {isVerified ? (
                                <svg
                                    className='w-6 h-6 sm:w-8 sm:h-8'
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
                                    className='w-6 h-6 sm:w-8 sm:h-8'
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
                            className={`text-xl sm:text-2xl font-bold mb-2 ${
                                isVerified ? 'text-green-600' : 'text-red-600'
                            }`}>
                            {isVerified
                                ? 'Verification Successful'
                                : 'Verification Failed'}
                        </h2>
                        <p className='text-sm sm:text-base text-gray-600'>
                            Verification Score: {verificationData.score}/100
                        </p>
                    </div>

                    <div className='space-y-4 mb-4 sm:mb-6'>
                        <div>
                            <h3 className='text-sm font-semibold mb-2'>
                                Selfie
                            </h3>
                            <img
                                src={verificationData.selfieUrl}
                                alt='Captured selfie'
                                className='w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-md border border-amber-200'
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
                                <p>{verificationData.address.streetAddress}</p>
                                <p>
                                    {verificationData.address.city},{' '}
                                    {verificationData.address.stateProvince}{' '}
                                    {verificationData.address.zipCode}
                                </p>
                                <p>{verificationData.address.country}</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
                        {isVerified ? (
                            <Link
                                to='/checkout'
                                className='flex-1 py-2 bg-amber-400 text-black rounded-md hover:bg-amber-500 transition-colors font-medium text-center text-sm sm:text-base'>
                                Proceed to Checkout
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to='/verify'
                                    className='flex-1 py-2 bg-amber-400 text-black rounded-md hover:bg-amber-500 transition-colors font-medium text-center text-sm sm:text-base'>
                                    Retry Verification
                                </Link>
                                <Link
                                    to='/browse'
                                    onClick={resetVerification}
                                    className='flex-1 py-2 border border-amber-200 rounded-md hover:bg-gray-50 transition-colors font-medium text-center text-sm sm:text-base'>
                                    Cancel
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
