import SharedItem from './SharedItem';
import { appId } from '../../../app/constants';
import NewBudItem from './NewBudItem';

interface Props {
    newsItem: {
        __typename: 'Post' | 'Comment' | 'Mirror';
        appId?: string;
        id: string;
        mirrorOf?: {
            profile?: {
                name?: string;
            };
        };
        profile?: {
            name?: string;
            picture?: {
                original: {
                    url: string;
                };
            };
        };
        metadata?: {
            attributes?: any[];
            description: string;
            name: string;
            stats: {
                totalAmountOfCollects: number;
                totalAmountOfComments: number;
            };
        };
    };
}

const FeedItem: React.FC<Props> = ({ newsItem }) => {
    const { __typename } = newsItem;
    switch (__typename) {
        case 'Post': {
            const { appId: sourceId = appId } = newsItem;
            if (sourceId === appId) {
                const creatorName = newsItem.profile?.name || '';
                const postID = newsItem.id;
                const budCover = newsItem?.metadata?.attributes![6]?.value || '';
                const description = newsItem?.metadata?.description || '';
                const name = newsItem?.metadata?.name || '';
                const totalAmountOfCollects = newsItem?.metadata?.stats?.totalAmountOfCollects || 0;
                const totalAmountOfComments = newsItem?.metadata?.stats?.totalAmountOfComments || 0;
                const pfpSource = newsItem?.profile?.picture?.original?.url || '';

                return (
                    <NewBudItem
                        newsItem={{
                            creator: creatorName,
                            id: postID,
                            previewImgSrc: budCover,
                            projectDescription: description,
                            projectTitle: name,
                            joinedCount: totalAmountOfCollects,
                            commentsCount: totalAmountOfComments,
                            pfpSrc: pfpSource,
                        }}
                    />
                );
            }
            return <></>;
        }
        case 'Comment': {
            return <></>;
        }
        case 'Mirror': {
            const {
                id: postID,
                mirrorOf: { profile: { name: creatorName = '' } = {} } = {},
                profile: {
                    name: sharerName = '',
                    picture: { original: { url: pfpSrc = '' } = {} } = {},
                } = {},
                metadata: {
                    attributes = [],
                    description = '',
                    name = '',
                    stats: { totalAmountOfCollects = 0, totalAmountOfComments = 0 } = {},
                } = {},
            } = newsItem;

            const budCover = attributes[6]?.value;
            return (
                <SharedItem
                    newsItem={{
                        creator: creatorName,
                        sharer: sharerName,
                        id: postID,
                        previewImgSrc: budCover,
                        projectDescription: description,
                        projectTitle: name,
                        joinedCount: totalAmountOfCollects,
                        commentsCount: totalAmountOfComments,
                        pfpSrc: pfpSrc,
                    }}
                />
            );
        }
        default: {
            return null;
        }
    }
};

export default FeedItem;
