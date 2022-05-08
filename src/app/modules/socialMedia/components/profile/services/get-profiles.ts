import { gql } from '@apollo/client/core';
import { apolloClient } from '../../../../../services/apollo-client';
import { GET_PROFILES } from '../../../../../shared/constants';

export const getProfileByAddressRequest = (address: string) => {
    getProfiles({ ownedBy: [address], limit: 10 });
    // return { ownedBy: [address], limit: 10 };
};

export const getProfiles = (request: object) => {
    return apolloClient.query({
        query: gql(GET_PROFILES),
        variables: {
            request,
        },
    });
};
