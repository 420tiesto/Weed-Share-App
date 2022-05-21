// this is showing you how you use it with react for example
// if your using node or something else you can import using
// @apollo/client/core!
import { gql } from '@apollo/client';
import { useQuery } from 'react-query';

import { apolloClient } from '../../../services/apollo-client';
import { signedTypeData } from '../../../services/signed-typed-data';
import { CREATE_FOLLOW_TYPED_DATA, DOES_FOLLOW } from '../../../shared/constants';
import { splitSignature, getAddressFromSigner } from '../../../services/ethers-service';
import { lensHub } from '../../../services/lens-hub';
import { type doesFollowRequest } from '../types';
import { getStorageValue } from '../../../utils/local-storage/local-storage';
import { PRNTS_PUBLIC_KEY } from '../../../utils/local-storage/keys';

export const createFollowTypedData = (followRequestInfo: object) => {
    return apolloClient.mutate({
        mutation: gql(CREATE_FOLLOW_TYPED_DATA),
        variables: {
            request: {
                follow: followRequestInfo,
            },
        },
    });
};

export const follow = async (profileId: string) => {
    // hard coded to make the code example clear
    const followRequest = [
        {
            profile: profileId,
        },
    ];

    const result = await createFollowTypedData(followRequest);
    const typedData = result.data.createFollowTypedData.typedData;

    const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
    const { v, r, s } = splitSignature(signature);

    const tx = await lensHub.followWithSig({
        follower: getAddressFromSigner(),
        profileIds: typedData.value.profileIds,
        datas: typedData.value.datas,
        sig: {
            v,
            r,
            s,
            deadline: typedData.value.deadline,
        },
    });
    console.log(tx.hash);
    return tx.hash;
};

export const doesFollowKey = (address?: string, profileId?: string) =>
    `LENS_PROFILE_FOLLOW_DOESFOLLOW_${address}_${profileId}`;

export const useDoesFollow = (profileId?: string) => {
    const address = getStorageValue(PRNTS_PUBLIC_KEY);
    return useQuery(
        doesFollowKey(address!, profileId),
        async () => doesFollow([{ followerAddress: address!, profileId: profileId! }]),
        {
            enabled: !!address && !!profileId,
        }
    );
};

export const doesFollow = (followInfos: doesFollowRequest[]) => {
    return apolloClient.query({
        query: gql(DOES_FOLLOW),
        variables: {
            request: {
                followInfos,
            },
        },
    });
};
