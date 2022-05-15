import React, { Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { checkForHandle, createProfileLens } from '../../services/auth.services';
import { useSelector } from 'react-redux';
import { XIcon } from '@heroicons/react/outline';
import { SubmitHandler, useForm } from 'react-hook-form';
import { login } from '../../services/lens-login';
import { getProfiles } from '../../../profile/services/get-profiles';
import { getCurrentUserAdress } from '../../state/auth.reducer';
import { setUserProfile } from '../../state/auth.action';
import { useAppDispatch } from '../../../../state/configure-store';

interface Props {
    isOpen: boolean;
    closeModal: () => void;
    onSuccess: (handle: string) => void;
}

const CreateAccountModal = (props: Props) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<any>();
    const dispatch = useAppDispatch();
    const currentAdress = useSelector(getCurrentUserAdress);
    const { isOpen, closeModal, onSuccess } = props;

    useEffect(() => {}, []);

    const handleCloseModal = () => {
        closeModal();
    };

    const handleSignup: SubmitHandler<any> = async (data) => {
        checkForHandle(data.handle).then(async (profile) => {
            if (!profile) {
                await dispatch(login());
                await createProfileLens(data.handle).then((resp) => {
                    console.log('profile created', resp);
                    if (resp) {
                        //Start the timer
                        console.log(currentAdress, 'curretnadress');
                        getProfiles({
                            ownedBy: [currentAdress],
                            limit: 10,
                        }).then((profile: any) => {
                            console.log(profile.data);
                            onSuccess(data.handle + '.test');
                            if (profile.data.profiles.items.length > 0) {
                                // dispatch(setUserProfile(profile.data.profiles.items[0]));
                                // navigate('/profile');
                            } else {
                                // something went wrong, sign back In after a while
                            }
                        });
                    }
                });
            } else {
                // show error that handle already available
                console.log('profile already available');
            }
        });
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 overflow-y-auto"
                onClose={handleCloseModal}>
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
                        <div className="inline-block w-full sunken-element  max-w-fit p-6 overflow-hidden text-left align-middle transition-all transform bg-gray  rounded-2xl">
                            <Dialog.Title className="text-2xl w-full  font-bold font-display ">
                                Sign Up to PRNTS
                            </Dialog.Title>
                            <button onClick={closeModal}>
                                <XIcon className="absolute right-4 top-4 h-8 w-8" />
                            </button>
                            <div>
                                <form onSubmit={handleSubmit(handleSignup)}>
                                    <div className="flex flex-col">
                                        <label>Username</label>
                                        <input
                                            type="text"
                                            className="primary-input mt-2"
                                            placeholder="Enter username"
                                            {...register('handle')}
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <button className="green-btn mt-4 px-6 max-w-fit ">
                                            Sign up
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default CreateAccountModal;
