import type {FieldError} from 'react-hook-form';

export const ValidationError = ({
    error,
    id,
}: {
    error: FieldError | undefined;
    id?: string;
}) => {
    if (!error) return null;

    return (
        <span
            id={id}
            className='text-xs text-red-500 mt-1'
            role='alert'
            aria-live='polite'>
            {error.message}
        </span>
    );
};
