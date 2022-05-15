import { gql } from '@apollo/client/core';
import { apolloClient } from '../../../services/apollo-client';
import { splitSignature } from '../../../services/ethers-service';
import { lensHub, lensPeriphery } from '../../../services/lens-hub';
import { signedTypeData } from '../../../services/signed-typed-data';
import { CREATE_SET_PROFILE_METADATA_TYPED_DATA } from '../../../shared/constants';

const updateProfielMetaData = async (createProfileMetadataRequest: any) => {
    const result = await createSetProfileMetadataTypedData(
        createProfileMetadataRequest.profileId,
        createProfileMetadataRequest.metadata
    );
    const typedData = result.data.createPostTypedData.typedData;

    const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
    const { v, r, s } = splitSignature(signature);

    const tx = await lensPeriphery.setProfileMetadataURIWithSig({
        profileId: createProfileMetadataRequest.profileId,
        metadata: createProfileMetadataRequest.metadata,
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

export default updateProfielMetaData;

export const createSetProfileMetadataTypedData = (profileId: string, metadata: string) => {
    return apolloClient.mutate({
        mutation: gql(CREATE_SET_PROFILE_METADATA_TYPED_DATA),
        variables: {
            request: {
                profileId,
                metadata,
            },
        },
    });
};
