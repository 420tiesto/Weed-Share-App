import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSetState } from 'react-use';
import { v4 as uuidv4 } from 'uuid';
import { ClipboardCopyIcon } from '@heroicons/react/outline';
import { getProfiles } from '../services/get-profiles';
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
import getIPFSImageLink from '../../../utils/get-ipfs-url-link';
import { pollUntilIndexed } from '../../../services/has-transaction-been-indexed';
import { useSelector } from 'react-redux';
import { getUserProfile } from '../../auth/state/auth.reducer';
import { getPinataImageURL } from '../services/getPinataURL';
import { appId } from '../../../app/constants';
import { Card, CardBody } from '../../../app/components/common-ui/atoms/Card';
import Stack from '../../../app/components/common-ui/atoms/Stack';
import Button from '../../../app/components/common-ui/atoms/Button';
import { Input } from '../../../app/components/common-ui/atoms/Input';
import { TextArea } from '../../../app/components/common-ui/atoms/TextArea';

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
    const profileDetails = useSelector(getUserProfile);
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

    const { onSubmit } = props;
    const { coverImageLoading, coverImageURI, loading, profileImageURI } = state;

    useEffect(() => {
        // getProfileDetails();
        console.log(profileDetails);
        setState({
            coverImageURI:
                profileDetails.coverPicture === null
                    ? ''
                    : profileDetails.coverPicture.original.url,
        });
        setState({
            profileImageURI:
                profileDetails.picture === null ? '' : profileDetails.picture.original.url,
        });
    }, [profileDetails]);

    const uploadCoverPage = async (files: any) => {
        setState({ coverImageLoading: true });
        const file = files[0];
        const ipfsData = await pinImageToIPFS(file);
        const { IpfsHash: ipfsHash } = ipfsData;
        setState({ coverImageURI: getIPFSUrlLink(ipfsHash) });
        setState({ coverImageLoading: false });
    };

    const uploadProfileImage = async (files: any) => {
        setState({ coverImageLoading: true });
        const file = files[0];
        const ipfsData = await pinImageToIPFS(file);
        const { IpfsHash: ipfsHash } = ipfsData;
        console.log(getIPFSUrlLink(ipfsHash));
        console.log(ipfsData);
        setState({ profileImageURI: getIPFSUrlLink(ipfsHash) });
        setState({ coverImageLoading: false });
    };

    const updateProfileMetadataDetails: SubmitHandler<any> = async (data) => {
        await dispatch(login());
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
                        key: 'appId',
                        value: appId,
                    },
                ],
                version: '1.0.0',
                metadata_id: uuidv4(),
                appId: appId,
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
                console.log(tx.hash);
                await pollUntilIndexed(tx.hash).then((resp: any) => {
                    console.log(resp, 'Profile Created');
                    onSubmit();
                });
            })
            .catch((error: Error) => {
                console.log(error);
            });
    };

    const updateProfileImage: SubmitHandler<any> = async (data) => {
        await dispatch(login());
        const setProfileImageUriRequest = {
            profileId: profileDetails.id,
            url: profileImageURI,
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
                                        defaultValue={profileDetails.attributes.find(
                                            (attribute: any) => attribute.key === 'email'
                                        )}
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
                                        defaultValue={profileDetails.attributes.find(
                                            (attribute: any) => attribute.key === 'instagram'
                                        )}
                                        {...register('instagram')}
                                    />

                                    <Input
                                        leftIcon={<SpotifyIcon className="fill-current" />}
                                        type="text"
                                        placeholder="Enter Spotify Link"
                                        defaultValue={profileDetails.attributes.find(
                                            (attribute: any) => attribute.key === 'spotify'
                                        )}
                                        {...register('spotify')}
                                    />

                                    <Input
                                        leftIcon={<TwitterIcon className="fill-current" />}
                                        type="text"
                                        placeholder="Enter Twitter Link"
                                        defaultValue={profileDetails.twitter}
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
                                    <Button type="submit">Save</Button>
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
                                        showLoader={coverImageLoading}
                                        displayText="Upload Profile NFT Image"
                                        imageLink={getIPFSImageLink(profileImageURI)}
                                        helpText=".jpg , .png or .gif extension"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <Button type="submit">Save</Button>
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
