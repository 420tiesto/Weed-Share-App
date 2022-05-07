type ProfileDetailsProps = {
    name: string;
    about: string;
    followerCount: number;
    followingCount: number;
};

const ProfileDetails = ({ name, about, followerCount, followingCount }: ProfileDetailsProps) => {
    return (
        <div className=" mt-8">
            <h6 className="text-2xl font-semibold">{name}</h6>
            <p className="text-gray-400 font-medium text-sm mb-4">{about}</p>
            <div className="flex items-center gap-4">
                <p className="text-gray-400">
                    <span className="text-white"> {followingCount} </span> Following
                </p>
                <p className="text-gray-400">
                    <span className="text-white"> {followerCount} </span> Followers
                </p>
            </div>
        </div>
    );
};


export default ProfileDetails