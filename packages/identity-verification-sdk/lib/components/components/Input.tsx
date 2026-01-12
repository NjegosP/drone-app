// TO DO - Research clsx a bit
import clsx from 'clsx';
import {forwardRef} from 'react';
import {basicInputStyles} from './util';

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({className, error, ...props}, ref) => {
        return (
            <input
                ref={ref}
                className={clsx(
                    basicInputStyles,
                    error && 'border-red-500 focus:ring-red-500',
                    className
                )}
                aria-invalid={error ? 'true' : 'false'}
                {...props}
            />
        );
    }
);

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    error?: boolean;
};
