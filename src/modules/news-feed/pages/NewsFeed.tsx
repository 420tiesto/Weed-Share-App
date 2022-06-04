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
        <div className="grid pt-4  lg:grid-cols-5">
            <Tab.Group>
                <div className="col col-span-1">
                    <NewsSidebar />
                </div>
                <div className="col-span-4">
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
