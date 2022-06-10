import React from 'react';
import { copyright } from '../../../constants';
import Navbar from '../../header/navbar/Navbar';

type Props = {
    children: React.ReactNode;
};


// Container component for max screen width xl
const Container = ({ children }: Props) => {
    return <>
    <div className='mt-16'>{children}</div>
    </> 
}

export default Container;
