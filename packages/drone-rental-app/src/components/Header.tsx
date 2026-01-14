import {useRef, useState} from 'react';
import {Link} from 'react-router';
import {useStore} from '../store/useStore';
import {Cart} from './Cart';

type HeaderProps = {
    title?: string;
    subtitle?: string;
};

export const Header = ({title = 'SkyRent Drones', subtitle}: HeaderProps) => {
    const {cart} = useStore();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const cartItemCount = cart.reduce((sum) => sum + 1, 0);

    return (
        <header className='border-b border-amber-200 bg-white sticky top-0 z-10'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4'>
                <div className='flex items-center justify-between'>
                    <Link to='/' className='cursor-pointer'>
                        <h1 className='text-lg sm:text-xl md:text-2xl font-bold'>{title}</h1>
                        {subtitle && (
                            <p className='text-xs sm:text-sm text-gray-600 hidden sm:block'>{subtitle}</p>
                        )}
                    </Link>

                    <div className='lg:hidden relative' ref={dropdownRef}>
                        <button
                            onClick={() => setIsCartOpen(!isCartOpen)}
                            className='relative p-2 hover:bg-gray-100 rounded-lg transition-colors'>
                            <svg
                                className='w-6 h-6'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                                />
                            </svg>
                            {cartItemCount > 0 && (
                                <span className='absolute -top-1 -right-1 bg-amber-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'>
                                    {cartItemCount}
                                </span>
                            )}
                        </button>

                        {isCartOpen && (
                            <div className='absolute right-0 mt-2 w-80 max-w-[calc(100vw-3rem)] bg-white shadow-lg rounded-lg border border-amber-200 max-h-[calc(100vh-8rem)] overflow-y-auto'>
                                <Cart />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};
