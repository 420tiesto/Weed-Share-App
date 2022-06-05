import { useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReactList from 'react-list';
import { useSelector } from 'react-redux';
import { useGetTimeline } from '../services/get-timeline';
import { appIds } from '../../../app/constants';
import Loader from '../../../app/components/common-ui/loader/Loader';
import FeedItem from './FeedItem';
import { getUserAuthenticated } from '../../auth/state/auth.reducer';

type Props = {};

const FollowingNews: React.FC<Props> = (props) => {
    const authenticatedState = useSelector(getUserAuthenticated);
    const {
        data: items = [],
        isLoading,
        hasNextPage = true,
        fetchNextPage,
    } = useGetTimeline(appIds, {
        enabled: !!authenticatedState,
    });

    const feedItemRenderer = useCallback(
        (index: number) => {
            return <FeedItem key={items[index].id} newsItem={items[index]} />;
        },
        [items]
    );

    if (isLoading) {
        return (
            <div className="space-y-12 px-8">
                <Loader />
            </div>
        );
    }

    return (
        <InfiniteScroll
            dataLength={items.length}
            next={fetchNextPage}
            hasMore={hasNextPage}
            endMessage={
                <p>
                    <b>Yay! You have seen it all</b>
                </p>
            }
            refreshFunction={() => {}}
            loader={<Loader />}>
            <ReactList length={items.length} itemRenderer={feedItemRenderer} type="variable" />
        </InfiniteScroll>
    );
};

export default FollowingNews;
