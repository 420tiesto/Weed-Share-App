import { gql } from '@apollo/client/core';
import { useMutation } from 'react-query';
import { splitSignature } from '../../../services/ethers-service';
import { lensHub } from '../../../services/lens-hub';
import { signedTypeData } from '../../../services/signed-typed-data';
import { apolloClient } from '../../../services/apollo-client';
import { CREATE_MIRROR_TYPED_DATA } from '../../../shared/constants';
import { type keyType } from '../../../types';

export const createMirrorTypedData = (createMirrorTypedDataRequest: any) => {
    return apolloClient.mutate({
        mutation: gql(CREATE_MIRROR_TYPED_DATA),
        variables: {
            request: createMirrorTypedDataRequest,
        },
    });
};

export const shareKey = ({
    publicationId,
    profileId,
}: {
    publicationId?: string;
    profileId?: string;
}): keyType => ['LENS', 'PUBLICATION', 'SHARE', 'POST', ...[publicationId, profileId]];

export const share = async ({
    profileId,
    publicationId,
    // More modules will be added later according to lens team
    // https://docs.lens.xyz/docs/create-mirror-typed-data#followeronlyreferencemodule
    referenceModule: { followerOnlyReferenceModule = true },
}: {
    profileId: string;
    publicationId?: string;
    referenceModule: {
        followerOnlyReferenceModule: boolean;
    };
}) => {
    // hard coded to make the code example clear
    const createMirrorRequest = {
        profileId: profileId,
        publicationId: publicationId,
        referenceModule: {
            followerOnlyReferenceModule,
        },
    };

    const result = await createMirrorTypedData(createMirrorRequest);
    const typedData = result.data.createMirrorTypedData.typedData;

    const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
    const { v, r, s } = splitSignature(signature);

    const tx = await lensHub.mirrorWithSig({
        profileId: typedData.value.profileId,
        profileIdPointed: typedData.value.profileIdPointed,
        pubIdPointed: typedData.value.pubIdPointed,
        referenceModuleData: typedData.value.referenceModuleData,
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
    return tx.hash;
    // 0x64464dc0de5aac614a82dfd946fc0e17105ff6ed177b7d677ddb88ec772c52d3
    // you can look at how to know when its been indexed here:
    //   - https://docs.lens.dev/docs/has-transaction-been-indexed
};

export default share;
