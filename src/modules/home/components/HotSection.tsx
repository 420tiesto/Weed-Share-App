import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../../app/components/common-ui/loader';
import { EXPLORE } from '../../../app/routes/Routes';
import ProjectCard from '../../explore/components/ProjectCard';
import {
    SortCriteria,
    useGetExplorePublications,
} from '../../explore/services/explore-publication';

type Props = {};

const HotSection = (props: Props) => {
    const sortCriteria: SortCriteria = 'TOP_COLLECTED';
    const {
        data: items,
        isLoading,
        fetchNextPage,
        hasNextPage = true,
    } = useGetExplorePublications({ sortCriteria });

    useEffect(() => {
        console.log(items, 'items');
    }, [isLoading, items]);

    const itemRenderer = useCallback(
        (index) => {
            return <ProjectCard key={items[index].id} projectData={items[index]} />;
        },
        [items]
    );

    return (
        <>
            {isLoading === false ? (
                <div className="p-12 flex flex-col bg-dark-gray">
                    <h2 className="text-2xl font-semibold mb-4">Hot in our collection</h2>
                    <div className="flex justify-between">
                        {items.map((item: any, index: any) =>
                            index < 4 ? (
                                <ProjectCard key={items[index].id} projectData={items[index]} />
                            ) : (
                                ''
                            )
                        )}
                    </div>
                    <div className="flex justify-end pr-8">
                        <Link to={EXPLORE}>
                            <a className="text-primary mt-2 text-right">View More</a>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="items-center justify-center  w-full">
                    <Loader />
                </div>
            )}
        </>
    );
};

export default HotSection;
