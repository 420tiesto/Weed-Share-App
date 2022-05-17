import clsx from 'clsx';
import React, { ComponentProps, DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label?: string;
    className?: string;
    error?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
    { label, leftIcon, rightIcon, type = 'text', error, className = '', ...props },
    ref
) {
    return (
        <label className="w-full  ">
            {label && (
                <div className="mb-2 font-medium text-gray-800 dark:text-gray-200">{label}</div>
            )}
            <div className="flex items-center bg-[#40444B] rounded-full ">
                {leftIcon && <span className=" py-2 pl-4 text-[#C0C0C0]">{leftIcon}</span>}
                <input
                    className={clsx(
                      'bg-[#40444B] shadow-md placeholder:text-[#C0C0C0] focus:ring-primary text-white disabled:opacity-60 disabled:bg-opacity-20 outline-none w-full p-2',
                      {
                        '!border-red-500 placeholder-red-500': error,
                        'rounded-r-full': leftIcon,
                        'rounded-l-full': rightIcon,
                        'rounded-full ': !rightIcon && !leftIcon,
                        'pl-6': !leftIcon,
                        'pr-6': !rightIcon
                      },
                        className
                    )}
                    type={type}
                    ref={ref}
                    {...props}
                />
                 {rightIcon && <span className="bg-[#40444B] text-[#C0C0C0] py-2 pr-4 rounded-r-full">{rightIcon}</span>}
            </div>
        </label>
    );
});
