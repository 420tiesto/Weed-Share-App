import React from 'react';
import Stack from '../../../app/components/common-ui/atoms/Stack';
import NewsFeedItem from './NewsFeedItem';

type Props = {};

const AllDiscussions = (props: Props) => {
    return (
        <Stack>
            <NewsFeedItem/>
        </Stack>
    );
};

export default AllDiscussions;
