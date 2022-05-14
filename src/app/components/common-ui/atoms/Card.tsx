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
    children?: React.ReactNode;
    className?: string;
}

export const Card: React.FC<CardProps> = ({ children,rounded, className, color, variant }) => {
    return (
        <div
            className={clsx(
                {
                    'elevated-element': variant === 'elevated',
                    'sunken-element': variant === 'sunken',
                    'bg-gray': color === 'light',
                    'bg-dark-gray': color === 'dark',
                },
                `rounded-${rounded} overflow-hidden`,
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

export const CardBody: React.FC<CardBodyProps> = ({ children, className = '' }) => {
    return <div className={`p-5 ${className}`}>{children}</div>;
};