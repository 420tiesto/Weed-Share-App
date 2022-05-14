import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSetState } from 'react-use';
import { v4 as uuidv4 } from 'uuid';

import { ClipboardCopyIcon } from '@heroicons/react/outline';
import InstagramIcon from '../../../../../icons/InstagramIcon';
import SpotifyIcon from '../../../../../icons/SpotifyIcon';
import { getProfiles } from '../services/get-profiles';
import { pinImageToIPFS } from '../../../../../utils/upload-file';
import TwitterIcon from '../../../../../icons/TwitterIcon';
import UploadImage from '../../../../../components/common-ui/upload-image';
import getIPFSImageLink from '../../../../../utils/get-ipfs-url-link';
import { pinJSONToIPFS } from '../../../../../utils/upload-json';
import { createSetProfileMetadataTypedData } from '../services/update-profile-metadata';
import { signedTypeData } from '../../../../../services/signed-typed-data';
import { getAddressFromSigner, splitSignature } from '../../../../../services/ethers-service';
import { lensHub, lensPeriphery } from '../../../../../services/lens-hub';
import { login } from '../../auth/services/lens-login';
import { useAppDispatch } from '../../../../../state/configure-store';
import getIPFSUrlLink from '../../../../../utils/get-ipfs-url-link';
import { createSetProfileImageUriTypedData } from '../services/update-profile-image';

interface Props {
    profileDetails: any;
    onSubmit: () => void;
}

interface State {
    profileDetails: any[];
    coverImageLoading: boolean;
    coverImageURI: string;
    loading: boolean;
    profileImageURI: string;
}

const ProfileSettings: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<any>();
    const [state, setState] = useSetState<State>({
        profileDetails: [],
        coverImageLoading: false,
        coverImageURI: '',
        profileImageURI: '',
        loading: false,
    });

    const { profileDetails } = props;
    const { coverImageLoading, coverImageURI, loading, profileImageURI } = state;

    useEffect(() => {
        // getProfileDetails();
        console.log(profileDetails);
        setState({ coverImageURI: profileDetails.coverPicture });
        setState({
            profileImageURI:
                profileDetails.picture === null ? '' : profileDetails.picture.original.url,
        });
    }, []);

    const uploadCoverPage = async (files: any) => {
        setState({ coverImageLoading: true });
        const file = files[0];
        const ipfsData = await pinImageToIPFS(file);
        const { IpfsHash: ipfsHash } = ipfsData;
        setState({ coverImageURI: ipfsHash });
        setState({ coverImageLoading: false });
    };

    const uploadProfileImage = async (files: any) => {
        setState({ coverImageLoading: true });
        const file = files[0];
        const ipfsData = await pinImageToIPFS(file);
        const { IpfsHash: ipfsHash } = ipfsData;
        setState({ profileImageURI: ipfsHash });
        setState({ coverImageLoading: false });
    };

    const updateProfileMetadataDetails: SubmitHandler<any> = async (data) => {
        // await dispatch(login());
        console.log(data, coverImageURI);
        setState({ loading: true });
        let name = data.name;
        const metadata = {
            name: data.name,
        };
        const { IpfsHash } = await pinJSONToIPFS(
            {
                name,
                social: [
                    {
                        traitType: 'string',
                        key: 'website',
                        value: data.website,
                    },
                    {
                        traitType: 'string',
                        key: 'twitter',
                        value: data.twitetr,
                    },
                ],
                bio: data.bio,
                cover_picture: coverImageURI,
                location: data.location,
                attributes: [
                    {
                        traitType: 'string',
                        key: 'app',
                        value: 'Lenster',
                    },
                ],
                version: '1.0.0',
                metadata_id: uuidv4(),
                appId: 'Lenster',
            },
            metadata
        ).finally(() => setState({ loading: false }));
        console.log(IpfsHash);

        const createProfileMetadataRequest = {
            profileId: profileDetails.id,
            url: `ipfs://${IpfsHash}`,
        };

        // TODO: Check if user is logged in to lens
        let result: any;
        await createSetProfileMetadataTypedData(
            createProfileMetadataRequest.profileId,
            createProfileMetadataRequest.url
        )
            .then((x) => {
                console.log(x);
                result = x;
            })
            .catch((error) => {
                console.log(error);
            });

        const typedData = result.data.createSetProfileMetadataTypedData.typedData;

        const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
        const { v, r, s } = splitSignature(signature);

        const tx = await lensPeriphery
            .setProfileMetadataURIWithSig({
                // this is going to be changing on next deployment
                // as this wont be required to be supplied
                user: getAddressFromSigner(),
                profileId: createProfileMetadataRequest.profileId,
                metadata: createProfileMetadataRequest.url,
                sig: {
                    v,
                    r,
                    s,
                    deadline: typedData.value.deadline,
                },
            })
            .then(() => {})
            .catch((error: Error) => {
                console.log(error);
            });
        console.log(tx.hash);
    };

    const updateProfileImage: SubmitHandler<any> = async (data) => {
        await dispatch(login());
        console.log(getIPFSUrlLink(coverImageURI));
        const setProfileImageUriRequest = {
            profileId: profileDetails.id,
            url: `ipfs://${coverImageURI}`,
        };

        const result = await createSetProfileImageUriTypedData(setProfileImageUriRequest);
        const typedData = result.data.createSetProfileImageURITypedData.typedData;

        const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
        const { v, r, s } = splitSignature(signature);

        const tx = await lensHub.setProfileImageURIWithSig({
            profileId: typedData.value.profileId,
            imageURI: typedData.value.imageURI,
            sig: {
                v,
                r,
                s,
                deadline: typedData.value.deadline,
            },
        });
        console.log(tx.hash);
    };

    return (
        <>
            {Object.keys(profileDetails).length !== 0 ? (
                <div className="w-full space-y-8">
                    <h2 className="text-2xl font-medium">Profile Settings</h2>
                    <form
                        className="space-y-4  flex-grow p-8 rounded-xl sunken-element"
                        onSubmit={handleSubmit(updateProfileMetadataDetails)}>
                        <div className="grid gap-2">
                            <label>Username</label>
                            <input
                                type="text"
                                placeholder="Enter username"
                                className="primary-input w-full"
                                defaultValue={profileDetails.name}
                                {...register('name')}
                            />
                        </div>
                        <div className="grid gap-2">
                            <label>Bio</label>
                            <textarea
                                rows={4}
                                placeholder="Tell the world about yourself"
                                className="primary-input rounded-2xl w-full"
                                defaultValue={profileDetails.bio}
                                {...register('bio')}
                            />
                        </div>
                        <div className="grid gap-2">
                            <label>Email address</label>
                            <input
                                type="email"
                                placeholder="Enter username"
                                className="primary-input w-full"
                                defaultValue={profileDetails.attributes.find(
                                    (attribute: any) => attribute.key === 'email'
                                )}
                                {...register('email')}
                            />
                        </div>
                        <div className="grid gap-2">
                            <label>Location</label>
                            <input
                                type="email"
                                placeholder="Enter username"
                                className="primary-input w-full"
                                defaultValue={profileDetails.location}
                                {...register('location')}
                            />
                        </div>
                        <h6 className="font-medium text-xl">Links</h6>
                        <div className="grid gap-2 relative">
                            <label>Instagram</label>
                            <InstagramIcon className="absolute bottom-[6px] left-2 text-slate-400 fill-current" />
                            <input
                                type="text"
                                placeholder="Enter Instagram Link"
                                className="pl-10 primary-input w-full"
                                defaultValue={profileDetails.attributes.find(
                                    (attribute: any) => attribute.key === 'instagram'
                                )}
                                {...register('instagram')}
                            />
                        </div>
                        <div className="grid gap-2 relative">
                            <label>Spotify </label>
                            <SpotifyIcon className="absolute bottom-3 left-3 text-slate-400 fill-current" />
                            <input
                                type="text"
                                placeholder="Enter Spotify Link"
                                className="pl-10 primary-input w-full"
                                defaultValue={profileDetails.attributes.find(
                                    (attribute: any) => attribute.key === 'spotify'
                                )}
                                {...register('spotify')}
                            />
                        </div>
                        <div className="grid gap-2 relative">
                            <label>Twitter </label>
                            <TwitterIcon className="absolute bottom-3 left-3 text-slate-400 fill-current" />
                            <input
                                type="text"
                                placeholder="Enter Twitter Link"
                                className="pl-10 primary-input w-full"
                                defaultValue={profileDetails.twitter}
                                {...register('twitter')}
                            />
                        </div>

                        <div>
                            <label className="font-medium text-lg flex-grow ">Cover</label>
                            {/* <img
                                className="rounded-2xl h-40 w-full mt-4"
                                src="https://images.unsplash.com/photo-1490604001847-b712b0c2f967?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1853&q=80"
                                alt="cover"
                            /> */}
                            <UploadImage
                                uploadHelper={uploadCoverPage}
                                showLoader={coverImageLoading}
                                displayText="Upload Profile NFT Image"
                                imageLink={getIPFSImageLink(coverImageURI)}
                            />
                        </div>

                        <button className="green-btn max-w-fit px-6" type="submit">
                            Save
                        </button>

                        <h6 className="font-medium text-xl">Handle</h6>
                        <div className="grid gap-2 relative">
                            <ClipboardCopyIcon className="absolute bottom-2 hover:text-black cursor-pointer right-3 text-slate-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Enter Spotify Link"
                                className="primary-input w-full pr-10"
                                value={profileDetails.handle}
                            />
                        </div>
                        <h6 className="font-medium text-xl">Wallet address</h6>
                        <div className="grid gap-2 relative">
                            <ClipboardCopyIcon className="absolute bottom-2 hover:text-black cursor-pointer right-3 text-slate-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Enter Spotify Link"
                                className="primary-input w-full pr-10"
                                value={profileDetails.ownedBy}
                            />
                        </div>
                    </form>
                    <form
                        className="space-y-4  flex-grow p-8 rounded-xl sunken-element"
                        onSubmit={handleSubmit(updateProfileImage)}>
                        <div>
                            <label className="font-medium text-lg flex-grow ">Profile Image</label>
                            {/* <img
                                className="rounded-full h-32 w-32 mt-4"
                                src="https://images.unsplash.com/photo-1490604001847-b712b0c2f967?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1853&q=80"
                                alt="avatar"
                            /> */}
                            <UploadImage
                                uploadHelper={uploadProfileImage}
                                showLoader={coverImageLoading}
                                displayText="Upload Profile NFT Image"
                                imageLink={getIPFSImageLink(profileImageURI)}
                            />
                        </div>
                        <button className="green-btn max-w-fit px-6" type="submit">
                            Save
                        </button>
                    </form>
                </div>
            ) : (
                <div>Loading</div>
            )}
        </>
    );
};

export default ProfileSettings;
