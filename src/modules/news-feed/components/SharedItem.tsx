import { ChatIcon, UserGroupIcon } from '@heroicons/react/solid';
import { DotsVerticalIcon } from '@heroicons/react/solid';
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody } from '../../../app/components/common-ui/atoms/Card';
import PlayIcon from '../../../app/icons/PlayIcon';
import NewsFeedItem from './NewsFeedItem';

type Props = {
    newsItem: {
        id: string;
        sharer: string;
        previewImgSrc: string;
        creator: string;
        pfpSrc: string;
        projectTitle: string;
        projectDescription: string;
        joinedCount: number;
        commentsCount: number;
    };
};

const SharedItem: React.FC<Props> = ({ newsItem }) => {
    const {
        id,
        previewImgSrc,
        creator = '',
        sharer = '',
        pfpSrc,
        projectTitle = 'Loading...',
        projectDescription = '...',
        joinedCount = 0,
        commentsCount = 0,
    } = newsItem;
    return (
        <NewsFeedItem type="Share" pfpSrc={pfpSrc} title={`${sharer} shared ${creator} project`}>
            <Link to={`/project/${id}`}>
                <Card variant="elevated" rounded="2xl">
                    <CardBody padding={6} className="flex items-center gap-8">
                        <div className="h-[200px] w-[240px] elevated-element rounded-[30px] bg-gray overflow-hidden border-2 ">
                            <img
                                src={previewImgSrc}
                                alt=""
                                className="h-full w-full object-center object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <p className="text-white/30 mb-1">{creator}</p>
                            <p className="text-3xl font-bold mb-1">{projectTitle}</p>
                            <p className="text-white/50 mb-4">{projectDescription}</p>
                            <div className="flex items-center text-white/30 gap-6">
                                <button className="flex items-center gap-2">
                                    <UserGroupIcon className="h-5 w-5" /> {joinedCount}
                                </button>
                                <button className="flex items-center gap-2">
                                    <ChatIcon className="h-5 w-5" /> {commentsCount}
                                </button>
                                <button>
                                    <DotsVerticalIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                        <button className="flex mr-4 hover:scale-105 duration-200 ease-out items-center justify-center h-14 w-14 rounded-full elevated-element">
                            <PlayIcon className="relative left-1" />
                        </button>
                    </CardBody>
                </Card>
            </Link>
        </NewsFeedItem>
    );
};

export default SharedItem;
