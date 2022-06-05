import NewsFeedItem from './NewsFeedItem';

type Props = {
    newsItem: {
        pfpSrc: string;
        from: string;
        to: string;
    };
};

const JoinedItem: React.FC<Props> = ({ newsItem }) => {
    const { pfpSrc, from, to } = newsItem;
    return (
        <NewsFeedItem type="Joined" title={`${from} has joined ${to}'s Project`} pfpSrc={pfpSrc} />
    );
};

export default JoinedItem;
