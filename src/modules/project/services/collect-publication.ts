import { gql } from '@apollo/client/core';
import { useQuery } from 'react-query';

import {
    CREATE_COLLECT_TYPED_DATA,
    HAS_COLLECTED,
    MODULE_APPROVAL_DATA,
} from '../../../shared/constants';
import { apolloClient } from '../../../services/apollo-client';
import { splitSignature, getAddressFromSigner, sendTx } from '../../../services/ethers-service';
import { lensHub } from '../../../services/lens-hub';
import { signedTypeData } from '../../../services/signed-typed-data';
import { PRNTS_PUBLIC_KEY } from '../../../utils/local-storage/keys';
import { getStorageValue } from '../../../utils/local-storage/local-storage';

// TODO: [PMA-39] Add proper type for collectTypedData
export const createCollectTypedData = (createCollectTypedDataRequest: object) => {
    return apolloClient.mutate({
        mutation: gql(CREATE_COLLECT_TYPED_DATA),
        variables: {
            request: createCollectTypedDataRequest,
        },
    });
};

// TODO: [PMA-57] Move mutation functions to useMutation hook from React Query
export const collect = async (publicationId: string) => {
    const collectRequest = {
        publicationId,
    };

    const result = await createCollectTypedData(collectRequest);
    const typedData = result.data.createCollectTypedData.typedData;
    console.log(typedData, '******** check the typed data here');

    const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
    const { v, r, s } = splitSignature(signature);

    const addressFromSigner = await getAddressFromSigner();
    console.log(addressFromSigner, '*************** addressFromSigner');
    const tx = await lensHub.collectWithSig({
        collector: addressFromSigner,
        profileId: typedData.value.profileId,
        pubId: typedData.value.pubId,
        data: typedData.value.data,
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

export const hasCollectedKey = (publicationId?: string, address?: string) =>
    `LENS_PUBLICATION_GET_HAS_COLLECTED_${publicationId}_${address}`;

export const useHasCollected = (publicationId?: string) => {
    const address = getStorageValue(PRNTS_PUBLIC_KEY) || '';
    const key = hasCollectedKey(publicationId, address);
    return useQuery(
        key,
        async () =>
            hasCollected({
                collectRequests: [{ publicationIds: publicationId, walletAddress: address }],
            }),
        {
            enabled: !!address && !!publicationId,
        }
    );
};

// TODO: [PMA-39] Add proper type for collectTypedData
export const hasCollected = (request: object) => {
    return apolloClient.query({
        query: gql(HAS_COLLECTED),
        variables: {
            request,
        },
    });
};

// TODO: [PMA-58] Add proper type for moduleApprovalRequest
export const getModuleApprovalData = (moduleApprovalRequest: object) => {
    return apolloClient.query({
        query: gql(MODULE_APPROVAL_DATA),
        variables: {
            request: moduleApprovalRequest,
        },
    });
};

export const approveModule = async ({
    currency,
    value,
    collectModule,
}: {
    currency: string;
    value: string;
    collectModule: string;
}) => {
    // hard coded to make the code example clear
    const generateApprovalModuleData = {
        currency,
        value,
        collectModule,
    };

    const result = await getModuleApprovalData(generateApprovalModuleData);
    console.log(result);

    const generateModuleCurrencyApprovalData = result.data.generateModuleCurrencyApprovalData;

    const tx = {
        to: generateModuleCurrencyApprovalData.to,
        from: generateModuleCurrencyApprovalData.from,
        data: generateModuleCurrencyApprovalData.data,
    };

    const signedTx = await sendTx(tx);
    console.log(signedTx.hash);

    await signedTx.wait();
};
