import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSetState } from 'react-use';
import { v4 as uuidv4 } from 'uuid';
import { ClipboardCopyIcon } from '@heroicons/react/outline';

import { useGetProfile } from '../services/get-profiles';
import { createSetProfileMetadataTypedData } from '../services/update-profile-metadata';
import { login } from '../../auth/services/lens-login';
import { createSetProfileImageUriTypedData } from '../services/update-profile-image';
import { useAppDispatch } from '../../../state/configure-store';
import { pinImageToIPFS } from '../../../utils/upload-file';
import { pinJSONToIPFS } from '../../../utils/upload-json';
import { signedTypeData } from '../../../services/signed-typed-data';
import { getAddressFromSigner, splitSignature } from '../../../services/ethers-service';
import { lensHub, lensPeriphery } from '../../../services/lens-hub';
import getIPFSUrlLink from '../../../utils/get-ipfs-url-link';
import InstagramIcon from '../../../app/icons/InstagramIcon';
import SpotifyIcon from '../../../app/icons/SpotifyIcon';
import TwitterIcon from '../../../app/icons/TwitterIcon';
import UploadImage from '../../../app/components/common-ui/upload-image';
import { pollUntilIndexed } from '../../../services/has-transaction-been-indexed';
import { useSelector } from 'react-redux';
import { getUserHandle } from '../../auth/state/auth.reducer';
import { appId } from '../../../app/constants';
import { Card, CardBody } from '../../../app/components/common-ui/atoms/Card';
import Stack from '../../../app/components/common-ui/atoms/Stack';
import Button from '../../../app/components/common-ui/atoms/Button';
import { Input } from '../../../app/components/common-ui/atoms/Input';
import { TextArea } from '../../../app/components/common-ui/atoms/TextArea';
import { errorToast, successToast, promiseToast } from '../../../app/components/common-ui/toasts/CustomToast';
import { getStorageValue } from '../../../utils/local-storage/local-storage';
import { LENS_TOKENS } from '../../../utils/local-storage/keys';
import { isValidToken } from '../../../utils/auth-helpers';
import getAttributeType from '../../../utils/get-attribute-type';

interface Props {
    profileDetails: any;
    onSubmit: () => void;
}

interface State {
    // profileDetails: {};
    coverImageLoading: boolean;
    coverImageURI: string;
    loading: boolean;
    profileImageURI: string;
    profileImageLoading: boolean;
    checkingMetaData: boolean;
    checkingProfilePicture: boolean;
}

const ProfileSettings: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();
    const userHandle = useSelector(getUserHandle);
    const { data: profileDetails = {}, refetch, isLoading } = useGetProfile(userHandle);
    const { attributes = [] } = profileDetails;
    const [, emailId, instagramLink, twitterLink, spotifyLink] = attributes;
    const auth = getStorageValue(LENS_TOKENS);
    const {
        register,
        handleSubmit,
    } = useForm<any>();
    const [state, setState] = useSetState<State>({
        coverImageLoading: false,
        coverImageURI: '',
        profileImageURI: '',
        loading: false,
        profileImageLoading: false,
        checkingMetaData: false,
        checkingProfilePicture: false,
    });

    const { onSubmit } = props;
    const {
        coverImageLoading,
        coverImageURI,
        loading,
        profileImageURI,
        profileImageLoading,
        checkingMetaData,
        checkingProfilePicture,
    } = state;

    useEffect(() => {
        setState({
            coverImageURI:
                profileDetails.coverPicture === null
                    ? ''
                    : profileDetails?.coverPicture?.original.url,
        });
        setState({
            profileImageURI:
                profileDetails.picture === null ? '' : profileDetails?.picture?.original?.url,
        });
    }, [isLoading]);

    const uploadCoverPage = async (files: any) => {
        setState({ coverImageLoading: true });
        const file = files[0];
        const ipfsData = await pinImageToIPFS(file);
        const { IpfsHash: ipfsHash } = ipfsData;
        setState({ coverImageURI: getIPFSUrlLink(ipfsHash) });
        setState({ coverImageLoading: false });
    };

    const uploadProfileImage = async (files: any) => {
        setState({ profileImageLoading: true });
        const file = files[0];
        const ipfsData = await pinImageToIPFS(file);
        const { IpfsHash: ipfsHash } = ipfsData;
        setState({ profileImageURI: getIPFSUrlLink(ipfsHash) });
        setState({ profileImageLoading: false });
    };

    const updateProfileMetadataDetails: SubmitHandler<any> = async (data) => {
        const { accessToken } = JSON.parse(auth!);
        if (!isValidToken(accessToken)) {
            await dispatch(login());
        }
        setState({ loading: true });
        setState({ checkingMetaData: true });
        let name = data.name;
        const metadata = {
            name: data.name,
        };
        const { IpfsHash } = await pinJSONToIPFS(
            {
                name,
                bio: data.bio,
                cover_picture: coverImageURI,
                attributes: [
                    getAttributeType('string', 'Application ID', appId, 'appId'),
                    getAttributeType('string', 'Email ID', data.email, 'emailId'),
                    getAttributeType('string', 'Instagram Link', data.instagram, 'instagramLink'),
                    getAttributeType('string', 'Twitter Link', data.twitter, 'twitterLink'),
                    getAttributeType('string', 'Spotify Link', data.spotify, 'spotifyLink'),
                ],
                version: '1.0.0',
                metadata_id: uuidv4(),
            },
            metadata
        ).finally(() => setState({ loading: false }));

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
            .then((x: any) => {
                console.log(x);
                result = x;
            })
            .catch((error: Error) => {
                console.log(error);
            });

        const typedData = result.data.createSetProfileMetadataTypedData.typedData;

        const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
        const { v, r, s } = splitSignature(signature);

        await lensPeriphery
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
            .then(async (tx: any) => {
                promiseToast('Indexing...', 'Profile');
                await pollUntilIndexed(tx.hash)
                    .then((resp: any) => {
                        successToast('Profile has been Succesfully Uploaded', 'Profile Updated');
                        refetch();
                        console.log(resp, 'Profile updated');
                        setState({ checkingMetaData: false });
                        onSubmit();
                    })
                    .catch((error: Error) => {
                        errorToast('Profile update has Failed', error.message);
                        setState({ checkingMetaData: false });
                        console.log(error);
                    });
            })
            .catch((error: Error) => {
                errorToast('Profile update has Failed', error.message);
                setState({ checkingMetaData: false });
                console.log(error);
            });
    };

    const updateProfileImage: SubmitHandler<any> = async (data) => {
        await dispatch(login());
        setState({ checkingProfilePicture: true });
        const setProfileImageUriRequest = {
            profileId: profileDetails.id,
            url: profileImageURI,
        };

        const result = await createSetProfileImageUriTypedData(setProfileImageUriRequest);
        const typedData = result.data.createSetProfileImageURITypedData.typedData;

        const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
        const { v, r, s } = splitSignature(signature);

        const tx = await lensHub
            .setProfileImageURIWithSig({
                profileId: typedData.value.profileId,
                imageURI: typedData.value.imageURI,
                sig: {
                    v,
                    r,
                    s,
                    deadline: typedData.value.deadline,
                },
            })
            .then(async (tx: any) => {
                console.log(tx.hash);
                successToast('Profile Image has been Succesfully Uploaded', 'Profile Updated');
                await pollUntilIndexed(tx.hash)
                    .then((resp: any) => {
                        console.log(resp, 'Profile updated');
                        setState({ checkingProfilePicture: false });
                        onSubmit();
                    })
                    .catch((error: Error) => {
                        setState({ checkingProfilePicture: false });
                        console.log(error);
                        errorToast('Profile Image has Failed', error.message);
                    });
            })
            .catch((error: Error) => {
                console.log(error);
                setState({ checkingProfilePicture: false });
                errorToast('Profile Image has Failed', error.message);
            });
    };

    return (
        <>
            {!isLoading ? (
                <>
                    <Card variant="elevated" className="rounded-[30px]">
                        <CardBody padding={8} className="px-12">
                            <form onSubmit={handleSubmit(updateProfileMetadataDetails)}>
                                <Stack spacing={4} className="max-w-lg">
                                    <Input
                                        label="Username"
                                        type="text"
                                        placeholder="Enter username"
                                        defaultValue={profileDetails.name}
                                        {...register('name')}
                                    />
                                    <TextArea
                                        label="Bio"
                                        rows={4}
                                        placeholder="Tell the world about yourself"
                                        defaultValue={profileDetails.bio}
                                        {...register('bio')}
                                    />
                                    <Input
                                        label="Email Address"
                                        type="email"
                                        placeholder="Enter email"
                                        defaultValue={emailId?.value}
                                        {...register('email')}
                                    />

                                    <h6 className="font-bold text-xl mt-4 mb-2">
                                        Social Connections
                                    </h6>
                                    <p className="text-lg">Links</p>
                                    {/* <InstagramIcon className="absolute bottom-[6px] left-2 text-slate-400 fill-current" /> */}
                                    <Input
                                        leftIcon={<InstagramIcon className="fill-current" />}
                                        type="text"
                                        placeholder="Enter Instagram Link"
                                        defaultValue={instagramLink?.value}
                                        {...register('instagram')}
                                    />

                                    <Input
                                        leftIcon={<SpotifyIcon className="fill-current" />}
                                        type="text"
                                        placeholder="Enter Spotify Link"
                                        defaultValue={spotifyLink?.value}
                                        {...register('spotify')}
                                    />

                                    <Input
                                        leftIcon={<TwitterIcon className="fill-current" />}
                                        type="text"
                                        placeholder="Enter Twitter Link"
                                        defaultValue={twitterLink?.value}
                                        {...register('twitter')}
                                    />

                                    <p className="text-lg">Wallet</p>

                                    <Input
                                        rightIcon={
                                            <ClipboardCopyIcon className="h-5 w-5 cursor-pointer" />
                                        }
                                        type="text"
                                        placeholder="Enter Spotify Link"
                                        value={profileDetails.ownedBy}
                                    />
                                    <div>
                                        <label className="font-medium text-lg flex-grow ">
                                            Cover
                                        </label>

                                        <UploadImage
                                            uploadHelper={uploadCoverPage}
                                            showLoader={coverImageLoading}
                                            displayText="Upload Cover Image"
                                            imageLink={coverImageURI}
                                            helpText=".jpg , .png or .gif extension"
                                        />
                                    </div>
                                </Stack>
                                <div className="flex justify-end">
                                    <Button type="submit" loading={checkingMetaData}>
                                        Save
                                    </Button>
                                </div>
                            </form>
                        </CardBody>
                    </Card>
                    <Card variant="elevated" className="rounded-[30px] mt-8">
                        <CardBody padding={8} className="px-12">
                            <form
                                className="space-y-4  "
                                onSubmit={handleSubmit(updateProfileImage)}>
                                <div>
                                    <label className="font-medium text-lg flex-grow ">
                                        Profile Image
                                    </label>

                                    <UploadImage
                                        uploadHelper={uploadProfileImage}
                                        showLoader={profileImageLoading}
                                        displayText="Upload Profile NFT Image"
                                        imageLink={profileImageURI}
                                        helpText=".jpg , .png or .gif extension"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <Button type="submit" loading={checkingProfilePicture}>
                                        Save
                                    </Button>
                                </div>
                            </form>
                        </CardBody>
                    </Card>
                </>
            ) : (
                <div>Loading</div>
            )}
        </>
    );
};

export default ProfileSettings;
