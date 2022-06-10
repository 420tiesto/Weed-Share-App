import { useState, useCallback } from 'react';
import ReactList from 'react-list';
import InfiniteScroll from 'react-infinite-scroll-component';

import SelectInput, { SelectOption } from '../../../app/components/common-ui/atoms/SelectInput';
import Loader from '../../../app/components/common-ui/loader';
import { useGetExplorePublications } from '../../explore/services/explore-publication';
import FeedItem from './FeedItem';

type Props = {};

const filterOptions: SelectOption[] = [
    { id: 1, name: 'Latest', value: 'latest' },
    { id: 2, name: 'Most Liked', value: 'mostLiked' },
    { id: 3, name: 'Most Viewed', value: 'mostViewed' },
];

const AllDiscussions: React.FC<Props> = (props) => {
    const [filter, setFilter] = useState<SelectOption>(filterOptions[0]);

    const {
        data: items = [],
        isLoading,
        hasNextPage = true,
        fetchNextPage,
    } = useGetExplorePublications({
        sortCriteria: 'LATEST',
        publicationTypes: ['COMMENT', 'MIRROR', 'POST'],
    });

    const feedItemRenderer = useCallback(
        (index: number) => {
            return <FeedItem key={items[index].id} newsItem={items[index]} />;
        },
        [items]
    );

    if (isLoading) {
        return (
            <div className=" px-8">
                <Loader />
            </div>
        );
    }

    return (
        <>
            <div className="space-y-12 px-8">
                <div className="max-w-[200px] "> 
                    <SelectInput value={filter} setValue={setFilter} options={filterOptions} />
                </div>
            </div>
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
                    {/* {items?.map((item:any,index:number)=>(
                        <FeedItem key={items[index].id} newsItem={items[index]} />
                    ))} */}
                <ReactList length={items.length} itemRenderer={feedItemRenderer} type='simple' />
            </InfiniteScroll>
            {/* <FollowItem
                newsItem={{
                    from: 'Harrish',
                    to: 'Adarsh',
                    pfpSrc: 'https://pbs.twimg.com/profile_images/1491044018926796805/uBM0c32A_400x400.jpg',
                }}
            />
            <BoughtItem
                newsItem={{
                    from: 'Harrish',
                    to: 'Adarsh',
                    pfpSrc: 'https://pbs.twimg.com/profile_images/1491044018926796805/uBM0c32A_400x400.jpg',
                }}
            />
            <NewBudItem
                newsItem={{
                    creator: 'Harrish',
                    id: '0xyz',
                    previewImgSrc:
                        'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                    projectDescription: 'Bud Desciption Here',
                    projectTitle: 'Cold inner Fire',
                    joinedCount: 5,
                    commentsCount: 4,
                    pfpSrc: 'https://pbs.twimg.com/profile_images/1491044018926796805/uBM0c32A_400x400.jpg',
                }}
            />
            <SharedItem
                newsItem={{
                    creator: 'Harrish',
                    sharer: 'Adarsh',
                    id: '0xyz',
                    previewImgSrc:
                        'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                    projectDescription: 'Bud Desciption Here',
                    projectTitle: 'Cold inner Fire',
                    joinedCount: 5,
                    commentsCount: 4,
                    pfpSrc: 'https://pbs.twimg.com/profile_images/1491044018926796805/uBM0c32A_400x400.jpg',
                }}
            />
            <PostItem
                newsItem={{
                    creator: 'Harrish',
                    pfpSrc: 'https://pbs.twimg.com/profile_images/1491044018926796805/uBM0c32A_400x400.jpg',
                    previewImgSrc:
                        'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                    previewDescription: 'Bud Desciption Here',
                    previewTitle: 'Cold inner Fire',
                    createdAt: '11:37 AM Jun 4, 2022',
                    previewDomain: 'soundcloud.com',
                    previewLink: 'https://soundcloud.com//',
                }}
            /> */}
        </>
    );
};

export default AllDiscussions;
