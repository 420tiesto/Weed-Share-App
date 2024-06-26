import { gql } from '@apollo/client/core';
import { apolloClient } from '../../../services/apollo-client';

const AUTHENTICATION = `
  mutation($request: SignedAuthChallenge!) { 
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
 }
`;

export const authenticate = (address: string, signature: string) => {
    return apolloClient.mutate({
        mutation: gql(AUTHENTICATION),
        variables: {
            request: {
                address,
                signature,
            },
        },
    });
};
