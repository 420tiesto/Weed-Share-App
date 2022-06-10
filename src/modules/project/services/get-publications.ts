import { gql } from '@apollo/client';
import { apolloClient } from '../../../services/apollo-client';
import { GET_PUBLICATIONS } from '../../../shared/constants';
import { useQuery } from 'react-query';
import { appId } from '../../../app/constants';

export const getCollectedPublications = (ownedBy?: string) =>
    ['LENS', 'PUBLICATION', 'GET', 'COLLECTED', ownedBy];

export const getPublicationsPosted = (profileId?: string) =>
    ['LENS', 'PUBLICATION', 'GET', 'POSTED', profileId];

export const useGetPublicationsCollected = (ownedBy?: string) => {
    return useQuery(
        getCollectedPublications(ownedBy),
        async () =>
            getPublications({
                collectedBy: ownedBy,
                publicationTypes: ['POST'],
                sources: appId,
            }),
        {
            enabled: !!ownedBy,
            select: (data) => {
                const { data: { publications: { items = [] } = {} } = {} } = data;
                return items;
            },
        }
    );
};

export const useGetPublicationsPosted = (profileId?: string) => {
    return useQuery(
        getPublicationsPosted(profileId),
        async () =>
            getPublications({
                profileId,
                publicationTypes: ['POST'],
                sources: appId,
            }),
        {
            enabled: !!profileId,
            select: (data) => {
                const { data: { publications: { items = [] } = {} } = {} } = data;
                return items;
            },
        }
    );
};

export const getPublications = (getPublicationQuery: object) => {
    return apolloClient.query({
        query: gql(GET_PUBLICATIONS),
        variables: {
            request: getPublicationQuery,
        },
    });
};
