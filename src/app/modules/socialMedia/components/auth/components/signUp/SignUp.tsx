import React, { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { copyright } from '../../../../../../constants';
import GoogleIcon from '../../../../../../icons/GoogleIcon';
import InstagramIcon from '../../../../../../icons/InstagramIcon';
import TwitterIcon from '../../../../../../icons/TwitterIcon';
import Stepper from './Stepper';
import Toggle from './Toggle';
import { signUp } from '../../services/auth.services';

interface SignUpProps {}

interface FormValues {
    email: string;
    username: string;
    password: string;
    isArtist: boolean;
}

const SignUp: React.FC<SignUpProps> = () => {
    // const { email, onSuccess } = props;
    const [errorMessage, setErrorMessage] = useState<string | undefined>();
    const { register, handleSubmit, control } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data);
        signUp(data);
    }

    return (
        <div className="min-h-screen p-4 flex flex-col gap-4 items-center justify-center">
            <Stepper step={1} />
            <div className="relative sunken-element--dark w-full max-w-screen-xl bg-gray-900 py-4 px-12 rounded-2xl">
                <div className="right-0 top-0 absolute sunken-element--dark p-8 rounded-bl-xl">
                    <img src="/prnts-logo.svg" alt="logo" />
                </div>
                <h1 className="text-4xl font-semibold leading-relaxed">Sign up</h1>
                <p>
                    Have an account already? <a className="text-primary"> Login </a>
                </p>
                <div className="lg:flex justify-around ">
                    <div className="">
                        {/* Sign up Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md p-8 space-y-3 ">
                            <div className="flex flex-col gap-1">
                                <label className="pl-4">Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter email"
                                    className="primary-input"
                                    {...register('email', {
                                        required: true,
                                        pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
                                    })}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="pl-4">Username</label>
                                <input
                                    type="text"
                                    placeholder="Enter username"
                                    className="primary-input"
                                    {...register('username', {
                                        required: true,
                                        pattern: /^[a-zA-Z0-9]+$/i,
                                    })}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="pl-4">Pasword</label>
                                <input
                                    type="password"
                                    placeholder="Enter Password"
                                    className="primary-input"
                                    {...register('password', { required: true })}
                                />
                            </div>
                            <div className="flex items-center gap-4 py-4 px-2">
                                Are you an artist or represent one ?
                                <Controller
                                    name="isArtist"
                                    control={control}
                                    render={({ field }) => {
                                        const { onChange, value } = field;
                                        return <Toggle enabled={!!value} onChange={onChange} />;
                                    }}
                                />
                            </div>

                            <button className="green-btn text-lg">Create Account</button>
                            <p className="text-center">
                                By clicking create account you agree to the terms of service
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
                            <GoogleIcon /> Sign up with Google
                        </button>
                        <button className="white-btn w-72 text-lg">
                            <TwitterIcon /> Sign up with Twitter
                        </button>
                        <button className="white-btn w-72 text-lg">
                            <InstagramIcon /> Sign up with Instagram
                        </button>
                    </div>
                </div>
            </div>
            <p className="">{copyright}</p>
        </div>
    );
};

export default SignUp;
