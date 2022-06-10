import React from 'react';
import { Tab } from '@headlessui/react';
import FeatureItem from './FeatureItem';
type Props = {};

const FeatureSection = (props: Props) => {
    return (
        <div className="p-8 px-16 mt-16">
            <Tab.Group>
                {/* Tabs */}
                <Tab.List className={'flex items-center justify-center'}>
                    <div className="rounded-full  justify-between bg-dark-gray flex gap-4 p-1 elevated-item">
                        <Tab
                            className={({ selected }: { selected: boolean }) =>
                                (selected ? 'text-black bg-primary ' : 'text-white') +
                                ' w-28 text-center  p-1 focus:outline-none font-medium rounded-full '
                            }>
                            Artists
                        </Tab>
                        <Tab
                            className={({ selected }: { selected: boolean }) =>
                                (selected ? 'text-black bg-primary ' : ' text-white') +
                                ' w-28 text-center  p-1 focus:outline-none font-medium rounded-full'
                            }>
                            Fans
                        </Tab>
                    </div>
                </Tab.List>
                <Tab.Panels className="mt-10">
                    <Tab.Panel className="">
                        <h1 className="text-3xl text-center font-bold mb-10">
                            Create and Sell your Music
                        </h1>
                        <div className="flex justify-around px-16 gap-20 text-center">
                            <FeatureItem
                                title="Setup your wallet"
                                description="Once you’ve set up your wallet of choice, connect it to PRNTS by clicking the wallet icon in the top right corner."
                                imgSrc="/set-up-wallet.png"
                            />
                            <FeatureItem
                                title="Post your Music"
                                description="Upload your single or album project and set the percentage of the project you’d like to sell to your fans."
                                imgSrc="/create-your-project.png"
                            />
                            <FeatureItem
                                title="Spread the word "
                                description="Share the project to your fans on social media and let them know that you have a project for sale on PRNTS."
                                imgSrc="/list-projects.png"
                            />
                        </div>
                    </Tab.Panel>
                    <Tab.Panel>
                        <h1 className="text-3xl text-center font-bold mb-10">
                            Invest in your favorite artist
                        </h1>
                        <div className="flex justify-around px-16 gap-20 text-center">
                            <FeatureItem
                                title="Artist creates project"
                                description="Once you’ve set up your wallet of choice, connect to PRNTS by clicking the wallet icon in the top right corner."
                                imgSrc="/artist-create-project.png"
                            />
                            <FeatureItem
                                title="You join the project"
                                description="Choose the project you would like to join and purchase your share of ownership."
                                imgSrc="/join-project.png"
                            />
                            <FeatureItem
                                title="Collect your revenue"
                                description="Collect your revenue based on your share of token from the streaming pools each month."
                                imgSrc="/win-win.png"
                            />
                        </div>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default FeatureSection;
