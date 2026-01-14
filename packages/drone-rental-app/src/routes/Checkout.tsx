import {useState} from 'react';
import {Link} from 'react-router';
import {useStore} from '../store/useStore';

export const Checkout = () => {
    const {cart, verificationData, clearCart, resetVerification} = useStore();
    const [isCompleted, setIsCompleted] = useState(false);

    const total = cart.reduce(
        (sum, item) => sum + item.drone.dailyPrice * item.days,
        0
    );

    const handleCompleteRental = () => {
        setIsCompleted(true);
    };

    const handleStartOver = () => {
        clearCart();
        resetVerification();
    };

    if (isCompleted) {
        return (
            <div className='max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8'>
                <div className='border border-amber-200 rounded-lg p-4 sm:p-6 text-center'>
                    <div className='w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4'>
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
                    </div>
                    <h2 className='text-xl sm:text-2xl font-bold mb-2'>
                        Rental Confirmed!
                    </h2>
                    <p className='text-sm sm:text-base text-gray-600 mb-4 sm:mb-6'>
                        Your drone rental has been successfully completed.
                        Check your email for confirmation details.
                    </p>
                    <Link
                        to='/'
                        onClick={handleStartOver}
                        className='inline-block py-2 px-4 sm:px-6 bg-amber-400 text-black rounded-md hover:bg-amber-500 transition-colors font-medium text-sm sm:text-base'>
                        Browse More Drones
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className='max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8'>
                <div className='space-y-4 sm:space-y-6'>
                    <div className='border border-amber-200 rounded-lg p-4 sm:p-6'>
                        <h2 className='text-lg sm:text-xl font-semibold mb-4'>
                            Rental Summary
                        </h2>
                        <div className='space-y-3'>
                            {cart.map((item) => (
                                <div
                                    key={item.drone.id}
                                    className='flex justify-between items-center pb-3 border-b border-amber-100 last:border-b-0'>
                                    <div>
                                        <p className='font-medium'>
                                            {item.drone.name}
                                        </p>
                                        <p className='text-sm text-gray-600'>
                                            {item.days} day
                                            {item.days > 1 ? 's' : ''} × $
                                            {item.drone.dailyPrice}
                                        </p>
                                    </div>
                                    <p className='font-semibold'>
                                        ${item.drone.dailyPrice * item.days}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className='pt-4 mt-4 border-t border-amber-200 flex justify-between items-center'>
                            <span className='text-base sm:text-lg font-semibold'>
                                Total:
                            </span>
                            <span className='text-xl sm:text-2xl font-bold'>
                                ${total}
                            </span>
                        </div>
                    </div>

                    <div className='border border-amber-200 rounded-lg p-4 sm:p-6'>
                        <h2 className='text-lg sm:text-xl font-semibold mb-4'>
                            Verified Identity
                        </h2>
                        <div className='space-y-4'>
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
                                    <p>
                                        {verificationData.address.streetAddress}
                                    </p>
                                    <p>
                                        {verificationData.address.city},{' '}
                                        {verificationData.address.stateProvince}{' '}
                                        {verificationData.address.zipCode}
                                    </p>
                                    <p>{verificationData.address.country}</p>
                                </div>
                            </div>

                            <div>
                                <h3 className='text-sm font-semibold mb-2'>
                                    Verification Status
                                </h3>
                                <div className='flex items-center gap-2'>
                                    <div className='w-2 h-2 bg-green-500 rounded-full' />
                                    <span className='text-sm text-green-600 font-medium'>
                                        Verified (Score:{' '}
                                        {verificationData.score})
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleCompleteRental}
                        className='w-full py-2.5 sm:py-3 bg-amber-400 text-black rounded-md hover:bg-amber-500 transition-colors font-semibold text-base sm:text-lg'>
                        Complete Rental
                    </button>
            </div>
        </div>
    );
};
