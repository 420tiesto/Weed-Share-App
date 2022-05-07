import React from 'react';

type Props = {
    children: React.ReactNode;
};


// Container component for max screen width xl
const Container = ({ children }: Props) => {
    return <div className='max-w-screen-xl mx-auto container p-4'>{children}</div>;
};

export default Container;
