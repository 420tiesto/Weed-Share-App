import { useQuery } from 'react-query';
import { gql } from '@apollo/client/core';
import { apolloClient } from '../../../../../services/apollo-client';
import { GET_PUBLICATION } from '../../../../../shared/constants';

export const getPublicationKey = (publicationId?: string) => `LENS_PUBLICATION_GET_${publicationId}`;

export const useGetPublication = (publicationId?: string, config: any = {}) => {
    return useQuery(getPublicationKey(publicationId), async () => getPublication(publicationId), config);
};

export const getPublication = (publicationId?: string) => {
    return apolloClient.query({
        query: gql(GET_PUBLICATION),
        variables: {
            request: {
                publicationId,
            },
        },
    });
};
