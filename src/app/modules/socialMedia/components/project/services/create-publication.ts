// Original code provided from https://docs.lens.dev/docs/publication-1

// this is showing you how you use it with react for example
// if your using node or something else you can import using
// @apollo/client/core!
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
