import React from 'react';
import { copyright } from '../../../../../../constants';

type Props = {};

const SignUp = (props: Props) => {
    return (
        <div className="flex flex-col gap-4 items-center mx-auto justify-center max-w-screen-lg min-h-screen  p-8 ">
            <div className="relative sunken-element--dark flex flex-col bg-gray-900 rounded-2xl h-[80vh]  w-full  py-8 px-16">
                {/* Prnts Logo */}
                <div className='absolute right-0 top-0 p-8 rounded-bl-2xl sunken-element--dark'>
                  <img src="/prnts-logo.svg" alt="logo" />
                </div>
                <h1 className="text-4xl mb-1 font-bold">SignUp</h1>
                <p>
                    Already have an account ?
                    <a className="text-primary pl-1" href="#">
                        Log in
                    </a>
                </p>
                <div className='flex-grow flex items-center justify-center'>

                <form className="max-w-sm flex flex-col p-8 gap-3  ">
                    <label htmlFor="email" className="pl-4">
                        Email
                    </label>
                    <input
                        type="email"
                        required
                        name="email"
                        id="email"
                        className="primary-input"
                    />
                    <label htmlFor="username" className="pl-4">
                        Username
                    </label>
                    <input
                        type="text"
                        required
                        name="username"
                        id="username"
                        className="primary-input"
                    />
                    <button type="submit" className="green-btn mt-4">
                        Create Account
                    </button>
                    <p className='text-sm text-center'>By clicking create account you agree to the terms of service</p>
                </form>
                </div>
            </div>
            <p>{copyright}</p>
        </div>
    );
};

export default SignUp;
