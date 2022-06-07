import clsx from 'clsx';
import React, {
    ComponentProps,
    DetailedHTMLProps,
    forwardRef,
    InputHTMLAttributes,
    TextareaHTMLAttributes,
} from 'react';

interface Props
    extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
    label?: string;
    className?: string;
    error?: string;
    id?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(function Input(
    { label, error, className = '', ...props },
    ref
) {
    return (
        <label className="w-full  ">
            {label && (
                <div className="mb-2 font-medium text-gray-800 dark:text-gray-200">{label}</div>
            )}
            <div className="flex items-center bg-[#40444B] rounded-full ">
                <textarea
                    className={clsx(
                        'bg-[#40444B] placeholder:text-[#C0C0C0] rounded-2xl focus:ring-primary text-white disabled:opacity-60 disabled:bg-opacity-20 outline-none w-full p-4',
                        {
                            '!border-red-500 placeholder-red-500': error,
                        },
                        className
                    )}
                    id={props.id}
                    ref={ref}
                    {...props}
                />
            </div>
        </label>
    );
});
