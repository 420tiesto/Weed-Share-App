import React, { useState } from 'react';
import SelectInput, { SelectOption } from '../../../app/components/common-ui/atoms/SelectInput';
import FollowItem from './FollowItem';
import JoinedItem from './JoinedItem';
import NewProjectItem from './NewProjectItem';
import NewsFeedItem from './NewsFeedItem';
import PostItem from './PostItem';
import SharedItem from './SharedItem';

type Props = {};

const filterOptions: SelectOption[] = [
    { id: 1, name: 'Latest', value: 'latest' },
    { id: 2, name: 'Most Liked', value: 'mostLiked' },
    { id: 3, name: 'Most Viewed', value: 'mostViewed' },
];

const AllDiscussions = (props: Props) => {
    const [filter, setFilter] = useState<SelectOption>(filterOptions[0]);
    return (
        <div className="space-y-12 px-8">
            <div className='max-w-[200px]'>
                <SelectInput value={filter} setValue={setFilter} options={filterOptions} />
            </div>
            <FollowItem />
            <JoinedItem />
            <NewProjectItem />
            <SharedItem />
            <PostItem />
        </div>
    );
};

export default AllDiscussions;
