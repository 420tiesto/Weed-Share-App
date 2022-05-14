import { Tab } from '@headlessui/react';
import { ClockIcon, CollectionIcon, HeartIcon } from '@heroicons/react/outline';
import React from 'react';
import { Card, CardBody } from '../../../../../components/common-ui/atoms/Card';
import Button from '../../../auth/components/socialLoginButton/socialLoginButton';
import TopLatestProjects from './TopLatestProjects';

type Props = {};

const ExplorePage = (props: Props) => {
    return (
        <div className="py-8 p-4 lg:p-0 lg:py-8 ">
            <Tab.Group>
                <Tab.List className="flex gap-4 mb-8 ">
                    <Tab
                        className={({ selected }: { selected: boolean }) =>
                            (selected ? 'text-primary bg-dark-gray ' : ' text-white ') +
                            'px-3 py-1 font-medium flex items-center gap-2 rounded-lg text-lg duration-200 transition-colors ease-out'
                        }>
                        <ClockIcon className="h-5 w-5" /> Top Latest
                    </Tab>
                    <Tab
                        className={({ selected }: { selected: boolean }) =>
                            (selected ? 'text-primary bg-dark-gray ' : ' text-white ') +
                            'px-3 py-1 font-medium flex items-center gap-2 rounded-lg text-lg duration-200 transition-colors ease-out'
                        }>
                        <CollectionIcon className="h-5 w-5" />
                        Top Collected
                    </Tab>
                </Tab.List>
                <Tab.Panels className="flex-grow">
                    <Tab.Panel><TopLatestProjects/></Tab.Panel>
                    <Tab.Panel>Top Collected</Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default ExplorePage;
