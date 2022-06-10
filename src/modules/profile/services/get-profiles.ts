import { gql } from '@apollo/client/core';
import { useQuery } from 'react-query';
import { apolloClient } from '../../../services/apollo-client';
import { GET_PROFILES } from '../../../shared/constants';
import { useSelector } from 'react-redux';
import { getUserHandle } from '../../auth/state/auth.reducer';

export const getProfileByAddressRequest = (address: string) => {
    return getProfiles({ ownedBy: [address], limit: 10 });
    // return { ownedBy: [address], limit: 10 };
};

export const getProfileKey = (profileHandle?: string) => ['LENS', 'PROFILE', 'GET', profileHandle];

export const useGetProfile = () => {
    const profileHandle = useSelector(getUserHandle);
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
