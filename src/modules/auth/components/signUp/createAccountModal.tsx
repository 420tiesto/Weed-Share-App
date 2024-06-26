import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { checkForHandle, createProfileLens } from '../../services/auth.services';
import { useSelector } from 'react-redux';
import { XIcon } from '@heroicons/react/outline';
import { SubmitHandler, useForm } from 'react-hook-form';
import { login } from '../../services/lens-login';
import { getProfiles } from '../../../profile/services/get-profiles';
import { getCurrentUserAdress } from '../../state/auth.reducer';
import { setUserAuthenticated, setUserProfile } from '../../state/auth.action';
import { useAppDispatch } from '../../../../state/configure-store';
import Modal, { ModalHeader } from '../../../../app/components/common-ui/atoms/Modal';
import { Input } from '../../../../app/components/common-ui/atoms/Input';
import Button from '../../../../app/components/common-ui/atoms/Button';
import Spinner from '../../../../app/components/common-ui/atoms/Spinner';
import { Link } from 'react-router-dom';
import { errorToast } from '../../../../app/components/common-ui/toasts/CustomToast';
import { useSetState } from 'react-use';

interface Props {
    isOpen: boolean;
    closeModal: () => void;
    onSuccess: (handle: string) => void;
}

interface State {
    checking: boolean;
    creatingProfileLoader: boolean;
    showSuccessModal: boolean;
    handle: string;
}

const CreateAccountModal = (props: Props) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<any>();

    //redux State
    const dispatch = useAppDispatch();
    const currentAdress = useSelector(getCurrentUserAdress);

    // localState
    const [signupState, setSignupState] = useState<'default' | 'loading' | 'created'>('default');
    // const [checking, setChecking] = useState<boolean>(false);
    const [state, setState] = useSetState<State>({
        checking: false,
        creatingProfileLoader: false,
        showSuccessModal: false,
        handle: '',
    });

    useEffect(() => {}, []);

    const { isOpen, closeModal, onSuccess } = props;

    const { creatingProfileLoader, checking, showSuccessModal, handle } = state;

    const handleCloseModal = () => {
        closeModal();
    };

    const handleSignup: SubmitHandler<any> = async (data) => {
        setState({ checking: true });
        checkForHandle(data.handle)
            .then(async (profile) => {
                if (!profile) {
                    await dispatch(login());
                    setState({ checking: false });
                    setState({ creatingProfileLoader: true });
                    setState({ handle: `${data.handle}.test` });
                    await createProfileLens(data.handle)
                        .then((resp) => {
                            if (resp === true) {
                                getProfiles({
                                    handles: [data.handle],
                                    limit: 1,
                                })
                                    .then((profile: any) => {
                                        setState({ creatingProfileLoader: false });
                                        setState({ showSuccessModal: true });
                                    })
                                    .catch((error: Error) => {
                                        setState({ checking: false });
                                        console.log(error);
                                        errorToast('Error', error.message);
                                    });
                            }
                        })
                        .catch((error: Error) => {
                            setState({ checking: false });
                            console.log(error);
                            errorToast('Error', error.message);
                        });
                } else {
                    // show error that handle already available
                    setState({ checking: false });
                    errorToast('UserName already taken', '');
                }
            })
            .catch((error: Error) => {
                setState({ checking: false });
                console.log(error);
                errorToast('Error', error.message);
            });
    };

    return (
        <Modal isOpen={isOpen} closeModal={handleCloseModal}>
            <div className="w-[800px] h-[440px] flex flex-col items-center p-8">
                <ModalHeader className="text-4xl  gap-6   font-semibold flex items-center justify-center">
                    Sign up to{' '}
                    <img src="/prnts-logo.svg" alt="prnts" className="h-16 relative top-2" />
                </ModalHeader>
                {!creatingProfileLoader && !showSuccessModal && (
                    <form
                        className="max-w-[320px] w-full my-auto  space-y-4"
                        onSubmit={handleSubmit(handleSignup)}>
                        <Input
                            label="Handle"
                            {...register('handle')}
                            placeholder="Enter username"
                        />
                        <Button type="submit" loading={checking} className="w-full">
                            Sign up
                        </Button>
                    </form>
                )}
                {creatingProfileLoader && (
                    <div className="max-w-[320px] flex flex-col items-center gap-8 justify-center my-auto">
                        <p className="text-xl">Creating your profile...</p>
                        <Spinner className="h-32 w-32 border-4 " variant="primary" />
                    </div>
                )}
                {showSuccessModal && (
                    <div className="max-w-[320px] flex flex-col w-full items-center gap-16 justify-center my-auto">
                        <p className="text-xl text-center">Profile created.</p>
                        {/* <Link className="w-full"> */}
                        <Button onClick={() => onSuccess(handle)} className="w-full">
                            Go to Profile
                        </Button>
                        {/* </Link> */}
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default CreateAccountModal;
