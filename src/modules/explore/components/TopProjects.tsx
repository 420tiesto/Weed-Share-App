import { useCallback } from 'react';
import ReactList from 'react-list';
import InfiniteScroll from 'react-infinite-scroll-component';
import ProjectCard from './ProjectCard';
import { type SortCriteria, useGetExplorePublications } from '../services/explore-publication';
import Loader from '../../../app/components/common-ui/loader';

type Props = {
    sortCriteria: SortCriteria;
};

const TopProjects = ({ sortCriteria }: Props) => {
    const { data: items, isLoading, fetchNextPage, hasNextPage = true } = useGetExplorePublications({ sortCriteria });

    const itemRenderer = useCallback(
        (index) => {
            return <ProjectCard key={items[index].id} projectData={items[index]} />;
        },
        [items]
    );

    if (isLoading) {
        return (
            <div className="items-center justify-center  w-full">
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
            <ReactList length={items.length} itemRenderer={itemRenderer} type="simple" />
        </InfiniteScroll>
    );
};

export default TopProjects;
