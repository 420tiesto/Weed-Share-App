import clsx from 'clsx';
import React from 'react';

interface StackProps {
    children: React.ReactNode;
    className?: string;
    spacing?: 0 | 1 | 2 | 3 | 4 | 8;
}

const Stack = ({ children, spacing = 2, className='' }: StackProps) => {
    return (
        <div
            className={clsx(
                {
                    'gap-0': spacing === 0,
                    'gap-1': spacing === 1,
                    'gap-2': spacing === 2,
                    'gap-3': spacing === 3,
                    'gap-4': spacing === 4,
                    'gap-8': spacing === 8,
                },
                'flex flex-col',
                className
            )}>
            {children}
        </div>
    );
};

export default Stack;
