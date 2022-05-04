import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { copyright } from '../../../../../../constants';
import { isUsingWallet } from '../../../../../../services/ethers-service';
import { useDispatch, useSelector } from 'react-redux';
import { setWalletModalOpen, storeUserProfile } from '../../../../../../state/actions';
import { setStorageValue } from '../../../../../../utils/local-storage/local-storage';
import { USER_PROFILE } from '../../../../../../utils/local-storage/keys';
import { getUserProfile } from '../../../../../../state/selectors';

type Props = {
    setStep: (step: number) => void;
};

interface FormValues {
    username: string;
    email: string,
}

const SignUp: React.FC<Props> = ({ setStep }) => {
    const dispatch = useDispatch();

    const openModal = () => {
        dispatch(setWalletModalOpen(true));
    };

    const { username, email } = useSelector(getUserProfile);

    const { register, handleSubmit } = useForm<FormValues>({
        defaultValues: {
            username,
            email,
        }
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const isUsingMetamaskWallet = await isUsingWallet();
        if (!isUsingMetamaskWallet) {
            openModal();
            return;
        }
        setStorageValue(USER_PROFILE, data);
        dispatch(storeUserProfile({ username: data.username, email: data.email }));
        setStep(2);
    };

    return (
        <div className="flex flex-col gap-4 items-center mx-auto justify-center max-w-screen-lg min-h-screen  p-8 ">
            <div className="relative sunken-element--dark flex flex-col bg-gray-900 rounded-2xl h-[80vh]  w-full  py-8 px-16">
                {/* Prnts Logo */}
                <div className="absolute right-0 top-0 p-8 rounded-bl-2xl sunken-element--dark">
                    <img src="/prnts-logo.svg" alt="logo" />
                </div>
                <h1 className="text-4xl mb-1 font-bold">SignUp</h1>
                <Link to="/login">
                    <p>
                        Already have an account ?
                        <a className="text-primary pl-1" href="#">
                            Log in
                        </a>
                    </p>
                </Link>
                <div className="flex-grow flex items-center justify-center">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="max-w-sm flex flex-col p-8 gap-3  ">
                        <label htmlFor="email" className="pl-4">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            className="primary-input"
                            {...register('email', {
                                required: true,
                                pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
                            })}
                        />
                        <label htmlFor="username" className="pl-4">
                            Username
                        </label>
                        <input
                            type="text"
                            placeholder="Enter username"
                            className="primary-input"
                            {...register('username', {
                                required: true,
                                pattern: /^[a-zA-Z0-9]+$/i,
                            })}
                        />
                        <button type="submit" className="green-btn mt-4">
                            Next
                        </button>
                    </form>
                </div>
            </div>
            <p>{copyright}</p>
        </div>
    );
};

export default SignUp;
