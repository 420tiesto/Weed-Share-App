import { gql } from '@apollo/client/core';
import { useSelector } from 'react-redux';

import { apolloClient } from '../../../services/apollo-client';
import { GET_TIMELINE } from '../../../shared/constants';
import { getUserProfile, getUserAuthenticated } from '../../auth/state/auth.reducer';
import { appId } from '../../../app/constants';
import { useInfiniteQuery } from 'react-query';

export const getTimelineKey = ({
    appIds = [],
    profileId,
}: {
    appIds: string[] | undefined;
    profileId: string;
}) => ['LENS', 'TIMELINE', 'GET', profileId, ...appIds];

export const useGetTimeline = (sources: string[] = [appId], config: any = {}) => {
    const { id } = useSelector(getUserProfile);
    const request = {
        profileId: id,
        sources,
        limit: 10,
    };

    const info = useInfiniteQuery<any>(
        getTimelineKey({ appIds: !!sources.length ? sources : undefined, profileId: id }),
        ({ pageParam }) => {
            return getTimeline({ ...request, cursor: pageParam });
        },
        {
            getNextPageParam: (lastPage) => {
                const pageInfo = lastPage?.data?.timeline?.pageInfo;
                if (!pageInfo) {
                    return undefined;
                }
                const items = lastPage?.data?.timeline?.items;
                if (items.length === 0) {
                    return undefined;
                }
                return pageInfo.next;
            },
            enabled: !!id,
            ...config,
        }
    );

    const items = info?.data?.pages?.reduce((acc, page = {}) => {
        console.log(page?.data?.timeline?.items, '******* timeline data');
        return [...acc, ...(page?.data?.timeline?.items || [])];
    }, []);

    return { ...info, data: items, pageParams: info?.data?.pageParams || [] };
};

export const getTimeline = (request: { profileId: string; sources: string[]; cursor?: string }) => {
    return apolloClient.query({
        query: gql(GET_TIMELINE),
        variables: {
            request,
        },
    });
};
