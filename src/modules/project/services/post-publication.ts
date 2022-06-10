import { splitSignature } from '../../../services/ethers-service';
import { lensHub } from '../../../services/lens-hub';
import { signedTypeData } from '../../../services/signed-typed-data';
import { createPostTypedData } from './create-publication';
import { getStorageValue } from '../../../utils/local-storage/local-storage';
import { PRNTS_PUBLIC_KEY } from '../../../utils/local-storage/keys';
import { enabledCurrencies } from '../../../app/constants';

const getCollectModule = (price: number) => {
    if (price > 0) {
        return {
            feeCollectModule: {
                amount: {
                    currency: enabledCurrencies.wrappedMatic.address,
                    value: `${price}`,
                },
                // TODO: [PMA-49] Allow users to choose which address they want to collect from
                referralFee: 0,
                recipient: getStorageValue(PRNTS_PUBLIC_KEY),
                followerOnly: false,
            },
        };
    }
    return {
        freeCollectModule: { followerOnly: false },
    };
};

const postPublication = async ({
    profileId,
    postMetadata,
    totalPrice,
}: {
    profileId: string;
    postMetadata: string;
    totalPrice: number;
}) => {
    // TODO: Add profile flow here
    if (!profileId) {
        alert('Please select a profile');
    }

    const createPostRequest = {
        profileId,
        contentURI: 'ipfs://' + postMetadata,
        collectModule: {
            ...getCollectModule(totalPrice),
        },
        referenceModule: {
            followerOnlyReferenceModule: false,
        },
    };

    const result = await createPostTypedData(createPostRequest);
    const typedData = result.data.createPostTypedData.typedData;

    const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
    const { v, r, s } = splitSignature(signature);

    const tx = await lensHub.postWithSig({
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
    });
    console.log(tx.hash);
    return tx;
};

export default postPublication;
