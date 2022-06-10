import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { setWalletModalOpen } from '../../../../state/actions';
import { useAppDispatch } from '../../../../state/configure-store';
import { getWalletModalState } from '../../../../state/selectors';
import Connectors from './Connectors';

type Props = {};

const ConnectWalletModal = (props: Props) => {
    const isOpen = useSelector(getWalletModalState);
    const dispatch = useAppDispatch();

    const closeModal = () => {
        dispatch(setWalletModalOpen(false));
    };

    return (
        <Transition appear show={isOpen || false} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
                <div className="min-h-screen  px-4 text-center">
                    <Transition.Child
                        as="div"
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <Dialog.Overlay className="fixed inset-0 backdrop-blur-lg backdrop-brightness-75" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="inline-block h-screen align-middle" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95">
                        <div className="inline-block w-full sunken-element--dark  max-w-fit p-6 overflow-hidden text-left align-middle transition-all transform bg-black-800  rounded-2xl">
                            <Dialog.Title className="text-2xl pb-2 w-full  font-bold font-display ">
                                Connnect your wallet
                            </Dialog.Title>

                            <div className="relative">
                                <p className="mb-4">
                                    Connect with one of our available{' '}
                                    <span className="text-primary"> wallet </span> providers or
                                    create a new one.
                                </p>
                                {/* <Connectors /> */}
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ConnectWalletModal;
