import { useQuery } from 'react-query';
import { gql } from '@apollo/client/core';
import { EXPLORE_PUBLICATIONS } from '../../../shared/constants';
import { apolloClient } from '../../../services/apollo-client';
import { appId } from '../../../app/constants';

export type SortCriteria = 'TOP_COLLECTED' | 'LATEST';

const explorePublicationsKey = (sortCriteria: SortCriteria) => `LENS_PUBLICATION_EXPLORE_GET_${sortCriteria}`;

export const useGetExplorePublications = (sortCriteria: SortCriteria, config: any = {}) => {
    const query = {
        sortCriteria: sortCriteria,
        publicationTypes: ['POST'],
        sources: [appId],
        noRandomize: true,
    };
    return useQuery(explorePublicationsKey(sortCriteria), async () => explorePublications(query), config);
};

export const explorePublications = (explorePublicationQueryRequest: object) => {
    return apolloClient.query({
        query: gql(EXPLORE_PUBLICATIONS),
        variables: {
            request: explorePublicationQueryRequest,
        },
    });
};
