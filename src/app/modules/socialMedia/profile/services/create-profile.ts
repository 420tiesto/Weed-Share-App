import { apolloClient } from "../../../../services/apollo-client";
import { gql } from "@apollo/client/core";

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

export const createProfileRequest = (handle: string) => {
	return {
		handle: handle,
		profilePictureUri: "pictureUri",
		followModule: {
			emptyFollowModule: true,
		},
	};
};

export const createProfile = (createProfileRequest: string) => {
	return apolloClient.mutate({
		mutation: gql(CREATE_PROFILE),
		variables: {
			request: createProfileRequest,
		},
	});
};
