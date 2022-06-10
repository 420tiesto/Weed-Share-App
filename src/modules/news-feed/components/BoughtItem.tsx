import NewsFeedItem from './NewsFeedItem';

type Props = {
    newsItem: {
        pfpSrc: string;
        from: string;
        to: string;
    };
};

const BoughtItem: React.FC<Props> = ({ newsItem }) => {
    const { pfpSrc, from, to } = newsItem;
    return (
        <NewsFeedItem type="Bought" title={`${from} has joined ${to}'s Bud`} pfpSrc={pfpSrc} />
    );
};

export default BoughtItem;
