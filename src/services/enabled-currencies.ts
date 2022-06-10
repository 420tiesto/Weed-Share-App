import { gql } from '@apollo/client/core';
import { useQuery } from 'react-query';
import { apolloClient } from './apollo-client';
import { ENABLED_CURRENCIES } from '../shared/constants';

export const enabledCurrenciesKey = 'LENS_ENABLED_CURRENCIES';

export const useEnabledCurrencies = () => {
    return useQuery(enabledCurrenciesKey, enabledCurrencies);
};

export const enabledCurrencies = () => {
    return apolloClient.query({
        query: gql(ENABLED_CURRENCIES),
    });
};
