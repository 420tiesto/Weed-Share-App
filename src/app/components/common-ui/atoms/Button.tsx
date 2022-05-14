import clsx from 'clsx';
import React, { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef, ReactNode } from 'react';
import Spinner from './Spinner';

interface Props
    extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'warning' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    outline?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
    children?: ReactNode;
    className?: string;
}

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
    { className = '',size='md', variant = 'primary', outline, loading, icon, children, ...rest },
    ref
) {
    return (
        <button
            ref={ref}
            className={clsx(
                {
                    'bg-green-600 hover:bg-green-500 active:bg-green-500 text-white':
                        !outline && variant === 'primary',
                    'bg-white hover:bg-white/80 active:bg-white/80 text-dark-gray ring-black':
                    !outline && variant === 'secondary',
                    'bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-white':
                    !outline &&  variant === 'warning',
                    'bg-red-500 hover:bg-red-400 active:bg-red-600 text-white':
                    !outline &&  variant === 'danger',
                    'border-green-500 hover:bg-green-500 active:bg-green-500 focus:bg-green-500  text-green-500 hover:text-green-400 focus:text-green-400 focus:ring-0 ': outline && variant === 'primary',
                    'border-white hover:bg-white text-white active:bg-white focus:bg-white focus:ring-0': outline && variant === 'secondary',
                    'border-amber-500 hover:bg-amber-500 active:bg-amber-500 focus:bg-amber-500  text-amber-500 hover:text-amber-400 focus:text-amber-400 focus:ring-0 ': outline && variant === 'warning',
                    'border-red-500 hover:bg-red-500 active:bg-red-500 focus:bg-red-500  text-red-500 hover:text-red-400 focus:text-red-400 focus:ring-0 ': outline && variant === 'danger',
                    'border hover:bg-opacity-10 active:bg-opacity-10 focus:bg-opacity-10':outline,
                    'flex items-center  justify-center space-x-3': (icon || loading) && children,
                    'px-3 py-1 text-sm':size === 'sm',
                    'px-6 py-2':size === 'md',
                    'px-12 py-3 text-lg':size === 'lg',
                },
                'rounded-full font-medium whitespace-nowrap font-display duration-200 ease-out disabled:opacity-50 shadow-sm  active:scale-95 focus:ring-1 ring-white outline-none',
                className
            )}
            disabled={loading}
            {...rest}>
            {icon && !loading && icon}
            {icon && loading && <Spinner size={size === 'lg' ? 'md' : 'sm'} variant='secondary' />}
            {!icon && loading && <Spinner size={size === 'lg' ? 'md' : 'sm'} variant='secondary' />}
            <div>{children}</div>
        </button>
    );
});

export default Button;