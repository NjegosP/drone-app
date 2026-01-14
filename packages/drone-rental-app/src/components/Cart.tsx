import {Link} from 'react-router';
import {useStore} from '../store/useStore';

export const Cart = () => {
    const {cart, removeFromCart} = useStore();

    const total = cart.reduce(
        (sum, item) => sum + item.drone.dailyPrice * item.days,
        0
    );

    if (cart.length === 0) {
        return (
            <div className='border border-amber-200 rounded-lg p-3 sm:p-4'>
                <h2 className='text-lg sm:text-xl font-semibold mb-3 sm:mb-4'>Cart</h2>
                <p className='text-gray-500 text-sm'>Your cart is empty</p>
            </div>
        );
    }

    return (
        <div className='border border-amber-200 rounded-lg p-3 sm:p-4'>
            <h2 className='text-lg sm:text-xl font-semibold mb-3 sm:mb-4'>Cart</h2>
            <div className='space-y-2 sm:space-y-3 mb-3 sm:mb-4'>
                {cart.map((item) => (
                    <div
                        key={item.drone.id}
                        className='flex justify-between items-start pb-2 sm:pb-3 border-b border-amber-100'>
                        <div className='flex-1'>
                            <p className='font-medium text-sm'>
                                {item.drone.name}
                            </p>
                            <p className='text-xs text-gray-600'>
                                {item.days} day{item.days > 1 ? 's' : ''} × $
                                {item.drone.dailyPrice}
                            </p>
                        </div>
                        <div className='text-right ml-2'>
                            <p className='font-medium text-sm'>
                                ${item.drone.dailyPrice * item.days}
                            </p>
                            <button
                                onClick={() => removeFromCart(item.drone.id)}
                                className='text-xs text-red-500 hover:text-red-600'>
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className='pt-3 border-t border-amber-200'>
                <div className='flex justify-between items-center mb-3 sm:mb-4'>
                    <span className='font-semibold text-sm sm:text-base'>Total:</span>
                    <span className='font-semibold text-base sm:text-lg'>${total}</span>
                </div>
                <Link
                    to='/verify'
                    className='block w-full py-2 bg-amber-400 text-black rounded-md hover:bg-amber-500 transition-colors font-medium text-center text-sm sm:text-base'>
                    Proceed to Verification
                </Link>
            </div>
        </div>
    );
};
