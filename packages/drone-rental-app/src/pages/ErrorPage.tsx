import {Link, useRouteError, isRouteErrorResponse} from 'react-router';
import {Header} from '../components/Header';

export const ErrorPage = () => {
    const error = useRouteError();

    let errorMessage = 'An unexpected error occurred';
    let errorStatus = '500';

    if (isRouteErrorResponse(error)) {
        errorStatus = error.status.toString();
        errorMessage = error.statusText || error.data?.message || errorMessage;

        if (error.status === 404) {
            errorMessage = "Oops! We couldn't find that page";
        }
    } else if (error instanceof Error) {
        errorMessage = error.message;
    }

    return (
        <div className='min-h-screen bg-white'>
            <Header />

            <div className='max-w-3xl mx-auto px-6 py-16'>
                <div className='border border-amber-200 rounded-lg p-8 text-center'>
                    <div className='w-20 h-20 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-6'>
                        <svg
                            className='w-10 h-10'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'>
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                            />
                        </svg>
                    </div>

                    <h1 className='text-6xl font-bold text-gray-800 mb-2'>
                        {errorStatus}
                    </h1>
                    <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
                        {errorMessage}
                    </h2>

                    <p className='text-gray-600 mb-8'>
                        {errorStatus === '404'
                            ? "The page you're looking for doesn't exist or has been moved."
                            : 'Something went wrong. Please try again later.'}
                    </p>

                    <div className='flex gap-4 justify-center'>
                        <Link
                            to='/browse'
                            className='py-2 px-6 bg-amber-400 text-black rounded-md hover:bg-amber-500 transition-colors font-medium'>
                            Go to Homepage
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
