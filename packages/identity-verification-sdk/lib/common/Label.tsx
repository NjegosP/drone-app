import {forwardRef, type LabelHTMLAttributes, type ReactNode} from 'react';
import clsx from 'clsx';

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
    ({children, className, error, ...props}, ref) => {
        return (
            <label
                ref={ref}
                className={clsx(
                    'block text-sm font-medium',
                    {'text-red-500': error},
                    className
                )}
                {...props}>
                {children}
            </label>
        );
    }
);

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
    children: ReactNode;
    error?: boolean;
};
