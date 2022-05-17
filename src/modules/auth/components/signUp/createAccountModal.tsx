import React, { Fragment, useEffect, useState } from 'react';
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
import Modal, { ModalHeader } from '../../../../app/components/common-ui/atoms/Modal';
import { Input } from '../../../../app/components/common-ui/atoms/Input';
import Button from '../../../../app/components/common-ui/atoms/Button';
import Spinner from '../../../../app/components/common-ui/atoms/Spinner';
import { Link } from 'react-router-dom';

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

    const [signupState, setSignupState] = useState<'default' | 'loading' | 'created'>('default');
    const [checking, setChecking] = useState<boolean>(false);

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
        <Modal isOpen={isOpen} closeModal={handleCloseModal}>
            <div className="w-[800px] h-[440px] flex flex-col items-center p-8">
                <ModalHeader className="text-4xl  gap-6   font-semibold flex items-center justify-center">
                    Sign up to{' '}
                    <img src="/prnts-logo.svg" alt="prnts" className="h-16 relative top-2" />
                </ModalHeader>
                {signupState === 'default' && (
                    <form
                        className="max-w-[320px] w-full my-auto  space-y-4"
                        onSubmit={handleSubmit(handleSignup)}>
                        <Input
                            label="Handle"
                            {...register('handle')}
                            placeholder="Enter username"
                        />
                        <Button type="submit" loading={checking} className='w-full'>
                            Sign up
                        </Button>
                    </form>
                )}
                {signupState === 'loading' && (
                    <div className="max-w-[320px] flex flex-col items-center gap-8 justify-center my-auto">
                        <p className="text-xl">Creating your profile...</p>
                        <Spinner className="h-32 w-32 border-4 " variant="primary" />
                    </div>
                )}
                {signupState === 'created' && (
                    <div className="max-w-[320px] flex flex-col w-full items-center gap-16 justify-center my-auto">
                        <p className="text-xl text-center">Profile created.</p>
                        <Link to="/login" className='w-full'>
                            <Button className='w-full'>Go to login</Button>
                        </Link>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default CreateAccountModal;
