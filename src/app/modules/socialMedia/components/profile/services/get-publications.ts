import { gql } from '@apollo/client';
import { apolloClient } from '../../../../../services/apollo-client';
import { GET_PUBLICATIONS } from '../../../../../shared/constants';

export const getPublications = (getPublicationQuery: object) => {
    return apolloClient.query({
        query: gql(GET_PUBLICATIONS),
        variables: {
            request: getPublicationQuery,
        },
    });
};
