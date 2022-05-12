import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import UploadMusic from '../uploadMusic/UploadMusic';
import AddTrack from '../addTrack/AddTrack';
import { storeAlbumDetails } from '../../state/actions';
import { getAlbumDetails } from '../../state/selectors';

import { type AlbumDetails } from '../types';
import { type TrackDetails } from '../../types';
import postPublication from '../../services/post-publication';
import getAttributeType from '../../../../../../utils/get-attribute-type';
import getIPFSUrlLink from '../../../../../../utils/get-ipfs-url-link';
import { createPostMetadata } from '../../../../../../utils/create-post-metadata';
import { pinJSONToIPFS } from '../../../../../../utils/upload-json';
import { copyright } from '../../../../../../constants';
import { isUsingWallet } from '../../../../../../services/ethers-service';
import { setWalletModalOpen } from '../../../../../../state/actions';
import { useAppDispatch } from '../../../../../../state/configure-store';
import { login } from '../../../auth/services/lens-login';

const CreateProjectFlow = () => {
    const dispatch = useAppDispatch();
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
        // dispatch(login());
        (createProjectRef?.current as any)?.onSubmit({
            async onSuccess(tracks: TrackDetails[]) {
                if (!tracks[tracks.length - 1].ipfsHash) {
                    alert('Please save the track before creating the project');
                }
                const currentAlbumDetails = albumDetails as any;
                const {
                    albumCover,
                    artistName,
                    language,
                    primaryGenre,
                    recordLabel,
                    releaseDate,
                    secondaryGenre,
                    albumCoverType,
                } = currentAlbumDetails;
                const attributes = [
                    getAttributeType('string', 'Artist Name', artistName),
                    getAttributeType('date', 'Release Date', new Date(releaseDate)),
                    getAttributeType('string', 'Record Label', recordLabel),
                    getAttributeType('string', 'Language', language.name),
                    getAttributeType('string', 'Primary Genre', primaryGenre.name),
                    getAttributeType('string', 'Secondary Genre', secondaryGenre),
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
                const postMetadata = createPostMetadata({
                    media,
                    albumName: recordLabel,
                    albumCover: getIPFSUrlLink(albumCover),
                    albumCoverType,
                    attributes: attributes,
                });
                const jsonMetadata = {
                    name: recordLabel,
                };
                const { IpfsHash: contentURI } = await pinJSONToIPFS(postMetadata, jsonMetadata);
                await postPublication({ postMetadata: contentURI });
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
            {step === 1 && <UploadMusic ref={uploadMusicRef} />}
            {step === 2 && <AddTrack ref={createProjectRef} />}
            <div className="flex justify-between">
                <button
                    onClick={previousStep}
                    className={classNames('green-btn max-w-fit px-10 mt-8', {
                        invisible: step === 1,
                    })}>
                    Previous
                </button>
                <button onClick={nextStep} className="green-btn max-w-fit px-10 mt-8">
                    {step === 2 ? 'Create Project' : 'Next'}
                </button>
            </div>
            <p className="mx-auto bottom-4 col-span-2">{copyright}</p>
        </>
    );
};

export default CreateProjectFlow;
