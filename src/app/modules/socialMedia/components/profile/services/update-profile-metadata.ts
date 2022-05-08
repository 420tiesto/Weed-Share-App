import { gql } from '@apollo/client/core';
import { apolloClient } from '../../../../../services/apollo-client';
import { CREATE_SET_PROFILE_METADATA_TYPED_DATA } from '../../../../../shared/constants';

export const createSetProfileMetadataTypedData = (profileId: string, metadata: string) => {
    return apolloClient.mutate({
        mutation: gql(CREATE_SET_PROFILE_METADATA_TYPED_DATA),
        variables: {
            request: {
                profileId,
                metadata,
            },
        },
    });
};
