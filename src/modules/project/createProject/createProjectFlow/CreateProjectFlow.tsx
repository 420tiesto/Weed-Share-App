import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

import UploadMusic from '../uploadMusic/UploadMusic';
import AddTrack from '../addTrack/AddTrack';
import { resetAllDetails, storeAlbumDetails } from '../../state/actions';
import { getAlbumDetails } from '../../state/selectors';

import { login } from '../../../auth/services/lens-login';
import { type AlbumDetails, type TrackDetails } from '../../types';
import postPublication from '../../services/post-publication';
import { useAppDispatch } from '../../../../state/configure-store';
import { setWalletModalOpen } from '../../../../state/actions';
import { isUsingWallet } from '../../../../services/ethers-service';
import getAttributeType from '../../../../utils/get-attribute-type';
import getIPFSUrlLink from '../../../../utils/get-ipfs-url-link';
import { createPostMetadata } from '../../../../utils/create-post-metadata';
import { uploadWeb3Json } from '../../../../utils/upload-json';
import { getUserProfile } from '../../../auth/state/auth.reducer';
import Button from '../../../../app/components/common-ui/atoms/Button';
import { getPublications } from '../../../profile/services/get-publications';
import { pollUntilIndexed } from '../../../../services/has-transaction-been-indexed';
import {
    successToast,
    promiseToast,
    errorToast,
} from '../../../../app/components/common-ui/toasts/CustomToast';
import { Card, CardBody } from '../../../../app/components/common-ui/atoms/Card';

const CreateProjectFlow = () => {
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useSelector(getUserProfile);
    const [step, setStep] = useState(1);
    const albumDetails = useSelector(getAlbumDetails);
    const uploadMusicRef = useRef();
    const createProjectRef = useRef();

    const openModal = () => {
        dispatch(setWalletModalOpen(true));
    };

    const onUploadMusic = async () => {
        console.log(uploadMusicRef?.current, '***** check this');
        (uploadMusicRef?.current as any)?.onSubmit({
            onSuccess(data: AlbumDetails) {
                setStep(2);
                dispatch(storeAlbumDetails(data));
            },
        });
    };

    const createProject = async () => {
        // TODO: Check if user has selected a profile
        const isUsingMetamaskWallet = await isUsingWallet();
        if (!isUsingMetamaskWallet) {
            openModal();
            return;
        }
        // TODO: Check if user is logged in to lens
        // await dispatch(login());
        (createProjectRef?.current as any)?.onSubmit({
            async onSuccess(tracks: TrackDetails[]) {
                if (!tracks[tracks.length - 1].ipfsHash) {
                    alert('Please save the track before creating the project');
                    return;
                }
                setLoader(true);
                const currentAlbumDetails = albumDetails;
                const {
                    albumCover,
                    artistName,
                    language,
                    primaryGenre,
                    recordLabel,
                    releaseDate,
                    secondaryGenre,
                    albumCoverType,
                    albumPrice,
                } = currentAlbumDetails;
                const attributes = [
                    getAttributeType('string', 'Artist Name', artistName),
                    getAttributeType('date', 'Release Date', new Date(releaseDate)),
                    getAttributeType('string', 'Record Label', recordLabel),
                    getAttributeType('string', 'Language', language.name),
                    getAttributeType('string', 'Primary Genre', primaryGenre.name),
                    getAttributeType('string', 'Secondary Genre', secondaryGenre),
                    getAttributeType('string', 'Album Cover', getIPFSUrlLink(albumCover)),
                    getAttributeType('string', 'Album Cover Type', albumCoverType),
                    getAttributeType('number', 'Number of Tracks', tracks.length),
                ];
                let media = [];
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
                const totalPrice = albumPrice;
                const postMetadata = createPostMetadata({
                    media,
                    albumName: recordLabel,
                    albumCover: getIPFSUrlLink(albumCover),
                    albumCoverType,
                    attributes: attributes,
                });
                promiseToast('Uploading Content...', 'Uploading Album');
                const contentURI = await uploadWeb3Json(recordLabel, JSON.stringify(postMetadata));
                try {
                    promiseToast('Creating post...', 'Uploading Album');
                    const tx = await postPublication({ postMetadata: contentURI, profileId: id, totalPrice: totalPrice || 0 });
                    promiseToast('Indexing...', 'Uploading Album');
                    await pollUntilIndexed(tx.hash);
                } catch (e) {
                    const error = e as any;
                    if (error.code === 4001) {
                        errorToast('Cancelled!', 'Uploading Album');
                    } else {
                        errorToast('Something went wrong 😞. Please try again', 'Uploading Album');
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
                    successToast('Post Created Successfully!!', 'Uploading Album');
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
            createProject();
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
            <div className="p-4">
                <Card variant="sunken" color="dark" className="mt-4">
                    <CardBody padding={8}>
                    <h1 className="text-3xl text-center mb-2 font-bold">Create Project</h1>
                        {step === 1 && <UploadMusic ref={uploadMusicRef} />}
                        {step === 2 && <AddTrack ref={createProjectRef} />}
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
                            <Button loading={loader} onClick={nextStep} variant="primary">
                                {step === 2 ? 'Create Project' : 'Next'}
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </>
    );
};

export default CreateProjectFlow;
