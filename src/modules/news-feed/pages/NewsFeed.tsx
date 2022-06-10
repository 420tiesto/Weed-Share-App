import { Tab } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';

import AllDiscussions from '../components/AllDiscussions';
import CreatePostModal from '../components/CreatePostModal';
import FollowingNews from '../components/FollowingNews';
import NewsSidebar from '../components/NewsSidebar';
import { getUserAuthenticated, getUserProfile } from '../../auth/state/auth.reducer';
import { pinImageToIPFS } from '../../../utils/upload-file';
import getIPFSUrlLink from '../../../utils/get-ipfs-url-link';
import { useSetState } from 'react-use';
import { pinJSONToIPFS } from '../../../utils/upload-json';
import { createPostTypedData } from '../services/create-post';
import { signedTypeData } from '../../../services/signed-typed-data';
import { splitSignature } from '../../../services/ethers-service';
import { lensHub } from '../../../services/lens-hub';
import { errorToast, successToast } from '../../../app/components/common-ui/toasts/CustomToast';
import { pollUntilIndexed } from '../../../services/has-transaction-been-indexed';
import { appId, appIds } from '../../../app/constants';

interface Props {}

interface State {
    loading: boolean;
    showModal: boolean;
    postHash: string;
}

const NewsFeed: React.FC<Props> = (props: Props) => {
    //redux state
    const authenticatedState = useSelector(getUserAuthenticated);
    const profileDetails = useSelector(getUserProfile);

    const [state, setState] = useSetState<State>({
        loading: false,
        showModal: false,
        postHash: '',
    });

    const { loading, showModal, postHash } = state;

    useEffect(() => {
        console.log(profileDetails, 'prpfilede');
    }, []);

    // const closeModal = () => {
    //     setIsCreatePostModalOpen(false);
    // };

    const createPost = async (data: any) => {
        // upload to IPFS first
        // then upload to LENS
        // show loading button in create post
        // show notification that post created
        // close popup
        console.log(data, data);
        await uploadDataToIPFS(data);
        const createPostRequest = {
            profileId: profileDetails.id,
            contentURI: `ipfs://${postHash}`,
            collectModule: {
                freeCollectModule: {
                    followerOnly: false,
                },
            },
            referenceModule: {
                followerOnlyReferenceModule: true,
            },
        };
        const result = await createPostTypedData(createPostRequest);
        const typedData = result.data.createPostTypedData.typedData;

        const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
        const { v, r, s } = splitSignature(signature);

        const tx = await lensHub
            .postWithSig({
                profileId: typedData.value.profileId,
                contentURI: typedData.value.contentURI,
                collectModule: typedData.value.collectModule,
                collectModuleInitData: typedData.value.collectModuleInitData,
                referenceModule: typedData.value.referenceModule,
                referenceModuleInitData: typedData.value.referenceModuleInitData,
                sig: {
                    v,
                    r,
                    s,
                    deadline: typedData.value.deadline,
                },
            })
            .then(async (tx: any) => {
                console.log(tx.hash);
                successToast('Post has been sucessfully indexed', 'Create Post');
                await pollUntilIndexed(tx.hash)
                    .then((resp: any) => {
                        console.log(resp, 'Profile updated');
                        setState({ loading: false });
                        setState({ showModal: false });
                        // onSubmit();
                    })
                    .catch((error: Error) => {
                        setState({ loading: false });
                        console.log(error);
                        errorToast('Profile Image has Failed', error.message);
                    });
            })
            .catch((error: Error) => {
                console.log(error);
                setState({ loading: false });
                errorToast('Profile Image has Failed', error.message);
            });
    };

    const uploadDataToIPFS = async (data: any) => {
        setState({ loading: true });
        const metadata = {
            name: 'Post',
        };
        const ipfsData = await pinJSONToIPFS(
            {
                version: '1.0.0',
                metadata_id: uuid(),
                content: data,
                appId: appIds[3],
            },
            metadata
        );
        const { IpfsHash: ipfsHash } = ipfsData;
        console.log(ipfsHash);
        setState({ postHash: getIPFSUrlLink(ipfsHash) });
        // setState({ loading: false });
    };

    return (
        <>
            {!!authenticatedState && profileDetails && (
                <CreatePostModal
                    isOpen={showModal}
                    closeModal={() => setState({ showModal: false })}
                    onSuccess={(data: any) => createPost(data)}
                    profileImg={profileDetails.picture.original.url}
                />
            )}

            <div className="pt-4">
                <Tab.Group>
                    <div className="max-w-[320px] h-ful col-span-1 fixed left-4 top-20">
                        <NewsSidebar
                            openModal={() => setState({ showModal: true })}
                            authenticatedState={authenticatedState}
                        />
                    </div>
                    <div className="ml-[320px] px-8 max-h-max">
                        <Tab.Panels>
                            <Tab.Panel>
                                <AllDiscussions />
                            </Tab.Panel>
                            {!!authenticatedState && (
                                <Tab.Panel>
                                    <FollowingNews />
                                </Tab.Panel>
                            )}
                        </Tab.Panels>
                    </div>
                </Tab.Group>
            </div>
        </>
    );
};

export default NewsFeed;
