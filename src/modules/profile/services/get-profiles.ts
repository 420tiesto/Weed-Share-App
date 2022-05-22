import { gql } from '@apollo/client/core';
import { useQuery } from 'react-query';
import { apolloClient } from '../../../services/apollo-client';
import { GET_PROFILES } from '../../../shared/constants';

export const getProfileByAddressRequest = (address: string) => {
    getProfiles({ ownedBy: [address], limit: 10 });
    // return { ownedBy: [address], limit: 10 };
};

export const getProfileKey = (profileHandle?: string) => `LENS_PROFILE_GET_${profileHandle}`;

export const useGetProfile = (profileHandle?: string) => {
    return useQuery<any>(
        getProfileKey(profileHandle),
        () => getProfiles({ handles: [profileHandle], limit: 1 }),
        {
            enabled: !!profileHandle,
            select: (data) => {
                if (!data) {
                    return {};
                }
                const { data: { profiles: { items: [profileData = {}] = [] } = {} } = {} } = data;
                return profileData;
            },
        }
    );
};

export const getProfiles = (request: object) => {
    return apolloClient.query({
        query: gql(GET_PROFILES),
        variables: {
            request,
        },
    });
};
