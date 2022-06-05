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
            <Link to={previewLink}>
                <Card variant="elevated" rounded="2xl" className="overflow-hidden">
                    <div className="flex gap-4 items-center">
                        <div className="max-w-[140px] h-[140px] flex-1 bg-gray overflow-hidden">
                            <img
                                src={previewImgSrc}
                                className="object-center object-cover h-full w-full"
                            />
                        </div>
                        <div className="flex-1">
                            <p className="text-white/30 ">{previewDomain}</p>
                            <p className="font-bold mb-1">{previewTitle}</p>
                            <p className="text-white/30 mb-4 max-w">{previewDescription}</p>
                        </div>
                    </div>
                </Card>
            </Link>
            <p className="text-white/30 mt">{createdAt} </p>
        </NewsFeedItem>
    );
};

export default PostItem;
