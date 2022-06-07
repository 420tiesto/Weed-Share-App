import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody } from '../../../app/components/common-ui/atoms/Card';
import NewsFeedItem from './NewsFeedItem';

type Props = {
    newsItem: {
        pfpSrc: string;
        creator: string;
        previewImgSrc: string;
        previewDomain: string;
        previewTitle: string;
        previewDescription: string;
        previewLink: string;
        createdAt: string;
    };
};

const PostItem: React.FC<Props> = ({ newsItem }) => {
    const {
        pfpSrc,
        creator,
        previewImgSrc,
        previewDomain,
        previewDescription,
        previewLink,
        previewTitle,
        createdAt,
    } = newsItem;
    return (
        <NewsFeedItem type="Post" title={creator} pfpSrc={pfpSrc}>
           
            <p className="text-white/30 mt">{createdAt} </p>
        </NewsFeedItem>
    );
};

export default PostItem;
