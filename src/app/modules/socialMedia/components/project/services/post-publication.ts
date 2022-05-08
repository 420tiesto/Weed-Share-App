import { createPostTypedData } from './create-publication';
import { lensHub } from '../../../../../services/lens-hub';
import { signedTypeData } from '../../../../../services/signed-typed-data';
import { splitSignature } from '../../../../../services/ethers-service';

const postPublication = async ({
    postMetadata,
    profileId = '0x01f3',
}: {
    profileId?: string;
    postMetadata: string;
}) => {
    // TODO: Add profile flow here
    if (!profileId) {
        alert('Please select a profile');
    }

    const createPostRequest = {
        profileId,
        contentURI: 'ipfs://' + postMetadata,
        collectModule: {
            freeCollectModule: { followerOnly: false },
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
        collectModuleData: typedData.value.collectModuleData,
        referenceModule: typedData.value.referenceModule,
        referenceModuleData: typedData.value.referenceModuleData,
        sig: {
            v,
            r,
            s,
            deadline: typedData.value.deadline,
        },
    });
    console.log(tx.hash);
    // 0x64464dc0de5aac614a82dfd946fc0e17105ff6ed177b7d677ddb88ec772c52d3
    // you can look at how to know when its been indexed here:
    //   - https://docs.lens.dev/docs/has-transaction-been-indexed
};

export default postPublication;
