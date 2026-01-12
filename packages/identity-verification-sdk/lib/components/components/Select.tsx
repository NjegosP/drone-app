import clsx from 'clsx';
import {forwardRef} from 'react';
import {basicInputStyles} from './util';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
    error?: boolean;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({className, children, error, ...props}, ref) => {
        return (
            <select
                ref={ref}
                className={clsx(
                    basicInputStyles,
                    error && 'border-red-500 focus:ring-red-500',
                    className
                )}
                aria-invalid={error ? 'true' : 'false'}
                {...props}>
                {children}
            </select>
        );
    }
);
