import React, { useState } from 'react';
import CheckIcon from '../../../../../../icons/CheckIcon';
import XIcon from '../../../../../../icons/XIcon';
import Stepper from '../signUp/Stepper';

type Props = {};

type Status = 'connected' | 'disconnected' | 'error';

const ConnectWallet = (props: Props) => {
    const [status, setStatus] = useState<Status>('disconnected');
    //Show ui according to status
    switch (status) {
        // when wallet is successfully connected
        case 'connected':
            return (
                <div className="min-h-screen w-screen p-4 flex flex-col gap-4 items-center justify-between">
                    <Stepper step={2} />
                    <div className="relative sunken-element--dark gap-8 w-full max-w-screen-md flex-col flex items-center justify-center overflow-hidden bg-gray-900 p-16 pb-24 rounded-2xl">
                        <h1 className="text-2xl md:text-4xl font-semibold text-center">
                            Connect With Metamask
                        </h1>
                        <div className="flex items-center justify-center ring-2 ring-primary px-8 rounded-2xl flex-col sunken-element--dark">
                            <div className="rounded-full p-4 relative top-4 bg-primary">
                                <CheckIcon className="stroke-current fill-current  text-white" />
                            </div>
                            <img src="/metamask.png" alt="" className="h-32" />
                        </div>
                        <div className="absolute bottom-0 w-full py-2 text-center md:text-2xl font-semibold bg-green-500">
                            Wallet Connected
                        </div>
                    </div>
                    <p className="">© 2022 Prnts</p>
                </div>
            );
        // When wallet has error
        case 'error':
            return (
                <div className="min-h-screen w-screen p-4 flex flex-col gap-4 items-center justify-between">
                    <Stepper step={2} />
                    <div className="relative sunken-element--dark gap-8 w-full max-w-screen-md flex-col flex items-center justify-center overflow-hidden bg-gray-900 p-16 pb-24 rounded-2xl">
                        <h1 className="text-2xl md:text-4xl font-semibold text-center">
                            Connect With Metamask
                        </h1>
                        <div className="flex items-center justify-center ring-2 ring-red-500 px-8 rounded-2xl flex-col sunken-element--dark">
                            <div className="rounded-full p-4 relative top-4 bg-red-500">
                                <XIcon className="stroke-current fill-current  text-white" />
                            </div>
                            <img src="/metamask.png" alt="" className="h-32" />
                        </div>
                        <div className="absolute bottom-0 items-center flex justify-around w-full py-2 text-center md:text-2xl font-semibold bg-red-500">
                            Error Connecting wallet
                            <button className="white-btn px-8 text-base">Retry</button>
                        </div>
                    </div>
                    <p className="">© 2022 Prnts</p>
                </div>
            );
        // When wallet is disconnected / not connected
        default:
            return (
                <div className="min-h-screen w-screen p-4 flex flex-col gap-4 items-center justify-between">
                    <Stepper step={2} />
                    <div className="  sunken-element--dark gap-8  w-full max-w-screen-md flex-col flex items-center justify-center bg-gray-900 p-16 rounded-2xl">
                        <h1 className="text-2xl md:text-4xl font-semibold text-center">
                            Connect With Metamask
                        </h1>
                        <div className="flex items-center justify-center px-8 rounded-2xl flex-col sunken-element--dark">
                            <img src="/metamask.png" alt="" className="h-32" />
                            <button className="green-btn text-lg w-72 relative -top-8">
                                Connect with wallet
                            </button>
                        </div>
                    </div>
                    <p className="">© 2022 Prnts</p>
                </div>
            );
    }
};

export default ConnectWallet;
