import clsx from 'clsx';
import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    color?: 'light' | 'dark';
    variant?: 'sunken' | 'elevated';
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
}

interface CardHeaderProps {
    children: React.ReactNode;
    className?: string;
}

interface CardBodyProps {
    padding?: 2 | 4 | 6 | 8
    children?: React.ReactNode;
    className?: string;
}

export const Card: React.FC<CardProps> = ({ children,rounded, className=' ', color, variant }) => {
    return (
        <div
            className={clsx(
                {
                    //'elevated-element': variant === 'elevated',
                    //'sunken-element': variant === 'sunken',
                    //'bg-black': color === 'light',
                    //'bg-dark-black': color === 'dark',
                },
                `rounded-${rounded} `,
                className
            )}>
            {children}
        </div>
    );
};

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => {
    return <div className={clsx(
      'p-5 text-xl font-semibold border-b-2 border-white/25 ',
      className,
    )}>{children}</div>;
};

export const CardBody: React.FC<CardBodyProps> = ({ children,padding=4, className = '' }) => {
    return <div className={`p-${padding} ${className}`}>{children}</div>;
};
