import { useInfiniteQuery } from 'react-query';
import { gql } from '@apollo/client/core';
import { EXPLORE_PUBLICATIONS } from '../../../shared/constants';
import { apolloClient } from '../../../services/apollo-client';
import { appId, applicationStartDate } from '../../../app/constants';

export type SortCriteria = 'TOP_COLLECTED' | 'LATEST' | 'TOP_COMMENTED';
const pageSize = 10;

const explorePublicationsKey = (sortCriteria: SortCriteria) => [
    'LENS',
    'PUBLICATION',
    'GET',
    'EXPLORE',
    sortCriteria,
];

// TODO: [PMA-126] Use graphql codegen for all react query calls
export const useGetExplorePublications = (sortCriteria: SortCriteria, config: any = {}) => {
    const query = {
        sortCriteria: sortCriteria,
        publicationTypes: ['POST'],
        sources: [appId],
        limit: pageSize,
        noRandomize: sortCriteria !== 'TOP_COLLECTED' ? true : undefined,
        timestamp: applicationStartDate.unix(),
    };

    const info = useInfiniteQuery<any>(
        explorePublicationsKey(sortCriteria),
        ({ pageParam }) => {
            return explorePublications({ ...query, cursor: pageParam });
        },
        {
            getNextPageParam: (lastPage) => {
                const pageInfo = lastPage?.data?.explorePublications?.pageInfo;
                if (!pageInfo) {
                    return undefined;
                }
                const { next, totalCount } = pageInfo;
                const nextData = JSON.parse(next) || {};
                const { offset = 0 } = nextData;
                if (totalCount >= offset) {
                    return next;
                }
                return undefined;
            },
            ...config,
        }
    );
    const items = info?.data?.pages?.reduce(
        (acc, page = {}) => [...acc, ...(page?.data.explorePublications?.items || [])],
        []
    );
    return { ...info, data: items, pageParams: info?.data?.pageParams || [] };
};

export const explorePublications = (explorePublicationQueryRequest: object) => {
    return apolloClient.query({
        query: gql(EXPLORE_PUBLICATIONS),
        variables: {
            request: explorePublicationQueryRequest,
        },
    });
};
