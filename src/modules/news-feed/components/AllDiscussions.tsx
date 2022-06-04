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
            <div className="max-w-[200px]">
                <SelectInput value={filter} setValue={setFilter} options={filterOptions} />
            </div>
            <FollowItem
                from="Harrish"
                to="Adarsh"
                pfpSrc="https://pbs.twimg.com/profile_images/1491044018926796805/uBM0c32A_400x400.jpg"
            />
            <JoinedItem
                from="Harrish"
                to="Adarsh"
                pfpSrc="https://pbs.twimg.com/profile_images/1491044018926796805/uBM0c32A_400x400.jpg"
            />
            <NewProjectItem
                creator="Harrish"
                id="0xyz"
                previewImgSrc="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                projectDescription="Project Desciption Here"
                projectTitle="Cold inner Fire"
                joinedCount={5}
                commentsCount={4}
                pfpSrc="https://pbs.twimg.com/profile_images/1491044018926796805/uBM0c32A_400x400.jpg"
            />
            <SharedItem
                sharer="Adarsh"
                creator="Harrish"
                id="0xyz"
                previewImgSrc="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                projectDescription="Project Desciption Here"
                projectTitle="Cold inner Fire"
                joinedCount={5}
                commentsCount={4}
                pfpSrc="https://pbs.twimg.com/profile_images/1491044018926796805/uBM0c32A_400x400.jpg"
            />
            <PostItem
                creator="Harrish"
                pfpSrc="https://pbs.twimg.com/profile_images/1491044018926796805/uBM0c32A_400x400.jpg"
                previewImgSrc="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                previewDescription="Project Desciption Here"
                previewTitle="Cold inner Fire"
                createdAt="11:37 AM Jun 4, 2022"
                previewDomain='soundcloud.com'
                previewLink='https://soundcloud.com//'
            />
        </div>
    );
};

export default AllDiscussions;
