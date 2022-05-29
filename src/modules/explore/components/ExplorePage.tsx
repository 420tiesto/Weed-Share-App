import { Tab } from '@headlessui/react';
import { ClockIcon, CollectionIcon, HeartIcon } from '@heroicons/react/outline';
import TopProjects from './TopProjects';

type Props = {};

const ExplorePage = (props: Props) => {
    return (
        <div className="py-4 mx-auto">
            <Tab.Group>
                <Tab.List className="flex gap-4 mb-8 ">
                    <Tab
                        className={({ selected }: { selected: boolean }) =>
                            (selected ? 'text-primary bg-dark-gray ' : ' text-white ') +
                            'px-3 py-1 font-medium flex items-center gap-2 rounded-lg text-lg duration-200 transition-colors ease-out'
                        }>
                        <CollectionIcon className="h-5 w-5" />
                        Top Collected
                    </Tab>
                    <Tab
                        className={({ selected }: { selected: boolean }) =>
                            (selected ? 'text-primary bg-dark-gray ' : ' text-white ') +
                            'px-3 py-1 font-medium flex items-center gap-2 rounded-lg text-lg duration-200 transition-colors ease-out'
                        }>
                        <ClockIcon className="h-5 w-5" />
                        Latest
                    </Tab>
                    <Tab
                        className={({ selected }: { selected: boolean }) =>
                            (selected ? 'text-primary bg-dark-gray ' : ' text-white ') +
                            'px-3 py-1 font-medium flex items-center gap-2 rounded-lg text-lg duration-200 transition-colors ease-out'
                        }>
                        <CollectionIcon className="h-5 w-5" />
                        Top Commented
                    </Tab>
                </Tab.List>
                <Tab.Panels className="flex-grow">
                    <Tab.Panel>
                        <TopProjects sortCriteria="TOP_COLLECTED" />
                    </Tab.Panel>
                    <Tab.Panel>
                        <TopProjects sortCriteria="LATEST" />
                    </Tab.Panel>
                    <Tab.Panel>
                        <TopProjects sortCriteria="TOP_COMMENTED" />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default ExplorePage;
