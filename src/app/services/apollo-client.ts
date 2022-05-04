import { ApolloClient } from '@apollo/client/core';
import { InMemoryCache } from '@apollo/client/cache';
import { ApolloLink } from '@apollo/client/link/core';
import { network } from '../constants';
import { LENS_TOKENS } from '../utils/local-storage/keys';

// example how you can pass in the x-access-token into requests using `ApolloLink`
const authLink = new ApolloLink((operation, forward) => {
	// Retrieve the authorization token from local storage.
	const token = localStorage.getItem(LENS_TOKENS);
	let accessToken = '';
	if (!!token) {
		({accessToken} = JSON.parse(token))
	}

	// Use the setContext method to set the HTTP headers.
	if (token) {
		operation.setContext({
			headers: {
				'x-access-token': `Bearer ${accessToken}`,
			}
		});
	}

	// Call the next link in the middleware chain.
	return forward(operation);
});

export const apolloClient = new ApolloClient({
	link: authLink.concat(network.mumbaiTestnet),
	cache: new InMemoryCache()
});
