import { ApolloClient, DefaultOptions } from '@apollo/client/core';
import { InMemoryCache } from '@apollo/client/cache';
import { ApolloLink } from '@apollo/client/link/core';
import { LENS_TOKENS } from '../utils/local-storage/keys';
import { network } from '../app/constants';

// example how you can pass in the x-access-token into requests using `ApolloLink`
const authLink = new ApolloLink((operation, forward) => {
    // Retrieve the authorization token from local storage.
    const token = localStorage.getItem(LENS_TOKENS);
    let accessToken = '';
    if (!!token) {
        ({ accessToken } = JSON.parse(token));
    }

    // Use the setContext method to set the HTTP headers.
    if (token) {
        operation.setContext({
            headers: {
                'x-access-token': `Bearer ${accessToken}`,
            },
        });
    }

    // Call the next link in the middleware chain.
    return forward(operation);
});

const defaultOptions: DefaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
};

export const apolloClient = new ApolloClient({
    link: authLink.concat(network.mumbaiTestnet),
    cache: new InMemoryCache(),
    defaultOptions,
});
