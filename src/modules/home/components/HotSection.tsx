import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../../app/components/common-ui/loader';
import { EXPLORE } from '../../../app/routes/Routes';
import BudCard from '../../explore/components/BudCard';
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
            return <BudCard key={items[index].id} projectData={items[index]} />;
        },
        [items]
    );

    return (
        <>
            {isLoading === false ? (
                <div className="p-12 flex flex-col bg-dark-black">
                    <h2 className="text-2xl font-semibold mb-4">Trending Buds</h2>
                    <div className="flex justify-between">
                        {items.map((item: any, index: any) =>
                            index < 4 ? (
                                <BudCard key={items[index].id} projectData={items[index]} />
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
