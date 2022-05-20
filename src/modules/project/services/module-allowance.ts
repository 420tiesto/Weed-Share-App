import { gql } from '@apollo/client/core';
import { useQuery } from 'react-query';
import { ALLOWANCE } from '../../../shared/constants';
import { apolloClient } from '../../../services/apollo-client';

export const hasAllowanceKey = (currency: string) => `LENS_MODULE_HAS_ALLOWANCE_${currency}`;

export const useHasAllowance = (currency: string) => {
    return useQuery(
        hasAllowanceKey(currency),
        async () => {
            return allowance({
                currencies: [currency],
                collectModules: ['FeeCollectModule', 'FreeCollectModule'],
                followModules: [],
                referenceModules: [],
            });
        },
        {
            enabled: !!currency,
        }
    );
};

export const allowance = (allowanceRequest: object) => {
    return apolloClient.query({
        query: gql(ALLOWANCE),
        variables: {
            request: allowanceRequest,
        },
    });
};
