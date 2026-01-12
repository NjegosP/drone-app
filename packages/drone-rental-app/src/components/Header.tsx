import {useNavigate} from 'react-router-dom';
import {useStore} from '../store/useStore';

type HeaderProps = {
    title?: string;
    subtitle?: string;
};

export const Header = ({
    title = 'SkyRent Drones',
    subtitle,
}: HeaderProps) => {
    const navigate = useNavigate();
    const {cart} = useStore();

    const cartItemCount = cart.reduce((sum, item) => sum + 1, 0);

    return (
        <header className='border-b border-amber-200 bg-white sticky top-0 z-10'>
            <div className='max-w-7xl mx-auto px-6 py-4'>
                <div className='flex items-center justify-between'>
                    <div
                        onClick={() => navigate('/browse')}
                        className='cursor-pointer'>
                        <h1 className='text-2xl font-bold'>{title}</h1>
                        {subtitle && (
                            <p className='text-sm text-gray-600'>{subtitle}</p>
                        )}
                    </div>

                    <button
                        onClick={() => navigate('/browse')}
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
                </div>
            </div>
        </header>
    );
};
