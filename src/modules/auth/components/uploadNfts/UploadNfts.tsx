import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Stepper from '../signUp/Stepper';
import { type LoaderState } from './types';
import { storeProfileURI, storeFollowURI } from '../../services/store-image-uris';
import { getImageURIs } from '../../../../state/selectors';
import { useAppDispatch } from '../../../../state/configure-store';
import { getStorageValue } from '../../../../utils/local-storage/local-storage';
import { USER_FOLLOW_URI, USER_PROFILE_URI } from '../../../../utils/local-storage/keys';
import { pinImageToIPFS } from '../../../../utils/upload-file';
import UploadImage from '../../../../app/components/common-ui/upload-image';
import { copyright } from '../../../../app/constants';

interface UploadNftsProps {
    setStep: (step: number) => void;
    submit: () => void;
}

const UploadNfts: React.FC<UploadNftsProps> = ({ setStep, submit }) => {
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

    const goBack = () => {
        setStep(1);
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
                {/* <div className="flex justify-around w-full flex-wrap">
                    <UploadImage
                        uploadHelper={uploadProfile}
                        showLoader={loader.profileURILoading}
                        displayText="Upload Profile NFT Image"
                        imageLink={getIPFSImageLink(profileURI)}
                    />
                    Divider
                    <div className="hidden md:flex w-[2px] bg-gray-500"></div>
                    <UploadImage
                        uploadHelper={uploadFollow}
                        showLoader={loader.followURILoading}
                        displayText="Upload Follow NFT Image"
                        imageLink={getIPFSImageLink(followURI)}
                    />
                </div> */}
                <div className="flex flex-row pl-4 pr-4 justify-between w-3/4">
                    <button onClick={goBack} className="green-btn w-48">
                        Previous
                    </button>
                    <button onClick={submit} className="green-btn w-48">
                        Create Profile
                    </button>
                </div>
            </div>
            <p className="mt-8 bottom-8">{copyright}</p>
        </div>
    );
};

export default UploadNfts;
