import { gql } from '@apollo/client/core';
import { apolloClient } from '../../../services/apollo-client';

const CREATE_PROFILE = `
  mutation($request: CreateProfileRequest!) { 
    createProfile(request: $request) {
      ... on RelayerResult {
        txHash
      }
      ... on RelayError {
        reason
      }
            __typename
    }
 }
`;

export const createProfileRequest = (handle: string, pictureUri: string, followNFTURI: string) => {
    return {
        handle: handle,
        profilePictureUri: pictureUri,
        followNFTURI,
        followModule: null,
    };
};

export const createProfile = (createProfileRequest: object) => {
    return apolloClient.mutate({
        mutation: gql(CREATE_PROFILE),
        variables: {
            request: createProfileRequest,
        },
    });
};
