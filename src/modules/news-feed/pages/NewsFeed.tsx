import { Tab } from '@headlessui/react';
import React from 'react';
import SelectInput from '../../../app/components/common-ui/atoms/SelectInput';
import AllDiscussions from '../components/AllDiscussions';
import FollowingNews from '../components/FollowingNews';
import NewsSidebar from '../components/NewsSidebar';

type Props = {};

const NewsFeed = (props: Props) => {
    const [filter,setFilter] = React.useState<"Latest" | "Most Liked">("Latest") 
    return (
        <div className="pt-4">
            <Tab.Group>
                <div className="max-w-[320px] h-ful col-span-1 fixed left-4 top-20">
                    <NewsSidebar />
                </div>
                <div className="ml-[320px]">
                    <Tab.Panels>
                        <Tab.Panel><AllDiscussions/></Tab.Panel>
                        <Tab.Panel><FollowingNews/></Tab.Panel>
                    </Tab.Panels>
                </div>
            </Tab.Group>
        </div>
    );
};

export default NewsFeed;
