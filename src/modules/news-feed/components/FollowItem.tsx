import NewsFeedItem from './NewsFeedItem';

type Props = {
    newsItem: {
      pfpSrc: string;
      from: string;
      to: string;
    },
};

const FollowItem = ({ newsItem }: Props) => {
  const { pfpSrc, from, to } = newsItem;
    return (
        <NewsFeedItem
            type="Follow"
            title={`${from} has started following ${to}`}
            pfpSrc="https://pbs.twimg.com/profile_images/1491044018926796805/uBM0c32A_400x400.jpg"
        />
    );
};

export default FollowItem;
