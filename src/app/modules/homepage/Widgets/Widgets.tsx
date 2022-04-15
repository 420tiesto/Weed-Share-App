import FollowSuggestions from './FollowSuggestions';
import SearchInput from './SearchInput';
import Trends from './Trends';

type Props = {};

const Widgets = (props: Props) => {
    return (<>
        <div className="hidden lg:block flex-grow-0 w-full max-w-xs space-y-4">
            <SearchInput />
            <Trends />
            <FollowSuggestions/>
        </div>
    </>
    );
};

export default Widgets;
