import { gql } from '@apollo/client/core';
import { apolloClient } from '../../../../../services/apollo-client';
import { CREATE_POST_TYPED_DATA } from '../../../../../shared/constants';

export const createPostTypedData = (createPostTypedDataRequest: object) => {
    return apolloClient.mutate({
        mutation: gql(CREATE_POST_TYPED_DATA),
        variables: {
            request: createPostTypedDataRequest,
        },
    });
};
