import React from 'react';
import clsx from 'clsx';

interface Props {
    className?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg'
    variant?: 'primary' | 'secondary' | 'warning' | 'danger' | 'black';
}

const Spinner: React.FC<Props> = ({ size = 'sm', variant = 'secondary', className = '' }) => {
    return (
        <div
            className={clsx(
                {
                    'border-primary/25 border-t-primary': variant === 'primary',
                    'border-white/25 border-t-white': variant === 'secondary',
                    'border-yellow-500/25 border-t-yellow-400': variant === 'warning',
                    'border-red-500/25 border-t-red-500': variant === 'danger',
                    'border-black/25 border-t-black': variant ==='black',
                    'h-4 w-4 border-[2px]': size === 'xs',
                    'h-5 w-5 border-2': size === 'sm',
                    'h-8 w-8 border-[3px]': size === 'md',
                    'h-10 w-10 border-4': size === 'lg',
                },
                'animate-spin rounded-full',
                className
            )}
        />
    );
};

export default Spinner;
