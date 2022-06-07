import { gql } from '@apollo/client';

import { CREATE_POST_TYPED_DATA } from '../../../shared/constants';
import { apolloClient } from '../../../services/apollo-client';

export const createPostTypedData = (createPostTypedDataRequest: any) => {
    return apolloClient.mutate({
        mutation: gql(CREATE_POST_TYPED_DATA),
        variables: {
            request: createPostTypedDataRequest,
        },
    });
};
