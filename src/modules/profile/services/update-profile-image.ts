import { gql } from '@apollo/client';
import { apolloClient } from '../../../services/apollo-client';
import { CREATE_SET_PROFILE_IMAGE_URI_TYPED_DATA } from '../../../shared/constants';

export const createSetProfileImageUriTypedData = (request: any) => {
    return apolloClient.mutate({
        mutation: gql(CREATE_SET_PROFILE_IMAGE_URI_TYPED_DATA),
        variables: {
            request,
        },
    });
};
