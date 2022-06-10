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
                    <div className="rounded-full  justify-between bg-dark-black flex gap-4 p-1 elevated-item">
                        <Tab
                            className={({ selected }: { selected: boolean }) =>
                                (selected ? 'text-black bg-primary ' : 'text-white') +
                                ' w-28 text-center  p-1 focus:outline-none font-medium rounded-full '
                            }>
                            Plugs
                        </Tab>
                        <Tab
                            className={({ selected }: { selected: boolean }) =>
                                (selected ? 'text-black bg-primary ' : ' text-white') +
                                ' w-28 text-center  p-1 focus:outline-none font-medium rounded-full'
                            }>
                            Custy's
                        </Tab>
                    </div>
                </Tab.List>
                <Tab.Panels className="mt-10">
                    <Tab.Panel className="">
                        <h1 className="text-3xl text-center font-bold mb-10">
                            Post and Sell your Stash
                        </h1>
                        <div className="flex justify-around px-16 gap-20 text-center">
                            <FeatureItem
                                title="Setup your wallet"
                                description="Once you’ve set up your wallet of choice, connect it to WeedShare by clicking the wallet icon in the top right corner."
                                imgSrc="/set-up-wallet.png"
                            />
                            <FeatureItem
                                title="Post your Stash"
                                description="Post your weed and share it with your friends!"
                                imgSrc="/create-your-project.png"
                            />
                            <FeatureItem
                                title="Spread the word "
                                description="Share your stash to your fans on social media and let them know that you have some bud for sale on WeedShare."
                                imgSrc="/list-projects.png"
                            />
                        </div>
                    </Tab.Panel>
                    <Tab.Panel>
                        <h1 className="text-3xl text-center font-bold mb-10">
                            Buy the Best Weed in Town!
                        </h1>
                        <div className="flex justify-around px-16 gap-20 text-center">
                            <FeatureItem
                                title="Plug Posts Buds"
                                description="Connect Wallet"
                                imgSrc="/artist-create-project.png"
                            />
                            <FeatureItem
                                title="You buy some buds"
                                description="Choose the weed you would like to buy and purchase your ammount."
                                imgSrc="/join-project.png"
                            />
                            <FeatureItem
                                title="Smoke it up!"
                                description="Now all you gotta do is light it up!"
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
