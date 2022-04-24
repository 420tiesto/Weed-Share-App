import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { copyright } from '../../../../../../constants';
import Stepper from '../signUp/Stepper';
import Upload from '../../../../../../components/common-ui/upload';
import { pinImageToIPFS } from '../../../../../../utils/upload-file';
import { type LoaderState } from './types';
import { storeProfileURI, storeFollowURI } from '../../services/store-image-uris';
import { useAppDispatch } from '../../../../../../state/configure-store';
import { getImageURIs } from '../../../../../../state/selectors';
import { getStorageValue } from '../../../../../../utils/local-storage/local-storage';
import { USER_PROFILE_URI, USER_FOLLOW_URI } from '../../../../../../utils/local-storage/keys';
import getIPFSImageLink from '../../../../../../utils/get-ipfs-image-link';

const UploadNfts = () => {
    const [loader, setLoader] = useState<LoaderState>({
        profileURILoading: false,
        followURILoading: false,
    });
    const { profileURI, followURI } = useSelector(getImageURIs);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const userProfileUri = getStorageValue(USER_PROFILE_URI);
        if (!!userProfileUri) {
            dispatch(storeProfileURI(userProfileUri));
        }

        const userFollowUri = getStorageValue(USER_FOLLOW_URI);
        if (!!userFollowUri) {
            dispatch(storeFollowURI(userFollowUri));
        }
    }, []);

    const uploadProfile = async (files: any) => {
        setLoader({ ...loader, profileURILoading: true });
        const file = files[0];
        const ipfsData = await pinImageToIPFS(file);
        const { IpfsHash: ipfsHash } = ipfsData;
        dispatch(storeProfileURI(ipfsHash));
        setLoader({ ...loader, profileURILoading: false });
    };

    const uploadFollow = async (files: any) => {
        setLoader({ ...loader, followURILoading: true });
        const file = files[0];
        const ipfsData = await pinImageToIPFS(file);
        const { IpfsHash: ipfsHash } = ipfsData;
        dispatch(storeFollowURI(ipfsHash));
        setLoader({ ...loader, followURILoading: false });
    };

    return (
        <div className="min-h-screen p-4 flex flex-col gap-4 items-center justify-center">
            <Stepper step={3} />
            <div className="relative sunken-element--dark gap-8 w-full max-w-screen-md flex-col flex items-center justify-center overflow-hidden bg-gray-900 px-16 py-8 rounded-2xl">
                <div>
                    <h1 className="text-2xl mb-2 md:text-4xl font-semibold text-center">
                        Upload your images
                    </h1>
                    <p className="text-center">PNG,JPG,GIF Files are allowed</p>
                </div>
                <div className="flex justify-around w-full flex-wrap">
                    <Upload
                        uploadHelper={uploadProfile}
                        showLoader={loader.profileURILoading}
                        displayText="Upload Profile NFT Image"
                        imageLink={getIPFSImageLink(profileURI)}
                    />
                    {/* Divider */}
                    <div className="hidden md:flex w-[2px] bg-gray-500"></div>
                    <Upload
                        uploadHelper={uploadFollow}
                        showLoader={loader.followURILoading}
                        displayText="Upload Follow NFT Image"
                        imageLink={getIPFSImageLink(followURI)}
                    />
                </div>
                <button className="green-btn max-w-xs">Next</button>
            </div>
            <p className="mt-8 bottom-8">{copyright}</p>
        </div>
    );
};

export default UploadNfts;
