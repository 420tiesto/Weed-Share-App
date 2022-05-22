import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import React, { Fragment } from 'react';

type Props = {
    isOpen: boolean;
    closeModal: () => void;
    title?: React.ReactNode;
    children: React.ReactNode;
};

export const ModalHeader: React.FC<{ children: React.ReactNode,className?:string }> = ({ children,className }) => {
    return (
        <Dialog.Title className={className}>{children}</Dialog.Title>
    );
};

const Modal: React.FC<Props> = ({ isOpen, closeModal, title, children }) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={closeModal}>
                <div className="min-h-screen  px-4 text-center">
                    <Transition.Child
                        as="div"
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <Dialog.Overlay className="fixed inset-0 backdrop-blur-lg backdrop-brightness-50" />
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
                        <div className="ring-1 ring-white inline-block w-full sunken-element  max-w-fit p-6 overflow-hidden text-left align-middle transition-all transform bg-dark-gray  rounded-2xl">
                            <button onClick={closeModal}>
                                <XIcon className="absolute right-4 top-4 h-8 w-8" />
                            </button>
                            {children}
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default Modal;
