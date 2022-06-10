import { ClockIcon, HashtagIcon, UsersIcon } from '@heroicons/react/outline';
import { EyeIcon, HeartIcon } from '@heroicons/react/solid';
import { useParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import AirdropDetails from './AirdropDetails';
import BudReviews from './BudReviews';
import BudImageCard from './BudImageCard';
import { useGetPublication } from '../../services/get-publication';
import Loader from '../../../../app/components/common-ui/loader';
import MaticIcon from '../../../../app/icons/MaticIcon';
import { collect, useHasCollected, approveModule } from '../../services/collect-publication';
import { pollUntilIndexed } from '../../../../services/has-transaction-been-indexed';
import {
    successToast,
    errorToast,
    promiseToast,
} from '../../../../app/components/common-ui/toasts/CustomToast';
import { login } from '../../../auth/services/lens-login';
import { useAppDispatch } from '../../../../state/configure-store';
import { useHasAllowance } from '../../services/module-allowance';
import { BigNumber } from 'ethers';
import Button from '../../../../app/components/common-ui/atoms/Button';
import { useGetProfile } from '../../../profile/services/get-profiles';
import { useSelector } from 'react-redux';
import { getUserHandle } from '../../../auth/state/auth.reducer';
import { setUserAuthenticated } from '../../../auth/state/auth.action';
import { isValidToken } from '../../../../utils/auth-helpers';
import { getStorageValue } from '../../../../utils/local-storage/local-storage';
import { LENS_TOKENS } from '../../../../utils/local-storage/keys';
import share from '../../services/share';
import { NEWSFEED } from '../../../../app/routes/Routes';

dayjs.extend(relativeTime);

type Props = {};

const BudPage = ({}: Props) => {
    const { projectId } = useParams();

    const { data: { data: { publication = {} } = {} } = {}, isLoading } = useGetPublication(
        projectId,
        {
            enabled: !!projectId,
        }
    );
    const { data: profileDetails = {} } = useGetProfile();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { data: { data: { hasCollected = [{}] } = {} } = {}, refetch } =
        useHasCollected(projectId);
    const [{ results = [{}] }] = hasCollected as any;
    const [{ collected = false }] = results;

    const {
        metadata: { attributes = [] } = {},
        profile: { stats = {} } = {},
        collectModule: {
            type = '',
            amount: { value: priceValue = 0, asset: { address = '' } = {} } = {},
        } = {},
    } = publication as any;
    const auth = getStorageValue(LENS_TOKENS);

    const { data: approvedModuleAllowanceAmount } = useHasAllowance(address);

    const approveModuleHandler = async () => {
        promiseToast('Approving module...', 'Collect Post');
        await approveModule({ currency: address, value: '1', collectModule: type });
    };

    const onShareHandler = async () => {
        try {
            if (!auth) {
                dispatch(setUserAuthenticated(false));
                return;
            }
            const { accessToken } = JSON.parse(auth!);
            if (!isValidToken(accessToken)) {
                await dispatch(login());
            }
            const txHash = await share({
                profileId: profileDetails.id,
                publicationId: projectId,
                referenceModule: { followerOnlyReferenceModule: true },
            });
            successToast('Sharing...', 'Share Post');
            await pollUntilIndexed(txHash);
            successToast('Shared Successfully', 'Share Post');
            navigate(NEWSFEED);
        } catch (err) {
            errorToast('Something went wrong, please try again later.', 'Share Post');
        }
    };

    const collectHandler = async () => {
        try {
            const hasEnoughAllowance =
                BigNumber.from(approvedModuleAllowanceAmount[0]?.currency || '0x00').toString() >=
                `${priceValue}`;
            if (!hasEnoughAllowance) {
                await approveModuleHandler();
            }
            promiseToast('Collecting project...', 'Collect Post');
            const tx = await collect(projectId || '');
            const hasIndexed = await pollUntilIndexed(tx.hash);
            if (hasIndexed) {
                successToast('Collected successfully', 'Collect Post');
                refetch();
            } else {
                errorToast('Something went wrong', 'Collect Post');
            }
        } catch (err) {
            // TODO: [PMA-84] Handle collect error failure properly
            errorToast((err as any).message, 'Collect Post');
        }
    };

    const [artistName, releaseDate, recordLabel, , , , budCover] = attributes as any;

    const imageLink = budCover?.value;
    const releaseDateFromNow = dayjs(releaseDate?.value).fromNow();

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="pt-4 px-4">
            <div className="sunken-element  bg-dark-black flex gap-8 p-8">
                {/* Left Section */}
                <div className="">
                    <BudImageCard likes={101} imgSrc={imageLink} />
                    <div className="flex item-center gap-4 mt-4">
                        <HashtagIcon className="h-6 w-6" />
                        {projectId}
                    </div>
                    <div className="flex item-center gap-4 mt-4">
                        <UsersIcon className="h-6 w-6" />
                        {stats.totalFollowers} members
                    </div>
                    <div className="flex item-center gap-4 mt-4">
                        <UsersIcon className="h-6 w-6" />
                        {stats.totalPosts} posts
                    </div>
                    <div className="flex item-center gap-4 mt-4">
                        <ClockIcon className="h-6 w-6" />
                        {releaseDateFromNow}
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
                            <EyeIcon className="h-5 w-5" /> 
                        </div>
                        <div className="flex items-center gap-4">
                            <HeartIcon className="h-5 w-5" /> 
                        </div>
                    </div>

                    <div className="elevated-element mb-6 divide-y-4 divide-dark-black rounded-2xl  mt-6 w-full">
                        {/* <AirdropDetails /> */}
                        <div className="py-4 px-6">
                            <p className="text-slate- mb-2">Current Price</p>
                            <div className="text-2xl font-bold flex items-center gap-2 mb-4">
                                <MaticIcon />
                                {priceValue}
                                {/* TODO: [PMA-50] Add conversion of matic to dollar in project page */}
                                {/* <span className="text-base text-slate-400">($ 617.3)</span> */}
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={collectHandler}
                                    disabled={collected}
                                    className="green-btn w-32">
                                    {collected ? 'Buy' : 'Buy'}
                                </button>
                                <Button onClick={onShareHandler} className="w-32" outline>
                                    Share
                                </Button>
                                {/* <button disabled className="green-outline-btn w-32">Show Details</button> */}
                            </div>
                        </div>
                    </div>
                    {/* Spotify Integration */}
                    <BudReviews />
                </div>
            </div>
        </div>
    );
};

export default BudPage;
