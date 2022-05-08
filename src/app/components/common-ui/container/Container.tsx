import React from 'react';
import { copyright } from '../../../constants';
import Navbar from '../../header/navbar/Navbar';

type Props = {
    children: React.ReactNode;
};


// Container component for max screen width xl
const Container = ({ children }: Props) => {
    return <>
    <Navbar/>
    <div className='max-w-screen-xl pt-16 mx-auto  container'>{children}</div>
    <div className='flex justify-center'>
    <p className=" my-4">{copyright}</p>
    </div>
    </> 
}

export default Container;
