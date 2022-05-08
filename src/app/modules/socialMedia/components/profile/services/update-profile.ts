import { gql } from '@apollo/client/core';
import { apolloClient } from '../../../../../services/apollo-client';

const UPDATE_PROFILE = `
  mutation($request: UpdateProfileRequest!) { 
    updateProfile(request: $request) {
     id
    }
 }
`;

export const createProfileInfo = (
    id: string,
    name: string,
    bio: string,
    location: string,
    website: string,
    twitterUrl: string,
    coverPicture: string
) => {
    return {
        profileId: id,
        name: name,
        bio: bio,
        location: location,
        website: website,
        twitterUrl: twitterUrl,
        coverPicture: coverPicture,
    };
};

export const updateProfile = (profileInfo: object) => {
    return apolloClient.mutate({
        mutation: gql(UPDATE_PROFILE),
        variables: {
            request: profileInfo,
        },
    });
};
