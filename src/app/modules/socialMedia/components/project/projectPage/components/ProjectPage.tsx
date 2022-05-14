import { ClockIcon, HashtagIcon, UsersIcon } from '@heroicons/react/outline';
import { EyeIcon, HeartIcon } from '@heroicons/react/solid';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
import MaticIcon from '../../../../../../icons/MaticIcon';
import AirdropDetails from './AirdropDetails';
import ProjectActivity from './ProjectActivity';
import ProjectImageCard from './ProjectImageCard';
import { useGetPublication } from '../../services/get-publication';
import Loader from '../../../../../../components/common-ui/loader';

dayjs.extend(relativeTime)

type Props = {};

const ProjectPage = (props: Props) => {
    const { projectId } = useParams();
    const { data: { data: { publication = {} } = {} } = {}, isLoading } = useGetPublication(
        projectId,
        {
            enabled: !!projectId,
        }
    );

    if (isLoading) {
        return <Loader />;
    }

    const {
        metadata: { attributes },
        profile: { stats }
    } = publication as any;
    const [artistName, releaseDate, recordLabel, , , , albumCover, , , ...tracks] =
        attributes as any;

    const imageLink = albumCover.value;
    const releaseDateFromNow = dayjs(releaseDate.value).fromNow();

    return (
        <div className="sunken-element flex gap-8 p-8">
            {/* Left Section */}
            <div className="">
                <ProjectImageCard likes={101} imgSrc={imageLink} />
                <div className="flex item-center gap-4 mt-4">
                    <HashtagIcon className="h-6 w-6" />
                    {projectId}
                </div>
                <div className="flex item-center gap-4 mt-4">
                    <UsersIcon className="h-6 w-6" />{stats.totalFollowers} members
                </div>
                <div className="flex item-center gap-4 mt-4">
                    <UsersIcon className="h-6 w-6" />{stats.totalPosts} posts
                </div>
                <div className="flex item-center gap-4 mt-4">
                    <ClockIcon className="h-6 w-6" />{releaseDateFromNow}
                </div>
            </div>
            {/* Right Section */}
            <div className="flex-grow">
                {/* <p className="text-sm text-primary">Cold inner Fire </p> */}
                <h6 className="text-2xl font-bold mb-3">{recordLabel.value}</h6>
                <div className="flex items-center  gap-4 text-slate-400 ">
                    <p>
                        Owned by <span className="text-primary">{artistName.value}</span>
                    </p>
                    <div className="flex items-center gap-4">
                        <EyeIcon className="h-5 w-5" /> 230 views
                    </div>
                    <div className="flex items-center gap-4">
                        <HeartIcon className="h-5 w-5" /> 230 views
                    </div>
                </div>

                <div className="elevated-element mb-6 divide-y-4 divide-dark-gray rounded-2xl  mt-6 w-full">
                    <AirdropDetails />
                    <div className="py-4 px-6">
                        <p className="text-slate- mb-2">Current Price</p>
                        <div className="text-2xl font-bold flex items-center gap-2 mb-4">
                            <MaticIcon /> 7.6{' '}
                            <span className="text-base text-slate-400">($ 617.3)</span>
                        </div>
                        <div className="flex gap-4">
                            <button className="green-btn w-32">Join</button>
                            <button className="green-outline-btn w-32">Show Details</button>
                        </div>
                    </div>
                </div>
                {/* Spotify Integration */}
                <ProjectActivity />
            </div>
        </div>
    );
};

export default ProjectPage;
