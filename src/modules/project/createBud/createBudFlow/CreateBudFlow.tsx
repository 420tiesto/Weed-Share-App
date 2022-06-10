import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

import UploadMusic from '../uploadMusic/UploadMusic';
import AddTrack from '../addTrack/AddTrack';
import { resetAllDetails, storeMusicDetails } from '../../state/actions';
import { getMusicDetails } from '../../state/selectors';

import { login } from '../../../auth/services/lens-login';
import { type MusicDetails, type TrackDetails } from '../../types';
import postPublication from '../../services/post-publication';
import { useAppDispatch } from '../../../../state/configure-store';
import { setWalletModalOpen } from '../../../../state/actions';
import { isUsingWallet, doesHaveEnoughBalance } from '../../../../services/ethers-service';
import getAttributeType from '../../../../utils/get-attribute-type';
import getIPFSUrlLink from '../../../../utils/get-ipfs-url-link';
import { createPostMetadata } from '../../../../utils/create-post-metadata';
import { uploadWeb3Json } from '../../../../utils/upload-json';
import { getUserProfile } from '../../../auth/state/auth.reducer';
import Button from '../../../../app/components/common-ui/atoms/Button';
import { getPublications } from '../../services/get-publications';
import { pollUntilIndexed } from '../../../../services/has-transaction-been-indexed';
import {
    successToast,
    promiseToast,
    errorToast,
} from '../../../../app/components/common-ui/toasts/CustomToast';
import { Card, CardBody } from '../../../../app/components/common-ui/atoms/Card';
import { isValidToken } from '../../../../utils/auth-helpers';
import { getStorageValue } from '../../../../utils/local-storage/local-storage';
import { LENS_TOKENS } from '../../../../utils/local-storage/keys';
import { setUserAuthenticated } from '../../../auth/state/auth.action';
import { MetadataMedia } from '../../../../types';

const CreateBudFlow = () => {
    const [step, setStep] = useState(1);
    const [loader, setLoader] = useState(false);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { id } = useSelector(getUserProfile);
    const budDetails = useSelector(getMusicDetails);

    const uploadMusicRef = useRef();
    const createBudRef = useRef();

    const auth = getStorageValue(LENS_TOKENS);

    const openModal = () => {
        dispatch(setWalletModalOpen(true));
    };

    const onUploadMusic = async () => {
        (uploadMusicRef?.current as any)?.onSubmit({
            onSuccess(data: MusicDetails) {
                setStep(2);
                dispatch(storeMusicDetails(data));
            },
        });
    };

    const createBud = async () => {
        // TODO: Check if user has selected a profile
        const isUsingMetamaskWallet = await isUsingWallet();
        if (!isUsingMetamaskWallet) {
            openModal();
            return;
        }
        if (!(await doesHaveEnoughBalance({ warn: true }))) {
            return;
        }
        if (!auth) {
            dispatch(setUserAuthenticated(false));
            return;
        }
        const { accessToken } = JSON.parse(auth!);
        if (!isValidToken(accessToken)) {
            await dispatch(login());
        }
        // TODO: Check if user is logged in to lens
        // await dispatch(login());
        (createBudRef?.current as any)?.onSubmit({
            async onSuccess(tracks: TrackDetails[]) {
                if (!tracks[tracks.length - 1].ipfsHash) {
                    alert('Please save the track before creating the project');
                    return;
                }
                setLoader(true);
                const currentMusicDetails = budDetails;
                const {
                    budCover,
                    artistName,
                    language,
                    primaryGenre,
                    recordLabel,
                    releaseDate,
                    secondaryGenre,
                    budCoverType,
                    budPrice,
                } = currentMusicDetails;
                const attributes = [
                    getAttributeType('string', 'Artist Name', artistName),
                    getAttributeType('date', 'Delivery Date', new Date(releaseDate)),
                    getAttributeType('string', 'Brand Name', recordLabel),
                    getAttributeType('string', 'Language', language.name),
                    getAttributeType('string', 'Primary Genre', primaryGenre.name),
                    getAttributeType('string', 'Stealth Details', secondaryGenre),
                    getAttributeType('string', 'Bud Cover', getIPFSUrlLink(budCover)),
                    getAttributeType('string', 'Bud Cover Type', budCoverType),
                    getAttributeType('number', 'Number of Tracks', tracks.length),
                ];
                let media: MetadataMedia[] = [];
                for (let i = 0; i < tracks.length; i++) {
                    const track = tracks[i];
                    if (track.ipfsHash) {
                        media.push({
                            item: getIPFSUrlLink(track.audioFile),
                            type: track.audioFileType,
                        });
                        attributes.push(getAttributeType('string', `Track ${i}`, track.ipfsHash));
                    }
                }
                const totalPrice = budPrice;
                const postMetadata = createPostMetadata({
                    media,
                    budName: recordLabel,
                    budCover: getIPFSUrlLink(budCover),
                    budCoverType,
                    attributes: attributes,
                });
                promiseToast('Uploading Content...', 'Uploading Music');
                const contentURI = await uploadWeb3Json(recordLabel, JSON.stringify(postMetadata));
                try {
                    promiseToast('Creating post...', 'Uploading Music');
                    const tx = await postPublication({
                        postMetadata: contentURI,
                        profileId: id,
                        totalPrice: totalPrice || 0,
                    });
                    promiseToast('Indexing...', 'Uploading Music');
                    await pollUntilIndexed(tx.hash);
                } catch (e) {
                    const error = e as any;
                    if (error.code === 4001) {
                        errorToast('Cancelled!', 'Uploading Music');
                    } else {
                        errorToast('Something went wrong 😞. Please try again', 'Uploading Music');
                    }
                    console.error(e);
                    setLoader(false);
                    return;
                    // TODO: Handle the error here
                }
                // TODO: Handle case when user cancels the transaction
                const getPublicationsResult = await getPublications({
                    profileId: id,
                    publicationTypes: ['POST'],
                });
                const publicationID = getPublicationsResult?.data?.publications?.items[0]?.id;
                setLoader(false);
                if (publicationID) {
                    successToast('Post Created Successfully!!', 'Uploading Music');
                    dispatch(resetAllDetails());
                    navigate(`/project/${publicationID}`);
                } else {
                    // TODO: Show error toast here and
                }
            },
        });
    };

    const nextStep = () => {
        if (step === 1) {
            onUploadMusic();
            return;
        }
        if (step === 2) {
            createBud();
            return;
        }
    };

    const previousStep = () => {
        setStep((oldStep) => {
            if (step === 1) {
                return 1;
            }
            return oldStep - 1;
        });
    };
    return (
        <>
            <div className="p-4 px-8">
                <Card variant="sunken" color="dark" className="mt-4">
                    <CardBody padding={8}>
                        <h1 className="text-3xl mb-8 font-bold">Upload Bud</h1>
                        {step === 1 && <UploadMusic ref={uploadMusicRef} />}
                        {step === 2 && <AddTrack ref={createBudRef} />}
                        <div
                            className={clsx({
                                'flex justify-between mt-4': step != 1,
                                'flex justify-end mt-4': step == 1,
                            })}>
                            {step != 1 && (
                                <Button onClick={previousStep} variant="primary">
                                    Previous
                                </Button>
                            )}
                            <Button
                                loading={loader}
                                onClick={nextStep}
                                variant="primary"
                                className="px-16">
                                {step === 2 ? 'Create Bud' : 'Next'}
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </>
    );
};

export default CreateBudFlow;
