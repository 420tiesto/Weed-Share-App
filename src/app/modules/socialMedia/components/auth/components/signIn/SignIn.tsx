import React, { useState } from 'react';
import { copyright } from '../../../../../../constants';
import GoogleIcon from '../../../../../../icons/GoogleIcon';
import InstagramIcon from '../../../../../../icons/InstagramIcon';
import TwitterIcon from '../../../../../../icons/TwitterIcon';
import { useAppDispatch } from '../../../../../../state/configure-store';
import { login } from '../../services/lens-login';

interface UpdatePasswordProps {}

const SignIn: React.FC<UpdatePasswordProps> = () => {
    const dispatch = useAppDispatch();
    const handleOnLogin = () => {
        dispatch(login());
    };

    return (
        <div className="min-h-screen w-screen p-4 flex flex-col items-center justify-center">
            <div className="relative sunken-element--dark w-full max-w-screen-xl bg-gray-900 py-4 px-12 rounded-2xl">
                <div className="right-0 top-0 absolute sunken-element--dark p-8 rounded-bl-xlIc">
                    <img src="/prnts-logo.svg" alt="logo" />
                </div>
                <h1 className="text-4xl font-semibold leading-relaxed mt-16 lg:mt-0">Login</h1>
                <p>
                    Have an account already?{' '}
                    <a className="text-primary"> Don't have an account ? Sign up </a>
                </p>
                <div className="lg:flex justify-around py-16">
                    <div className="w-full max-w-md">
                        {/* Sign up Form */}
                        <form className="max-w-md p-8 space-y-4 w-full">
                            <div className="flex flex-col gap-1">
                                <label className="pl-4">Email</label>
                                <input type="email" placeholder="Enter email" className='primary-input' />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="pl-4">Pasword</label>
                                <input type="password" placeholder="Enter Password" className='primary-input' />
                            </div>
                            <button className="green-btn text-lg">
                                Login
                            </button>
                            <p className="text-center">
                                Forgot your passowrd
                            </p>
                        </form>
                    </div>
                    {/* Vertical Divider for large screen */}
                    <div className="my-4 relative lg:hidden flex flex-col w-full h-[1px]  bg-gray-500">
                        <div className="absolute left-[45%] -top-5  lg:top-[45%] lg:-left-[10px] text-gray-200 font-bold p-2 bg-gray-900">
                            OR
                        </div>
                    </div>
                    {/* Horizontal divider for small screen */}
                    <div className="lg:my-16 my-4 relative lg:flex hidden flex-col w-[1px] bg-gray-500">
                        <div className="absolute top-[45%] -left-4 text-gray-200 font-bold p-2 bg-gray-900">
                            OR
                        </div>
                    </div>
                    {/* Sign in with Socials */}
                    <div className="p-12 flex flex-col gap-8  lg:justify-center lg:items-center ">
                        <button className="white-btn w-72 text-lg">
                            <GoogleIcon /> Sign in with Google
                        </button>
                        <button className="white-btn w-72 text-lg">
                            <TwitterIcon /> Sign in with Twitter
                        </button>
                        <button className="white-btn w-72 text-lg">
                            <InstagramIcon /> Sign in with Instagram
                        </button>
                    </div>
                </div>
            </div>
            <p className='mt-8 absolute bottom-8'>{copyright}</p>
        </div>
    );
};

export default SignIn;
